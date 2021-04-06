import constate from 'constate';
import useFetch from '../rest/use-fetch';
import {
	BeslutteroversiktSok,
	lagHentAktivEnhetFetchInfo,
	lagHentBrukereFetchInfo,
	lagHentInnloggetVeilederFetchInfo, lagHentTilhorerVeilederUtrulletKontor
} from '../rest/api';
import { BrukereMedAntall } from '../rest/data/bruker';
import { InnloggetVeileder } from '../rest/data/innlogget-veileder';
import { AktivEnhet } from '../rest/data/aktiv-enhet';
import { OrNothing } from '../utils/types/ornothing';

export const [DataFetcherStoreProvider, useDataFetcherStore] = constate(() => {
	const brukereFetcher = useFetch<BrukereMedAntall, { sok: BeslutteroversiktSok }>(lagHentBrukereFetchInfo);
	const innloggetVeilederFetcher = useFetch<InnloggetVeileder>(lagHentInnloggetVeilederFetchInfo);
	const aktivEnhetFetcher = useFetch<OrNothing<AktivEnhet>>(lagHentAktivEnhetFetchInfo);
	const tilhorerVeilederUtrulletKontorFetcher = useFetch<boolean>(lagHentTilhorerVeilederUtrulletKontor);

	return { brukereFetcher, innloggetVeilederFetcher, aktivEnhetFetcher, tilhorerVeilederUtrulletKontorFetcher };
});
