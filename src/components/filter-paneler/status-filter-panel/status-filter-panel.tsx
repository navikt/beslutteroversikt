import React, { ChangeEvent } from 'react';
import { FilterPanel } from '../filter-panel/filter-panel';
import { Radio, RadioGruppe } from 'nav-frontend-skjema';
import './status-filter-panel.less';
import { StatusFilter, useFilterStore } from '../../../stores/filter-store';

export const StatusFilterPanel = () => {
	const { filters, setStatusFilter } = useFilterStore();
	const statusFilter = filters.status;

	function handleOnStatusRadioChanged(e: ChangeEvent<HTMLInputElement>) {
		if (e.target.checked) {
			console.log('setting status', e.target.value); // tslint:disable-line
			setStatusFilter(e.target.value as StatusFilter);
		}
	}

    return (
    	<FilterPanel tittel="Status">
		    <RadioGruppe>
			    <Radio label="Alle" name="status-filter" checked={statusFilter === StatusFilter.ALLE} value={StatusFilter.ALLE} onChange={handleOnStatusRadioChanged}/>
			    <Radio label="Venter på beslutter" name="status-filter" checked={statusFilter === StatusFilter.VENTER_PA_BESLUTTER} value={StatusFilter.VENTER_PA_BESLUTTER} onChange={handleOnStatusRadioChanged}/>
			    <Radio label="Venter på veileder" name="status-filter" checked={statusFilter === StatusFilter.VENTER_PA_VEILEDER} value={StatusFilter.VENTER_PA_VEILEDER} onChange={handleOnStatusRadioChanged}/>
			    <Radio label="Klar til utsending" name="status-filter" checked={statusFilter === StatusFilter.KLAR_TIL_UTSENDING} value={StatusFilter.KLAR_TIL_UTSENDING} onChange={handleOnStatusRadioChanged}/>
		    </RadioGruppe>
	    </FilterPanel>
    );
};
