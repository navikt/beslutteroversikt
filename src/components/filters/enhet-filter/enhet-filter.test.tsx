import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import type { ComboboxProps } from '@navikt/ds-react';
import type { SetStateAction } from 'react';
import type { Enhet } from '../../../rest/data/innlogget-veileder';
import { EnhetFilter } from './enhet-filter';

const mocks = vi.hoisted(() => ({
	combobox: vi.fn<(props: ComboboxProps) => null>(() => null),
	useSokStore: vi.fn(),
	useDataFetcherStore: vi.fn()
}));

vi.mock('@navikt/ds-react', () => ({ UNSAFE_Combobox: mocks.combobox }));
vi.mock('../../../stores/sok-store', () => ({ useSokStore: mocks.useSokStore }));
vi.mock('../../../stores/data-fetcher-store', () => ({
	useDataFetcherStore: mocks.useDataFetcherStore
}));

const enheter: Enhet[] = [
	{ enhetId: '0234', navn: 'Nav Gjerdrum' },
	{ enhetId: '0219', navn: 'Nav Bærum' }
];

describe('EnhetFilter', () => {
	let valgteEnheter: Enhet[];

	beforeEach(() => {
		vi.clearAllMocks();
		valgteEnheter = [];
		mocks.useDataFetcherStore.mockReturnValue({
			enheterMedUtkastFetcher: { data: { medTilgang: [enheter[0]], utenTilgang: [enheter[1]] } }
		});
		mocks.useSokStore.mockImplementation(() => ({
			filters: { enheter: valgteEnheter },
			setEnheterFilter: (oppdatering: SetStateAction<Enhet[]>) => {
				valgteEnheter = typeof oppdatering === 'function' ? oppdatering(valgteEnheter) : oppdatering;
			}
		}));
	});

	function renderFilter() {
		renderToStaticMarkup(<EnhetFilter />);
		return mocks.combobox.mock.calls.at(-1)![0];
	}

	it('viser tilgjengelige enheter med navn og nummer, og støtter flervalg', () => {
		const props = renderFilter();
		expect(props.isMultiSelect).toBe(true);
		expect(props.options).toEqual([
			{ label: 'Nav Gjerdrum (0234)', value: '0234' },
			{ label: 'Nav Bærum (0219)', value: '0219' }
		]);
		expect(props.selectedOptions).toEqual([]);
		expect(props.placeholder).toBe('Alle enheter');
		expect(props.allowNewValues).not.toBe(true);
	});

	it('velger flere enheter uten duplikater og fjerner dem enkeltvis', () => {
		const { onToggleSelected } = renderFilter();
		onToggleSelected!('0234', true, false);
		onToggleSelected!('0219', true, false);
		onToggleSelected!('0234', true, false);
		expect(valgteEnheter).toEqual(enheter);
		expect(renderFilter().selectedOptions).toEqual(renderFilter().options);

		onToggleSelected!('0234', false, false);
		expect(valgteEnheter).toEqual([enheter[1]]);
		expect(renderFilter().selectedOptions).toEqual([{ label: 'Nav Bærum (0219)', value: '0219' }]);

		onToggleSelected!('0219', false, false);
		expect(valgteEnheter).toEqual([]);
		expect(renderFilter().selectedOptions).toEqual([]);
	});

	it('synkroniserer visningen når filteret nullstilles utenfra', () => {
		valgteEnheter = [enheter[0]];
		expect(renderFilter().selectedOptions).toHaveLength(1);
		valgteEnheter = [];
		expect(renderFilter().selectedOptions).toEqual([]);
	});
});
