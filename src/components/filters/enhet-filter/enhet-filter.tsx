import { UNSAFE_Combobox } from '@navikt/ds-react';
import { Enhet } from '../../../rest/data/innlogget-veileder';
import { useDataFetcherStore } from '../../../stores/data-fetcher-store';
import { useSokStore } from '../../../stores/sok-store';
import '../filters.css';

const enhetOption = (enhet: Enhet) => ({
	label: `${enhet.navn} (${enhet.enhetId})`,
	value: enhet.enhetId
});

export const EnhetFilter = () => {
	const { enheterMedUtkastFetcher } = useDataFetcherStore();
	const { filters, setEnheterFilter } = useSokStore();
	const { medTilgang, utenTilgang } = enheterMedUtkastFetcher.data;
	const enheter = [...medTilgang, ...utenTilgang];

	function handleOnToggleSelected(enhetId: string, isSelected: boolean) {
		setEnheterFilter(valgteEnheter =>
			isSelected
				? enheter.filter(
						enhet =>
							enhet.enhetId === enhetId ||
							valgteEnheter.some(valgtEnhet => valgtEnhet.enhetId === enhet.enhetId)
					)
				: valgteEnheter.filter(enhet => enhet.enhetId !== enhetId)
		);
	}

	return (
		<UNSAFE_Combobox
			className="filter-field enhet-filter"
			label="Enhetsfilter"
			placeholder="Alle enheter"
			size="small"
			isMultiSelect
			options={enheter.map(enhetOption)}
			selectedOptions={filters.enheter.map(enhetOption)}
			onToggleSelected={handleOnToggleSelected}
		/>
	);
};
