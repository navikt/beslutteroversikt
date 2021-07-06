import React from 'react';
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
			<Checkbox
				id="Minebrukere"
				label="Mine brukere"
				aria-label="Filtrer mine brukere"
				className="bruker-filter__checkbox"
				checked={filters.visMineBrukere}
				onChange={handleOnVisMineBrukereChanged}
			/>
		</div>
	);
};
