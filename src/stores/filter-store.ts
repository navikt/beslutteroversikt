import createUseContext from 'constate';
import { useMemo, useState } from 'react';
import { Enhet } from '../rest/data/innlogget-veileder';

export interface Filters {
	fnrOrName: string;
	enheter: Enhet[];
}

export const useFilterStore = createUseContext(() => {
	const [fnrOrNameFilter, setFnrOrNameFilter] = useState<string>('');
	const [enheterFilter, setEnheterFilter] = useState<Enhet[]>([]);

	const filters: Filters = useMemo(() => {
		return {
			fnrOrName: fnrOrNameFilter,
			enheter: enheterFilter
		};
	}, [fnrOrNameFilter, enheterFilter]);

	return { filters, setFnrOrNameFilter, setEnheterFilter };
});
