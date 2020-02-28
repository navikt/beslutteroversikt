import createUseContext from 'constate';
import { useMemo, useState } from 'react';
import { Enhet } from '../rest/data/innlogget-veileder';

export enum StatusFilter {
	ALLE = 'ALLE',
	VENTER_PA_VEILEDER = 'VENTER_PA_VEILEDER',
	VENTER_PA_BESLUTTER = 'VENTER_PA_BESLUTTER',
	KLAR_TIL_UTSENDING = 'KLAR_TIL_UTSENDING'
}

export interface Filters {
	fnrOrName: string;
	enheter: Enhet[];
	status: StatusFilter;
}

export const useFilterStore = createUseContext(() => {
	const [fnrOrNameFilter, setFnrOrNameFilter] = useState<string>('');
	const [enheterFilter, setEnheterFilter] = useState<Enhet[]>([]);
	const [statusFilter, setStatusFilter] = useState<StatusFilter>(StatusFilter.ALLE);

	const filters: Filters = useMemo(() => {
		return {
			fnrOrName: fnrOrNameFilter,
			enheter: enheterFilter,
			status: statusFilter

		};
	}, [fnrOrNameFilter, enheterFilter, statusFilter]);

	return { filters, setFnrOrNameFilter, setEnheterFilter, setStatusFilter };
});
