import { renderToStaticMarkup } from 'react-dom/server';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { useSokStore } from './sok-store';
import { FetchStatus } from '../rest/utils';
import { lagBeslutterOversiktSok } from '../utils/sok-utils';

const mocks = vi.hoisted(() => ({
	useDataFetcherStore: vi.fn(),
	capture: vi.fn<(state: ReturnType<typeof useSokStore>) => void>()
}));

vi.mock('./data-fetcher-store', () => ({
	useDataFetcherStore: () => ({
		enhetsfilterOgEnkelttilgangAktivert: true,
		unleashFeaturetoggleFetcher: { status: FetchStatus.FINISHED, data: {}, error: null, httpCode: 200 },
		...mocks.useDataFetcherStore()
	})
}));
vi.mock('constate', () => ({
	default: (hook: () => ReturnType<typeof useSokStore>) => [
		() => {
			mocks.capture(hook());
			return null;
		},
		hook
	]
}));
vi.stubGlobal('window', { sessionStorage: { getItem: () => null } });
const { SokStoreProvider } = await import('./sok-store');

describe('standardvalg for enhetsfilteret', () => {
	beforeEach(() => vi.clearAllMocks());

	it('bruker bare medTilgang som standardvalg i første søkeforespørsel', () => {
		const medTilgang = [{ enhetId: '0234', navn: 'Nav Gjerdrum' }];
		mocks.useDataFetcherStore.mockReturnValue({
			enheterMedUtkastFetcher: {
				status: FetchStatus.FINISHED,
				error: null,
				httpCode: 200,
				data: { medTilgang, utenTilgang: [{ enhetId: '0219', navn: 'Nav Bærum' }] }
			}
		});
		renderToStaticMarkup(
			<SokStoreProvider>
				<span />
			</SokStoreProvider>
		);
		const state = mocks.capture.mock.calls.at(-1)![0];
		expect(state.enhetsfilterKlart).toBe(true);
		expect(state.filters.enheter).toEqual(medTilgang);
		expect(lagBeslutterOversiktSok(state.filters, 1, 50, false, undefined, undefined).filter?.enheter).toEqual([
			'0234'
		]);
	});

	it('venter med søket mens enhetslisten lastes', () => {
		mocks.useDataFetcherStore.mockReturnValue({
			enheterMedUtkastFetcher: { status: FetchStatus.PENDING, data: null, error: null, httpCode: -1 }
		});
		renderToStaticMarkup(
			<SokStoreProvider>
				<span />
			</SokStoreProvider>
		);
		expect(mocks.capture.mock.calls.at(-1)![0].enhetsfilterKlart).toBe(false);
	});

	it('beholder tomt valg etter nullstilling i stedet for å gjeninnføre standardvalget', () => {
		mocks.useDataFetcherStore.mockReturnValue({
			enheterMedUtkastFetcher: {
				status: FetchStatus.FINISHED,
				error: null,
				httpCode: 200,
				data: { medTilgang: [{ enhetId: '0234', navn: 'Nav Gjerdrum' }], utenTilgang: [] }
			}
		});
		mocks.capture.mockImplementationOnce(state => state.setEnheterFilter([]));
		renderToStaticMarkup(
			<SokStoreProvider>
				<span />
			</SokStoreProvider>
		);
		expect(mocks.capture.mock.calls.at(-1)![0].filters.enheter).toEqual([]);
	});

	it('starter ikke søket hvis hentingen av enheter feiler', () => {
		mocks.useDataFetcherStore.mockReturnValue({
			enheterMedUtkastFetcher: {
				status: FetchStatus.FINISHED,
				data: null,
				error: null,
				httpCode: 500
			}
		});
		renderToStaticMarkup(
			<SokStoreProvider>
				<span />
			</SokStoreProvider>
		);
		expect(mocks.capture.mock.calls.at(-1)![0].enhetsfilterKlart).toBe(false);
	});

	it('tillater tomt standardvalg når ingen enheter er tilgjengelige', () => {
		mocks.useDataFetcherStore.mockReturnValue({
			enheterMedUtkastFetcher: {
				status: FetchStatus.FINISHED,
				data: { medTilgang: [], utenTilgang: [] },
				error: null,
				httpCode: 200
			}
		});
		renderToStaticMarkup(
			<SokStoreProvider>
				<span />
			</SokStoreProvider>
		);
		const state = mocks.capture.mock.calls.at(-1)![0];
		expect(state.enhetsfilterKlart).toBe(true);
		expect(state.filters.enheter).toEqual([]);
	});

	it('søker uten enhetsfilter når bryteren er av, uten å vente på enhetslisten', () => {
		mocks.useDataFetcherStore.mockReturnValue({
			enhetsfilterOgEnkelttilgangAktivert: false,
			enheterMedUtkastFetcher: { status: FetchStatus.NOT_STARTED, data: null, error: null, httpCode: -1 }
		});
		renderToStaticMarkup(
			<SokStoreProvider>
				<span />
			</SokStoreProvider>
		);
		const state = mocks.capture.mock.calls.at(-1)![0];
		expect(state.enhetsfilterKlart).toBe(true);
		expect(state.filters.enheter).toEqual([]);
		expect(lagBeslutterOversiktSok(state.filters, 1, 50, false, undefined, undefined).filter).toBeUndefined();
	});

	it('venter på bryteren før første søk', () => {
		mocks.useDataFetcherStore.mockReturnValue({
			enhetsfilterOgEnkelttilgangAktivert: false,
			unleashFeaturetoggleFetcher: { status: FetchStatus.PENDING, data: null, error: null, httpCode: -1 },
			enheterMedUtkastFetcher: { status: FetchStatus.NOT_STARTED, data: null, error: null, httpCode: -1 }
		});
		renderToStaticMarkup(
			<SokStoreProvider>
				<span />
			</SokStoreProvider>
		);
		expect(mocks.capture.mock.calls.at(-1)![0].enhetsfilterKlart).toBe(false);
	});
});
