import React from 'react';
import { Element } from 'nav-frontend-typografi';
import { Checkbox } from 'nav-frontend-skjema';
import { useSokStore } from '../../../stores/sok-store';
import './bruker-filter.less';

export const BrukerFilter = () => {
	const { filters, setVisMineBrukere } = useSokStore();

	function handleOnVisMineBrukereChanged() {
		setVisMineBrukere(visMineBrukere => !visMineBrukere);
	}

	return (
		<div className="bruker-filter">
			<Element>Bruker</Element>
			<Checkbox
				label="Mine brukere"
				className="bruker-filter__checkbox"
				checked={filters.visMineBrukere}
				onChange={handleOnVisMineBrukereChanged}
			/>
		</div>
	);
};
