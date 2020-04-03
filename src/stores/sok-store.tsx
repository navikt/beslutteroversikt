import createUseContext from 'constate';
import { useMemo, useState } from 'react';
import { Enhet } from '../rest/data/innlogget-veileder';
import { UtkastStatus } from '../rest/data/bruker';
import { OrNothing } from '../utils/types/ornothing';
import { OrderByDirection, OrderByField } from '../rest/api';

export interface Filters {
	fnrOrName: string;
	enheter: Enhet[];
	status: OrNothing<UtkastStatus>;
	visMineBrukere: boolean;
}

export const useSokStore = createUseContext(() => {
	const [totalPages, setTotalPages] = useState(-1); // TODO: Start using
	const [currentPage, setCurrentPage] = useState(0);
	const [orderByField, setOrderByField] = useState<OrderByField>();
	const [orderByDirection, setOrderByDirection] = useState<OrderByDirection>();

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
		filters,
		setFnrOrNameFilter, setEnheterFilter,
		setStatusFilter, setVisMineBrukere,
		totalPages, setTotalPages,
		currentPage, setCurrentPage,
		orderByField, setOrderByField,
		orderByDirection, setOrderByDirection
	};
});
