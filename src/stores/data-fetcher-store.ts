import createUseContext from 'constate';
import useFetch from '../rest/use-fetch';
import { BeslutteroversiktSok, lagHentBrukereFetchInfo, lagHentInnloggetVeilederFetchInfo } from '../rest/api';
import { Bruker } from '../rest/data/bruker';
import { InnloggetVeileder } from '../rest/data/innlogget-veileder';

export const useDataFetcherStore = createUseContext(() => {
	const brukereFetcher = useFetch<Bruker[], { sok: BeslutteroversiktSok }>(lagHentBrukereFetchInfo);
	const innloggetVeilederFetcher = useFetch<InnloggetVeileder>(lagHentInnloggetVeilederFetchInfo);

	return { brukereFetcher, innloggetVeilederFetcher };
});
