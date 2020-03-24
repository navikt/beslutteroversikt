import React, { ChangeEvent } from 'react';
import Select from 'react-select';
import { Element } from 'nav-frontend-typografi';
import { StatusFilter, useFilterStore } from '../../../stores/filter-store';
import { DropdownOption, mapDropdownOptionTilEnhet } from '../enhet-dropdown/enhet-dropdown';
import './status-dropdown.less';

export function mapStatusTilDropdownOption(status: StatusFilter): DropdownOption {
	return { value: status, label: status.toString() };
}

export function mapDropdownOptionTilStatus(dropdownOption: DropdownOption): StatusFilter {
	return dropdownOption.value as StatusFilter;
}

const statusOptions: DropdownOption[] = [
	mapStatusTilDropdownOption(StatusFilter.ALLE),
	mapStatusTilDropdownOption(StatusFilter.KLAR_TIL_UTSENDING),
	mapStatusTilDropdownOption(StatusFilter.VENTER_PA_BESLUTTER),
	mapStatusTilDropdownOption(StatusFilter.VENTER_PA_VEILEDER),
];

export const StatusDropdown = () => {
	const { filters, setStatusFilter } = useFilterStore();
	const statusFilter = filters.status;

	function handleOnStatusSelectedChanged(selectedOption: DropdownOption | null) {
		console.log('selectedOption', selectedOption); // tslint:disable-line
	}

	return (
		<div className="status-dropdown">
			<Element>Status</Element>
			<Select
				inputId="status-filter"
				placeholder="Velg status"
				// value={mapStatusTilDropdownOption(statusFilter)}
				options={statusOptions}
				onChange={handleOnStatusSelectedChanged as any}
			/>
		</div>
	);
};
