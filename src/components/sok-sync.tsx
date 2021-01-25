import { useEffect } from 'react';
import { useDataFetcherStore } from '../stores/data-fetcher-store';
import { lagBeslutterOversiktSok } from '../utils/sok-utils';
import { useSokStore } from '../stores/sok-store';
import { hasFinishedWithData } from '../rest/utils';
import { usePrevious } from '../utils';
import { BeslutteroversiktSok } from '../rest/api';
import { PTO_VEDTAKSSTOTTE_PILOT } from '../rest/feature';
import { logMetrikk } from '../utils/logger';

function logSokMetrikker(sok: BeslutteroversiktSok, currentPage: number): void {
	const filterMetrikker: any = {};

	if (sok.filter) {
		filterMetrikker.antallEnheter = sok.filter.enheter ? sok.filter.enheter.length : 0;
		filterMetrikker.status = sok.filter.status;
		filterMetrikker.soktPaNavnEllerFnr = sok.filter.navnEllerFnr != null && sok.filter.navnEllerFnr.trim().length > 0;
		filterMetrikker.visMineBrukere = sok.filter.visMineBrukere || false;
	}

	logMetrikk('sok', {
		page: currentPage,
		orderByField: sok.orderByField,
		orderByDirection: sok.orderByDirection,
		...filterMetrikker
	}, {});
}

export const SokSync = () => {
	const { brukereFetcher, featuresFetcher } = useDataFetcherStore();
	const { filters, currentPage, pageSize, orderByDirection, orderByField, seeAll, setTotalPages, setCurrentPage } = useSokStore();
	const previousFilters = usePrevious(filters);

	useEffect(() => {
		// Ikke søk hvis man ikke har tilgang til piloten
		if (!featuresFetcher.data || !featuresFetcher.data[PTO_VEDTAKSSTOTTE_PILOT]) {
			return;
		}

		let curPage = currentPage;
		if (previousFilters !== filters) {
			curPage = 1; // When filters change, start from first page
			setCurrentPage(curPage);
		}

		const sok = lagBeslutterOversiktSok(filters, curPage, pageSize, seeAll, orderByDirection, orderByField);
		brukereFetcher.fetch({ sok });
		logSokMetrikker(sok, currentPage);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [filters, currentPage, orderByDirection, orderByField, seeAll, featuresFetcher.data]);

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
