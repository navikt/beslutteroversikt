import constate from 'constate';
import useFetch from '../rest/use-fetch';
import {
	BeslutteroversiktSok,
	lagHentAktivEnhetFetchInfo,
	lagHentBrukereFetchInfo, lagHentFeaturesFetchInfo,
	lagHentInnloggetVeilederFetchInfo
} from '../rest/api';
import { BrukereMedAntall } from '../rest/data/bruker';
import { InnloggetVeileder } from '../rest/data/innlogget-veileder';
import { AktivEnhet } from '../rest/data/aktiv-enhet';
import { OrNothing } from '../utils/types/ornothing';
import { Features } from '../rest/feature';

export const [DataFetcherStoreProvider, useDataFetcherStore] = constate(() => {
	const brukereFetcher = useFetch<BrukereMedAntall, { sok: BeslutteroversiktSok }>(lagHentBrukereFetchInfo);
	const innloggetVeilederFetcher = useFetch<InnloggetVeileder>(lagHentInnloggetVeilederFetchInfo);
	const aktivEnhetFetcher = useFetch<OrNothing<AktivEnhet>>(lagHentAktivEnhetFetchInfo);
	const featuresFetcher = useFetch<Features>(lagHentFeaturesFetchInfo);

	return { brukereFetcher, innloggetVeilederFetcher, aktivEnhetFetcher, featuresFetcher };
});
