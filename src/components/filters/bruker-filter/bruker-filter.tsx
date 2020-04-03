import React from 'react';
import { Element } from 'nav-frontend-typografi';
import { DropdownOption } from '../enhet-dropdown/enhet-dropdown';
import { Checkbox } from 'nav-frontend-skjema';
import './bruker-filter.less';
import { useSokStore } from '../../../stores/sok-store';

export const BrukerFilter = () => {
	const { filters, setStatusFilter } = useSokStore();

	function handleOnStatusSelectedChanged(selectedOption: DropdownOption | null) {
		console.log('selectedOption', selectedOption); // tslint:disable-line
	}

	return (
		<div className="bruker-filter">
			<Element>Bruker</Element>
			<Checkbox label="Mine brukere" className="bruker-filter__checkbox" />
		</div>
	);
};
