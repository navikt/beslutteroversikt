import React from 'react';
import { StatusDropdown } from './status-dropwdown/status-dropdown';
import { BrukerFilter } from './bruker-filter/bruker-filter';
import './filters.less';

export const Filters = () => {
    return (
    	<div className="filters">
		    <div className="filters__dropdowns">
			    {/*<EnhetDropdown />*/}
			    <BrukerFilter />
			    <StatusDropdown />
		    </div>
		    {/*
		        Se FO-2883
		        <Sokefelt/>
		    */}
	    </div>
    );
};
