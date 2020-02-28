import React from 'react';
import { FilterPanel } from '../filter-panel/filter-panel';
import {
	DropdownOption,
	EnhetDropdown,
	mapDropdownOptionTilEnhet,
	mapEnhetTilDropdownOption
} from './enhet-dropdown/enhet-dropdown';
import { useFetchStore } from '../../../stores/fetch-store';
import { useFilterStore } from '../../../stores/filter-store';

export const EnhetFilterPanel = () => {
	const { filters, setEnheterFilter } = useFilterStore();
	const { innloggetVeileder } = useFetchStore();

	const valgteEnheter = filters.enheter.map(mapEnhetTilDropdownOption);
	const enheter = innloggetVeileder.data.enheter.map(mapEnhetTilDropdownOption);

	function handleOnEnhetSelectedChanged(selectedOptions: DropdownOption[] | null) {
		if (selectedOptions == null) {
			setEnheterFilter([]);
		} else {
			setEnheterFilter(selectedOptions.map(mapDropdownOptionTilEnhet));
		}
	}

    return (
    	<FilterPanel tittel="Enhet">
			<EnhetDropdown valgteEnheter={valgteEnheter} enheter={enheter} onChange={handleOnEnhetSelectedChanged}/>
	    </FilterPanel>
    );
};
