import React from 'react';
import Select from 'react-select';
import { Element } from 'nav-frontend-typografi';
import { DropdownOption } from '../enhet-dropdown/enhet-dropdown';
import { UtkastStatus } from '../../../rest/data/bruker';
import { mapBrukerStatusTilTekst } from '../../../utils';
import { useSokStore } from '../../../stores/sok-store';
import './status-dropdown.less';

export function mapStatusTilDropdownOption(status: UtkastStatus): DropdownOption {
	return { value: status, label: mapBrukerStatusTilTekst(status) };
}

const statusOptions: DropdownOption[] = [
	mapStatusTilDropdownOption(UtkastStatus.TRENGER_BESLUTTER),
	mapStatusTilDropdownOption(UtkastStatus.KLAR_TIL_VEILEDER),
	mapStatusTilDropdownOption(UtkastStatus.KLAR_TIL_BESLUTTER)
];

export const StatusDropdown = () => {
	const { filters, setStatusFilter } = useSokStore();
	const value = filters.status ? mapStatusTilDropdownOption(filters.status) : null;

	function handleOnStatusSelectedChanged(selectedOption: DropdownOption | null) {
		const nyStatus = selectedOption ? selectedOption.value as UtkastStatus : undefined;
		setStatusFilter(nyStatus)
	}

	return (
		<div className="status-dropdown">
			<Element>Status</Element>
			<Select
				inputId="status-filter"
				placeholder="Filtrer på status"
				value={value}
				isClearable
				isSearchable={false}
				options={statusOptions}
				onChange={handleOnStatusSelectedChanged as any}
			/>
		</div>
	);
};
