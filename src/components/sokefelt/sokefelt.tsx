import React, { useState } from 'react';
import { Input } from 'nav-frontend-skjema';
import './sokefelt.less';

export const Sokefelt = () => {
	const [query, setQuery] = useState('');

	function handleOnQueryChanged(e: React.ChangeEvent<HTMLInputElement>) {
		setQuery(e.target.value);
	}

    return (
    	<div className="sokefelt">
		    <Input
			    label=""
			    placeholder="Søk etter navn eller fødselsnummer"
			    onChange={handleOnQueryChanged}
			    value={query}
		    />
	    </div>
    );
};
