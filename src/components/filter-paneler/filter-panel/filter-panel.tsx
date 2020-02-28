import React from 'react';
import { ChildrenProps } from '../../../utils/types/children-props';
import './filter-panel.less';
import { Undertittel } from 'nav-frontend-typografi';

interface FilterPanelProps extends ChildrenProps{
	tittel: string;
}

export const FilterPanel = (props: FilterPanelProps) => {
    return (
    	<div className="filter-panel">
		    <Undertittel>{props.tittel}</Undertittel>
		    {props.children}
	    </div>
    );
};
