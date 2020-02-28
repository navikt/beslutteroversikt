import React from 'react';
import { Input } from 'nav-frontend-skjema';
import './sokefelt.less';
import { useFilterStore } from '../../stores/filter-store';

export const Sokefelt = () => {
	const { fnrOrNameFilter, setFnrOrNameFilter } = useFilterStore();

	function handleOnQueryChanged(e: React.ChangeEvent<HTMLInputElement>) {
		setFnrOrNameFilter(e.target.value);
	}

    return (
    	<div className="sokefelt">
		    <Input
			    label=""
			    placeholder="Søk etter navn eller fødselsnummer"
			    onChange={handleOnQueryChanged}
			    value={fnrOrNameFilter}
		    />
	    </div>
    );
};
