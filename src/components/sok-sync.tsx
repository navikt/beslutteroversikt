import { useEffect } from 'react';
import { useDataFetcherStore } from '../stores/data-fetcher-store';
import { lagBeslutterOversiktSok } from '../utils/sok-utils';
import { useSokStore } from '../stores/sok-store';
import { hasFinishedWithData } from '../rest/utils';

export const SokSync = () => {
	const { brukereFetcher } = useDataFetcherStore();
	const { filters, currentPage, pageSize, orderByDirection, orderByField, seeAll, setTotalPages } = useSokStore();

	useEffect(() => {
		const sok = lagBeslutterOversiktSok(filters, currentPage, pageSize, seeAll, orderByDirection, orderByField);
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
