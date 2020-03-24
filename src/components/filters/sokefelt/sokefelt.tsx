import React from 'react';
import { Input } from 'nav-frontend-skjema';
import { useFilterStore } from '../../../stores/filter-store';
import './sokefelt.less';

export const Sokefelt = () => {
	const { filters, setFnrOrNameFilter } = useFilterStore();

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
