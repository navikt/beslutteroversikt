import React from 'react';
import Select from 'react-select';
import { Element } from 'nav-frontend-typografi';
import { DropdownOption } from '../enhet-dropdown/enhet-dropdown';
import { useFilterStore } from '../../../stores/filter-store';
import './custom-dropdown.less';

export enum CustomFilter {
	MINE_BRUKERE = 'MINE_BRUKERE',
	MANGLER_BESLUTTER = 'MANGLER_BESLUTTER'
}

const customOptions: DropdownOption[] = [
	{ value: CustomFilter.MINE_BRUKERE, label: 'Mine brukere' },
	{ value: CustomFilter.MANGLER_BESLUTTER, label: 'Mangler beslutter' }
];

export const CustomDropdown = () => {
	const { filters, setStatusFilter } = useFilterStore();

	function handleOnStatusSelectedChanged(selectedOption: DropdownOption | null) {
		console.log('selectedOption', selectedOption); // tslint:disable-line
	}

	return (
		<div className="custom-dropdown">
			<Element>Filter</Element>
			<Select
				inputId="custom-filter"
				placeholder="Velg filter"
				options={customOptions}
				onChange={handleOnStatusSelectedChanged as any}
			/>
		</div>
	);
};
