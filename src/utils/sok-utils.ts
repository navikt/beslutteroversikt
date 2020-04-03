import { BeslutteroversiktSok, BeslutterOversiktSokFilter, OrderByDirection, OrderByField } from '../rest/api';
import { Filters } from '../stores/sok-store';
import { OrNothing } from './types/ornothing';
import { hasFilters } from './filter-utils';

export const PAGINATION_SIZE = 30;

export const lagBeslutterOversiktSok = (
	filters: Filters, currentPage: number,
    orderByDirection: OrNothing<OrderByDirection>, orderByField: OrNothing<OrderByField>
): BeslutteroversiktSok => {
	return {
		antall: PAGINATION_SIZE,
		fra: currentPage * PAGINATION_SIZE,
		filter: lagBeslutterOversiktSokFilter(filters),
		orderByDirection,
		orderByField
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