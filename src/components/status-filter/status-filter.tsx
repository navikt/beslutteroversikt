import React from 'react';
import './status-filter.less';
import { FilterPanel } from '../filter-panel/filter-panel';
import { Systemtittel } from 'nav-frontend-typografi';

export const StatusFilter = () => {
    return (
    	<FilterPanel>
		    <Systemtittel>Status</Systemtittel>
	    </FilterPanel>
    );
};
