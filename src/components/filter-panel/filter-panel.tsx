import React from 'react';
import { ChildrenProps } from '../../utils/types/children-props';
import './filter-panel.less';

export const FilterPanel = (props: ChildrenProps) => {
    return (
    	<div className="filter-panel">
		    {props.children}
	    </div>
    );
};
