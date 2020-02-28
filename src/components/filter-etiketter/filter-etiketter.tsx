import React from 'react';
import { Filters, StatusFilter, useFilterStore } from '../../stores/filter-store';
import { FilterEtikett } from './etikett/filter-etikett';
import './filter-etiketter.less';
import { isEmpty } from '../../utils';

export type OnRemoveClicked = (id: string) => void;

const NAVN_ELLER_FNR_FILTER = 'NAVN_ELLER_FNR_FILTER';
const ENHET_FILTER = 'ENHET_FILTER';
const STATUS_FILTER = 'STATUS_FILTER';

function lagFilterEtiketter(filters: Filters, onRemoveClicked: OnRemoveClicked) {
	const { fnrOrName, enheter, status } = filters;
	const filterEtiketter = [];

	if (!isEmpty(fnrOrName)) {
		filterEtiketter.push(
			<FilterEtikett key={NAVN_ELLER_FNR_FILTER} id={NAVN_ELLER_FNR_FILTER} tekst="Søk på navn eller fnr" onRemoveClicked={onRemoveClicked} />
		);
	}

	if (enheter.length > 0) {
		filterEtiketter.push(
			<FilterEtikett key={ENHET_FILTER} id={ENHET_FILTER} tekst="Søk på enhet" onRemoveClicked={onRemoveClicked} />
		);
	}

	if (status !== StatusFilter.ALLE) {
		filterEtiketter.push(
			<FilterEtikett key={STATUS_FILTER} id={STATUS_FILTER} tekst="Søk på status" onRemoveClicked={onRemoveClicked} />
		);
	}

	return filterEtiketter;
}

export const FilterEtiketter = () => {
	const { filters, setFnrOrNameFilter, setEnheterFilter, setStatusFilter } = useFilterStore();

	function handleOnRemoveClicked(id: string) {
		if (id === NAVN_ELLER_FNR_FILTER) {
			setFnrOrNameFilter('');
		} else if (id === ENHET_FILTER) {
			setEnheterFilter([]);
		} else if (id === STATUS_FILTER) {
			setStatusFilter(StatusFilter.ALLE);
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
