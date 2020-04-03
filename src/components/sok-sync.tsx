import { useEffect } from 'react';
import { useDataFetcherStore } from '../stores/data-fetcher-store';
import { lagBeslutterOversiktSok } from '../utils/sok-utils';
import { useSokStore } from '../stores/sok-store';

export const SokSync = () => {
	const { brukereFetcher } = useDataFetcherStore();
	const { filters, currentPage, orderByDirection, orderByField } = useSokStore();

	useEffect(() => {
		const sok = lagBeslutterOversiktSok(filters, currentPage, orderByDirection, orderByField);
		brukereFetcher.fetch({ sok });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [filters, currentPage, orderByDirection, orderByField]);

	return null;
};
