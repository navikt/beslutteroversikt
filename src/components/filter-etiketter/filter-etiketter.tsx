import React from 'react';
import { Filters, useFilterStore } from '../../stores/filter-store';
import { FilterEtikett } from './etikett/filter-etikett';
import './filter-etiketter.less';

export type OnRemoveClicked = (id: string) => void;

const NAVN_ELLER_FNR_FILTER = 'NAVN_ELLER_FNR_FILTER';

function lagFilterEtiketter(filters: Filters, onRemoveClicked: OnRemoveClicked) {
	const { fnrOrName } = filters;
	const filterEtiketter = [];

	if (fnrOrName && fnrOrName.trim().length > 0) {
		filterEtiketter.push(
			<FilterEtikett id={NAVN_ELLER_FNR_FILTER} tekst="Søk på navn eller fnr" onRemoveClicked={onRemoveClicked} />
		);
	}

	return filterEtiketter;
}

export const FilterEtiketter = () => {
	const { filters, setFnrOrNameFilter } = useFilterStore();

	function handleOnRemoveClicked(id: string) {
		if (id === NAVN_ELLER_FNR_FILTER) {
			setFnrOrNameFilter('');
		}
	}

	const etiketter = lagFilterEtiketter(filters, handleOnRemoveClicked);

	if (etiketter.length === 0) {
		return null;
	}

    return (
    	<div className="filter-etiketter">
		    {etiketter}
	    </div>
    );
};
