import { useEffect, useMemo, useState } from 'react';
import constate from 'constate';
import { Enhet } from '../rest/data/innlogget-veileder';
import { UtkastStatus } from '../rest/data/bruker';
import { OrNothing } from '../utils/types/ornothing';
import { lagHentEnheterMedUtkastFetchInfo, OrderByDirection, OrderByField } from '../rest/api';
import { KVALITETSSIKRERROLLE_TOGGLE } from '../rest/obo-unleash';
import { DEFAULT_PAGINATION_SIZE } from '../utils/sok-utils';
import useFetch from '../rest/use-fetch';
import { useDataFetcherStore } from './data-fetcher-store';

export interface Filters {
	fnrOrName: string;
	enheter: Enhet[];
	status: OrNothing<UtkastStatus>;
	visMineBrukere: boolean;
}

interface StoredSearch {
	status: OrNothing<UtkastStatus>;
	visMineBrukere: OrNothing<boolean>;
	orderByField: OrNothing<OrderByField>;
	orderByDirection: OrNothing<OrderByDirection>;
	currentPage: OrNothing<number>;
}

const SOK_STORAGE_NAME = 'beslutteroversikt_sok';

const storedSearchJson = window.sessionStorage.getItem(SOK_STORAGE_NAME);
const storedSearch: StoredSearch = storedSearchJson ? JSON.parse(storedSearchJson) : {};

export const [SokStoreProvider, useSokStore] = constate(() => {
	// Paginering
	const [totalPages, setTotalPages] = useState(1);
	const [currentPage, setCurrentPage] = useState(storedSearch.currentPage || 1);
	const [seeAll, setSeeAll] = useState(false);
	const [pageSize, setPageSize] = useState(DEFAULT_PAGINATION_SIZE);

	// Sortering
	const [orderByField, setOrderByField] = useState<OrNothing<OrderByField>>(storedSearch.orderByField);
	const [orderByDirection, setOrderByDirection] = useState<OrNothing<OrderByDirection>>(
		storedSearch.orderByDirection
	);

	// Filtrering
	const [fnrOrNameFilter, setFnrOrNameFilter] = useState<string>('');
	const [enheterFilter, setEnheterFilter] = useState<Enhet[]>([]);
	const [statusFilter, setStatusFilter] = useState<UtkastStatus | undefined>(storedSearch.status || undefined);
	const [visMineBrukere, setVisMineBrukere] = useState<boolean>(storedSearch.visMineBrukere || false);
	const enheterFetcher = useFetch<Enhet[]>(lagHentEnheterMedUtkastFetchInfo);
	const { unleashFeaturetoggleFetcher } = useDataFetcherStore();
	const visEnhetsvelger = Boolean(unleashFeaturetoggleFetcher.data?.[KVALITETSSIKRERROLLE_TOGGLE]);
	const hentEnheter = enheterFetcher.fetch;

	useEffect(() => {
		if (visEnhetsvelger) {
			hentEnheter(null);
		}
	}, [hentEnheter, visEnhetsvelger]);

	const filters: Filters = useMemo(() => {
		return {
			fnrOrName: fnrOrNameFilter,
			enheter: enheterFilter,
			status: statusFilter,
			visMineBrukere
		};
	}, [fnrOrNameFilter, enheterFilter, statusFilter, visMineBrukere]);

	useEffect(() => {
		const updatedSearch: StoredSearch = {
			...filters,
			orderByDirection,
			orderByField,
			currentPage
		};

		window.sessionStorage.setItem(SOK_STORAGE_NAME, JSON.stringify(updatedSearch));
	}, [filters, orderByDirection, orderByField, currentPage]);

	return {
		totalPages,
		setTotalPages,
		currentPage,
		setCurrentPage,
		seeAll,
		setSeeAll,
		pageSize,
		setPageSize,
		orderByField,
		setOrderByField,
		orderByDirection,
		setOrderByDirection,
		filters,
		enheter: enheterFetcher.data ?? [],
		setFnrOrNameFilter,
		setEnheterFilter,
		setStatusFilter,
		setVisMineBrukere
	};
});
