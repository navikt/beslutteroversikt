import React from 'react';
import { Sokefelt } from './sokefelt/sokefelt';
import './filters.less';
import { EnhetDropdown } from './enhet-dropdown/enhet-dropdown';
import { StatusDropdown } from './status-dropwdown/status-dropdown';
import { BrukerFilter } from './bruker-filter/bruker-filter';

export const Filters = () => {
    return (
    	<div className="filters">
		    <div className="filters__dropdowns">
			    <EnhetDropdown />
			    <BrukerFilter />
			    <StatusDropdown />
		    </div>
		    <Sokefelt/>
	    </div>
    );
};
