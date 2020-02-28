import createUseContext from 'constate';
import { useMemo, useState } from 'react';

export interface Filters {
	fnrOrName: string;
	enheter: string[];
}

export const useFilterStore = createUseContext(() => {
	const [fnrOrNameFilter, setFnrOrNameFilter] = useState<string>('');
	const [enheterFilter, setEnheterFilter] = useState<string[]>([]);

	const filters: Filters = useMemo(() => {
		return {
			fnrOrName: fnrOrNameFilter,
			enheter: enheterFilter
		};
	}, [fnrOrNameFilter, enheterFilter]);

	return { filters, setFnrOrNameFilter, setEnheterFilter };
});
