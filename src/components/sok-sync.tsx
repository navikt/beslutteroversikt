import { useEffect, useRef } from 'react';
import { useDataFetcherStore } from '../stores/data-fetcher-store';
import { lagBeslutterOversiktSok } from '../utils/sok-utils';
import { useSokStore } from '../stores/sok-store';
import { hasFinishedWithData } from '../rest/utils';
import { BeslutteroversiktSok } from '../rest/api';
import { logMetrikk } from '../utils/logger';

function logSokMetrikker(sok: BeslutteroversiktSok, currentPage: number): void {
	const filterMetrikker: Record<string, unknown> = {};

	if (sok.filter) {
		filterMetrikker.antallEnheter = sok.filter.enheter ? sok.filter.enheter.length : 0;
		filterMetrikker.status = sok.filter.status;
		filterMetrikker.soktPaNavnEllerFnr =
			sok.filter.navnEllerFnr != null && sok.filter.navnEllerFnr.trim().length > 0;
		filterMetrikker.visMineBrukere = sok.filter.visMineBrukere || false;
	}

	logMetrikk(
		'sok',
		{
			page: currentPage,
			orderByField: sok.orderByField,
			orderByDirection: sok.orderByDirection,
			...filterMetrikker
		},
		{}
	);
}

export const SokSync = () => {
	const { brukereFetcher } = useDataFetcherStore();
	const { filters, currentPage, pageSize, orderByDirection, orderByField, seeAll, setTotalPages, setCurrentPage } =
		useSokStore();
	const previousFiltersRef = useRef(filters);

	useEffect(() => {
		const previousFilters = previousFiltersRef.current;
		previousFiltersRef.current = filters;
		const filtersChanged = previousFilters !== filters;

		// Når filtrene endres starter vi på side 1
		if (filtersChanged && currentPage !== 1) {
			setCurrentPage(1);
			return;
		}

		const fetchPage = filtersChanged ? 1 : currentPage;

		const sok = lagBeslutterOversiktSok(filters, fetchPage, pageSize, seeAll, orderByDirection, orderByField);
		brukereFetcher.fetch({ sok });
		logSokMetrikker(sok, fetchPage);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [filters, currentPage, orderByDirection, orderByField, seeAll]);

	useEffect(() => {
		if (hasFinishedWithData(brukereFetcher)) {
			const totaltAntallBrukere = brukereFetcher.data.totaltAntall;
			const totalPages = Math.max(1, Math.ceil(totaltAntallBrukere / pageSize));
			setTotalPages(totalPages);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [brukereFetcher]);

	return null;
};
