import { useSokStore } from '../../../stores/sok-store';
import { Checkbox } from '@navikt/ds-react';
import '../filters.css';

export const BrukerFilter = () => {
	const { filters, setVisMineBrukere } = useSokStore();

	function handleOnVisMineBrukereChanged() {
		setVisMineBrukere(visMineBrukere => !visMineBrukere);
	}

	return (
		<Checkbox size="small" checked={filters.visMineBrukere} onChange={handleOnVisMineBrukereChanged}>
			Mine brukere
		</Checkbox>
	);
};
