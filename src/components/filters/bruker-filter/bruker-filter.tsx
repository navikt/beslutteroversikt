import React from 'react';
import { Checkbox } from 'nav-frontend-skjema';
import { useSokStore } from '../../../stores/sok-store';
import '../../filters/filters.less';

export const BrukerFilter = () => {
	const { filters, setVisMineBrukere } = useSokStore();

	function handleOnVisMineBrukereChanged() {
		setVisMineBrukere(visMineBrukere => !visMineBrukere);
	}

	return (
		<div>
			<Checkbox
				label="Mine brukere"
				aria-label="Filtrer mine brukere"
				checked={filters.visMineBrukere}
				onChange={handleOnVisMineBrukereChanged}
			/>
		</div>
	);
};
