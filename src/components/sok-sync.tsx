import { useEffect } from 'react';
import { useDataFetcherStore } from '../stores/data-fetcher-store';
import { lagBeslutterOversiktSok } from '../utils/sok-utils';
import { useSokStore } from '../stores/sok-store';
import { hasFinishedWithData } from '../rest/utils';
import { usePrevious } from '../utils';

export const SokSync = () => {
	const { brukereFetcher } = useDataFetcherStore();
	const { filters, currentPage, pageSize, orderByDirection, orderByField, seeAll, setTotalPages, setCurrentPage } = useSokStore();
	const previousFilters = usePrevious(filters);

	useEffect(() => {
		let curPage = currentPage;
		if (previousFilters !== filters) {
			curPage = 1; // When filters change, start from first page
			setCurrentPage(curPage);
		}

		const sok = lagBeslutterOversiktSok(filters, curPage, pageSize, seeAll, orderByDirection, orderByField);
		brukereFetcher.fetch({ sok });
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
