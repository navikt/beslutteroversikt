import React from 'react';
import Select from 'react-select';
import { Enhet } from '../../../rest/data/innlogget-veileder';
import { useDataFetcherStore } from '../../../stores/data-fetcher-store';
import './enhet-dropdown.less';
import { Element } from 'nav-frontend-typografi';
import { useSokStore } from '../../../stores/sok-store';

export interface DropdownOption {
	value: string;
	label: string;
}

export function mapEnhetTilDropdownOption(enhet: Enhet): DropdownOption {
	return { value: enhet.enhetId, label: enhet.navn };
}

export function mapDropdownOptionTilEnhet(dropdownOption: DropdownOption): Enhet {
	return { enhetId: dropdownOption.value, navn: dropdownOption.label };
}

export const EnhetDropdown = () => {
	const { filters, setEnheterFilter } = useSokStore();
	const { innloggetVeilederFetcher } = useDataFetcherStore();

	const valgteEnheter = filters.enheter.map(mapEnhetTilDropdownOption);
	const enheter = innloggetVeilederFetcher.data.enheter.map(mapEnhetTilDropdownOption);

	function handleOnEnhetSelectedChanged(selectedOptions: DropdownOption[] | null) {
		if (selectedOptions == null) {
			setEnheterFilter([]);
		} else {
			setEnheterFilter(selectedOptions.map(mapDropdownOptionTilEnhet));
		}
	}

	return (
		<div className="enhet-dropdown">
			<Element>Enhet</Element>
			<Select
				inputId="enhet-filter"
				placeholder="Filtrer på enheter"
				isMulti={true}
				value={valgteEnheter}
				isClearable
				isSearchable
				clearValueText="Fjern enhet"
				noResultsText="Listen er tom"
				searchPromptText="Skriv inn for å søke"
				options={enheter}
				onChange={handleOnEnhetSelectedChanged as any}
			/>
		</div>
	);
};
