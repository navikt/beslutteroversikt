import React, { ChangeEvent } from 'react';
import Select from 'react-select';
import { Element } from 'nav-frontend-typografi';
import { DropdownOption, mapDropdownOptionTilEnhet } from '../enhet-dropdown/enhet-dropdown';
import './status-dropdown.less';
import { UtkastStatus } from '../../../rest/data/bruker';
import { mapBrukerStatusTilTekst } from '../../../utils';
import { useSokStore } from '../../../stores/sok-store';

export function mapStatusTilDropdownOption(status: UtkastStatus): DropdownOption {
	return { value: status, label: mapBrukerStatusTilTekst(status) };
}

export function mapDropdownOptionTilStatus(dropdownOption: DropdownOption): UtkastStatus {
	return dropdownOption.value as UtkastStatus;
}

const statusOptions: DropdownOption[] = [
	mapStatusTilDropdownOption(UtkastStatus.TRENGER_BESLUTTER),
	mapStatusTilDropdownOption(UtkastStatus.KLAR_TIL_VEILEDER),
	mapStatusTilDropdownOption(UtkastStatus.KLAR_TIL_BESLUTTER),
	mapStatusTilDropdownOption(UtkastStatus.GODKJENT_AV_BESLUTTER),
];

export const StatusDropdown = () => {
	const { filters, setStatusFilter } = useSokStore();

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
				isClearable
				isSearchable={false}
				options={statusOptions}
				onChange={handleOnStatusSelectedChanged as any}
			/>
		</div>
	);
};
