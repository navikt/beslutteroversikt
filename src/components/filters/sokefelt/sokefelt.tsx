import React, { useCallback, useState } from 'react';
import debounce from 'lodash.debounce';
import { useSokStore } from '../../../stores/sok-store';
import './sokefelt.less';
import { TextField } from '@navikt/ds-react';

export const Sokefelt = () => {
	const { filters, setFnrOrNameFilter } = useSokStore();
	const [tekst, setTekst] = useState(filters.fnrOrName);

	const oppdaterFilter = useCallback(
		debounce((nyTekst: string) => {
			setFnrOrNameFilter(nyTekst);
		}, 500),
		[]
	);

	function handleOnQueryChanged(e: React.ChangeEvent<HTMLInputElement>) {
		const nyTekst = e.target.value;
		setTekst(nyTekst);
		oppdaterFilter(nyTekst);
	}

	return (
		<div className="sokefelt">
			<TextField
				label=""
				placeholder="Søk etter navn eller fødselsnummer"
				onChange={handleOnQueryChanged}
				value={tekst}
			/>
		</div>
	);
};
