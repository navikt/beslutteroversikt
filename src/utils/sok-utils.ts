import { BeslutteroversiktSok, BeslutterOversiktSokFilter, OrderByDirection, OrderByField } from '../rest/api';
import { Filters } from '../stores/sok-store';
import { OrNothing } from './types/ornothing';

export const PAGINATION_SIZE = 30;

export const defaultBeslutteroversiktSok: BeslutteroversiktSok = {
	antall: PAGINATION_SIZE,
	fra: 0,
	filter: undefined,
	orderByDirection: undefined,
	orderByField: undefined
};

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
	return undefined;
};