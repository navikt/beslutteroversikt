import { useSokStore } from '../../../stores/sok-store';
import { Checkbox } from '@navikt/ds-react';

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
