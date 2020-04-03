import createUseContext from 'constate';
import useFetch from '../rest/use-fetch';
import { BeslutteroversiktSok, lagHentBrukereFetchInfo, lagHentInnloggetVeilederFetchInfo } from '../rest/api';
import { Bruker } from '../rest/data/bruker';
import { InnloggetVeileder } from '../rest/data/innlogget-veileder';

export const useFetchStore = createUseContext(() => {
	const brukere = useFetch<Bruker[], { sok: BeslutteroversiktSok }>(lagHentBrukereFetchInfo);
	const innloggetVeileder = useFetch<InnloggetVeileder>(lagHentInnloggetVeilederFetchInfo);

	return { brukere, innloggetVeileder };
});
