import React from 'react';
import { Input } from 'nav-frontend-skjema';
import './sokefelt.less';
import { useSokStore } from '../../../stores/sok-store';

export const Sokefelt = () => {
	const { filters, setFnrOrNameFilter } = useSokStore();

	function handleOnQueryChanged(e: React.ChangeEvent<HTMLInputElement>) {
		setFnrOrNameFilter(e.target.value);
	}

    return (
    	<div className="sokefelt">
		    <Input
			    label=""
			    placeholder="Søk etter navn eller fødselsnummer"
			    onChange={handleOnQueryChanged}
			    value={filters.fnrOrName}
		    />
	    </div>
    );
};
