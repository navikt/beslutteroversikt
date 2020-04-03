import { useEffect } from 'react';
import { useFetchStore } from '../stores/fetch-store';
import { lagBeslutterOversiktSok } from '../utils/sok-utils';
import { useSokStore } from '../stores/sok-store';

export const SokSync = () => {
	const { brukere } = useFetchStore();
	const { filters, currentPage, orderByDirection, orderByField } = useSokStore();

	useEffect(() => {
		const sok = lagBeslutterOversiktSok(filters, currentPage, orderByDirection, orderByField);
		brukere.fetch({ sok });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [filters, currentPage, orderByDirection, orderByField]);

	return null;
};
