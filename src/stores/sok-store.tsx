import constate from 'constate';
import { useMemo, useState } from 'react';
import { Enhet } from '../rest/data/innlogget-veileder';
import { UtkastStatus } from '../rest/data/bruker';
import { OrNothing } from '../utils/types/ornothing';
import { OrderByDirection, OrderByField } from '../rest/api';
import { DEFAULT_PAGINATION_SIZE } from '../utils/sok-utils';

export interface Filters {
	fnrOrName: string;
	enheter: Enhet[];
	status: OrNothing<UtkastStatus>;
	visMineBrukere: boolean;
}

export const [SokStoreProvider, useSokStore] = constate(() => {
	// Paginering
	const [totalPages, setTotalPages] = useState(1);
	const [currentPage, setCurrentPage] = useState(1);
	const [seeAll, setSeeAll] = useState(false);
	const [pageSize, setPageSize] = useState(DEFAULT_PAGINATION_SIZE);

	// Sortering
	const [orderByField, setOrderByField] = useState<OrNothing<OrderByField>>();
	const [orderByDirection, setOrderByDirection] = useState<OrNothing<OrderByDirection>>();

	// Filtrering
	const [fnrOrNameFilter, setFnrOrNameFilter] = useState<string>('');
	const [enheterFilter, setEnheterFilter] = useState<Enhet[]>([]);
	const [statusFilter, setStatusFilter] = useState<UtkastStatus>();
	const [visMineBrukere, setVisMineBrukere] = useState<boolean>(false);

	const filters: Filters = useMemo(() => {
		return {
			fnrOrName: fnrOrNameFilter,
			enheter: enheterFilter,
			status: statusFilter,
			visMineBrukere
		};
	}, [fnrOrNameFilter, enheterFilter, statusFilter, visMineBrukere]);

	return {
		totalPages, setTotalPages,
		currentPage, setCurrentPage,
		seeAll, setSeeAll,
		pageSize, setPageSize,
		orderByField, setOrderByField,
		orderByDirection, setOrderByDirection,
		filters,
		setFnrOrNameFilter, setEnheterFilter,
		setStatusFilter, setVisMineBrukere,
	};
});
