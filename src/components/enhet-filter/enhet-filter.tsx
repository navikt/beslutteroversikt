import React from 'react';
import './enhet-filter.less';
import { FilterPanel } from '../filter-panel/filter-panel';
import { Systemtittel } from 'nav-frontend-typografi';

export const EnhetFilter = () => {
    return (
    	<FilterPanel>
		    <Systemtittel>Enhet</Systemtittel>
	    </FilterPanel>
    );
};
