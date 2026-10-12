import { renderToStaticMarkup } from 'react-dom/server';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { MouseEvent } from 'react';
import type { FetchState } from '../../../rest/utils';
import { FetchStatus } from '../../../rest/utils';
import { lagGiEnkelttilgangFetchInfo, lagSettBrukerIKontekstFetchInfo } from '../../../rest/api';
import { BrukerDirektelenkeMedFeilmelding } from './bruker-direktelenke-med-feilmelding';

const mocks = vi.hoisted(() => ({
	button: vi.fn<(props: { onClick: (event: MouseEvent<HTMLButtonElement>) => void; loading: boolean }) => null>(
		() => null
	),
	tilgangFetch: vi.fn(),
	kontekstFetch: vi.fn(),
	tilgangStatus: 'NOT_STARTED',
	open: vi.fn()
}));

vi.mock('@navikt/ds-react', () => ({
	Button: mocks.button,
	BodyShort: () => null,
	Popover: Object.assign(() => null, { Content: () => null })
}));
vi.mock('../../../hooks/use-event-listener', () => ({ useEventListener: vi.fn() }));
vi.mock('../../../utils/environment', () => ({ default: { isLocal: true } }));
vi.mock('../../../rest/use-fetch', () => ({
	default: (createFetchInfo: unknown) => ({
		status: createFetchInfo === lagGiEnkelttilgangFetchInfo ? mocks.tilgangStatus : FetchStatus.NOT_STARTED,
		error: null,
		httpCode: -1,
		fetch: createFetchInfo === lagGiEnkelttilgangFetchInfo ? mocks.tilgangFetch : mocks.kontekstFetch,
		reset: vi.fn()
	})
}));

const fnr = '12345678901';
const svar = (httpCode: number): FetchState<void> => ({
	status: FetchStatus.FINISHED,
	httpCode,
	error: null,
	data: undefined
});
const klikk = { ctrlKey: false, metaKey: false } as MouseEvent<HTMLButtonElement>;

describe('åpning av oppfølgingsvedtak', () => {
	beforeEach(() => {
		vi.clearAllMocks();
		mocks.tilgangStatus = FetchStatus.NOT_STARTED;
		vi.stubGlobal('window', {
			location: { hostname: 'localhost', href: '' },
			open: mocks.open
		});
	});

	function renderKnapp(trengerEnkelttilgang: boolean) {
		renderToStaticMarkup(
			<BrukerDirektelenkeMedFeilmelding
				fnr={fnr}
				knappTekst="Testson, Test"
				trengerEnkelttilgang={trengerEnkelttilgang}
			/>
		);
		return mocks.button.mock.calls.at(-1)![0];
	}

	it('venter på innvilget tilgang før kontekst og navigering', () => {
		renderKnapp(true).onClick(klikk);
		expect(mocks.tilgangFetch).toHaveBeenCalledWith(fnr, expect.any(Function));
		expect(mocks.kontekstFetch).not.toHaveBeenCalled();
		expect(window.location.href).toBe('');
		mocks.tilgangFetch.mock.calls[0][1](svar(204));
		expect(mocks.kontekstFetch).toHaveBeenCalledWith(fnr, expect.any(Function));
		expect(window.location.href).toBe('');
		mocks.kontekstFetch.mock.calls[0][1](svar(204));
		expect(window.location.href).toBe('https://veilarbpersonflate.intern.dev.nav.no/vedtaksstotte/utkast');
	});

	it('åpner utkast med enhetstilgang uten tilgangskall', () => {
		renderKnapp(false).onClick(klikk);
		expect(mocks.tilgangFetch).not.toHaveBeenCalled();
		expect(mocks.kontekstFetch).toHaveBeenCalledWith(fnr, expect.any(Function));
		mocks.kontekstFetch.mock.calls[0][1](svar(204));
		expect(window.location.href).toContain('/vedtaksstotte/utkast');
	});

	it.each([200, 403, 500, -1])('navigerer ikke etter mislykket eller uventet tilgangssvar %s', httpCode => {
		renderKnapp(true).onClick(klikk);
		mocks.tilgangFetch.mock.calls[0][1](svar(httpCode));
		expect(mocks.kontekstFetch).not.toHaveBeenCalled();
		expect(window.location.href).toBe('');
		expect(mocks.open).not.toHaveBeenCalled();
	});

	it('navigerer ikke hvis setting av kontekst feiler etter innvilget tilgang', () => {
		renderKnapp(true).onClick(klikk);
		mocks.tilgangFetch.mock.calls[0][1](svar(204));
		mocks.kontekstFetch.mock.calls[0][1](svar(500));
		expect(window.location.href).toBe('');
	});

	it('beholder åpning i ny fane etter tilgangskallet', () => {
		renderKnapp(true).onClick({ ...klikk, metaKey: true });
		mocks.tilgangFetch.mock.calls[0][1](svar(204));
		mocks.kontekstFetch.mock.calls[0][1](svar(204));
		expect(mocks.open).toHaveBeenCalledWith(
			'https://veilarbpersonflate.intern.dev.nav.no/vedtaksstotte/utkast',
			'_blank',
			'noopener,noreferrer'
		);
		expect(window.location.href).toBe('');
	});

	it('viser lasting og ignorerer klikk mens tilgangskallet pågår', () => {
		mocks.tilgangStatus = FetchStatus.PENDING;
		const props = renderKnapp(true);
		expect(props.loading).toBe(true);
		props.onClick(klikk);
		expect(mocks.tilgangFetch).not.toHaveBeenCalled();
		expect(mocks.kontekstFetch).not.toHaveBeenCalled();
	});

	it('sender riktig forespørsel for enkelttilgang', () => {
		const request = lagGiEnkelttilgangFetchInfo(fnr);
		expect(request.url).toBe('/veilarbvedtaksstotte/api/v1/tilgang/enkelttilgang');
		expect(request.method).toBe('POST');
		expect(JSON.parse(String(request.body))).toEqual({ brukerId: fnr });
		expect(lagSettBrukerIKontekstFetchInfo(fnr).url).toBe('/modiacontextholder/api/context');
	});
});
