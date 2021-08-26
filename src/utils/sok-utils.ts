import { BeslutteroversiktSok, BeslutterOversiktSokFilter, OrderByDirection, OrderByField } from '../rest/api';
import { Filters } from '../stores/sok-store';
import { OrNothing } from './types/ornothing';
import { hasFilters } from './filter-utils';

export const DEFAULT_PAGINATION_SIZE = 10;

export const SEE_ALL_PAGINATION_SIZE = 10000;

export const lagBeslutterOversiktSok = (
	filters: Filters,
	currentPage: number,
	pageSize: number,
	seeAll: boolean,
	orderByDirection: OrNothing<OrderByDirection>,
	orderByField: OrNothing<OrderByField>
): BeslutteroversiktSok => {
	const antall = seeAll ? SEE_ALL_PAGINATION_SIZE : pageSize;
	const fra = seeAll ? 0 : (currentPage - 1) * pageSize;

	return {
		antall,
		fra,
		orderByDirection,
		orderByField,
		filter: lagBeslutterOversiktSokFilter(filters)
	};
};

export const lagBeslutterOversiktSokFilter = (filters: Filters): OrNothing<BeslutterOversiktSokFilter> => {
	if (!hasFilters(filters)) {
		return undefined;
	}

	return {
		enheter: filters.enheter.map(e => e.enhetId),
		navnEllerFnr: filters.fnrOrName,
		status: filters.status,
		visMineBrukere: filters.visMineBrukere
	};
};
