import constate from 'constate';
import useFetch from '../rest/use-fetch';
import {
	BeslutteroversiktSok,
	lagHentAktivEnhetFetchInfo,
	lagHentBrukereFetchInfo,
	lagHentEtiketterFetchInfo,
	lagHentInnloggetVeilederFetchInfo
} from '../rest/api';
import { BrukereMedAntall } from '../rest/data/bruker';
import { BrukerEtiketter } from '../rest/data/etiketter';
import { InnloggetVeileder } from '../rest/data/innlogget-veileder';
import { AktivEnhet } from '../rest/data/aktiv-enhet';
import { OrNothing } from '../utils/types/ornothing';
import { lagHentUnleashFeaturetoggleInfo, OboUnleashFeatures } from '../rest/obo-unleash';

export const [DataFetcherStoreProvider, useDataFetcherStore] = constate(() => {
	const brukereFetcher = useFetch<BrukereMedAntall, { sok: BeslutteroversiktSok }>(lagHentBrukereFetchInfo);
	const etiketterFetcher = useFetch<BrukerEtiketter[], string[]>(lagHentEtiketterFetchInfo);
	const innloggetVeilederFetcher = useFetch<InnloggetVeileder>(lagHentInnloggetVeilederFetchInfo);
	const aktivEnhetFetcher = useFetch<OrNothing<AktivEnhet>>(lagHentAktivEnhetFetchInfo);
	const unleashFeaturetoggleFetcher = useFetch<OboUnleashFeatures>(lagHentUnleashFeaturetoggleInfo);

	return {
		brukereFetcher,
		etiketterFetcher,
		innloggetVeilederFetcher,
		aktivEnhetFetcher,
		unleashFeaturetoggleFetcher
	};
});
