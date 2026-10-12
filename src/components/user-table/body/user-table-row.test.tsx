import { renderToStaticMarkup } from 'react-dom/server';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { Bruker } from '../../../rest/data/bruker';
import { UtkastStatus } from '../../../rest/data/bruker';
import { UserTableRow } from './user-table-row';

const mocks = vi.hoisted(() => ({
	direktelenke: vi.fn<(props: { trengerEnkelttilgang: boolean }) => null>(() => null)
}));

vi.mock('./bruker-direktelenke-med-feilmelding', () => ({
	BrukerDirektelenkeMedFeilmelding: mocks.direktelenke
}));
vi.mock('../../../stores/data-fetcher-store', () => ({
	useDataFetcherStore: () => ({
		enheterMedUtkastFetcher: {
			data: {
				medTilgang: [{ enhetId: '0234', navn: 'Nav Gjerdrum' }],
				utenTilgang: [{ enhetId: '0219', navn: 'Nav Bærum' }]
			}
		}
	})
}));

const bruker: Bruker = {
	brukerFnr: '12345678901',
	brukerFornavn: 'Test',
	brukerEtternavn: 'Testson',
	brukerOppfolgingsenhetId: '0234',
	brukerOppfolgingsenhetNavn: 'Nav Gjerdrum',
	status: UtkastStatus.KLAR_TIL_BESLUTTER,
	beslutterNavn: null,
	veilederNavn: 'Test Veileder',
	vedtakStartet: '2026-10-12T10:00:00Z',
	statusEndret: '2026-10-12T10:00:00Z'
};

describe('enhetstilgang for hver rad', () => {
	beforeEach(() => vi.clearAllMocks());

	it.each([
		['0234', false],
		['0219', true]
	])('krever enkelttilgang for riktig enhet %s', (enhetId, forventet) => {
		renderToStaticMarkup(
			<table>
				<tbody>
					<UserTableRow bruker={{ ...bruker, brukerOppfolgingsenhetId: enhetId }} />
				</tbody>
			</table>
		);
		expect(mocks.direktelenke.mock.calls.at(-1)![0].trengerEnkelttilgang).toBe(forventet);
	});

	it('viser ikke navigeringsknapp for maskerte personer', () => {
		renderToStaticMarkup(
			<table>
				<tbody>
					<UserTableRow bruker={{ ...bruker, brukerFnr: '', brukerOppfolgingsenhetId: '0219' }} />
				</tbody>
			</table>
		);
		expect(mocks.direktelenke).not.toHaveBeenCalled();
	});
});
