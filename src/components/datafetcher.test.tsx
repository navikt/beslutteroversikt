import { renderToStaticMarkup } from 'react-dom/server';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { FetchStatus } from '../rest/utils';
import { DataFetcher } from './datafetcher';

const mocks = vi.hoisted(() => ({
	store: vi.fn(),
	effect: vi.fn<(callback: () => void) => void>(),
	enheterFetch: vi.fn()
}));

vi.mock('react', async importOriginal => ({
	...(await importOriginal<typeof import('react')>()),
	useEffect: mocks.effect
}));
vi.mock('../stores/data-fetcher-store', () => ({ useDataFetcherStore: mocks.store }));

describe('innlasting bak funksjonsbryteren', () => {
	beforeEach(() => vi.clearAllMocks());

	function render(aktivert: boolean) {
		const ferdig = { status: FetchStatus.FINISHED, data: {}, httpCode: 200, error: null };
		mocks.store.mockReturnValue({
			innloggetVeilederFetcher: ferdig,
			aktivEnhetFetcher: ferdig,
			unleashFeaturetoggleFetcher: ferdig,
			enhetsfilterOgEnkelttilgangAktivert: aktivert,
			enheterMedUtkastFetcher: {
				status: FetchStatus.NOT_STARTED,
				data: null,
				httpCode: -1,
				error: null,
				fetch: mocks.enheterFetch
			}
		});
		const html = renderToStaticMarkup(
			<DataFetcher>
				<span>Oversikt</span>
			</DataFetcher>
		);
		mocks.effect.mock.calls.at(-1)![0]();
		return html;
	}

	it('viser oversikten uten å hente enheter når bryteren er av', () => {
		expect(render(false)).toContain('Oversikt');
		expect(mocks.enheterFetch).not.toHaveBeenCalled();
	});

	it('henter enheter og venter på dem når bryteren er på', () => {
		expect(render(true)).not.toContain('Oversikt');
		expect(mocks.enheterFetch).toHaveBeenCalledWith(null);
	});
});
