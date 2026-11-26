import constate from 'constate';
import useFetch from '../rest/use-fetch';
import {
	BeslutteroversiktSok,
	lagHentAktivEnhetFetchInfo,
	lagHentBrukereFetchInfo,
	lagHentInnloggetVeilederFetchInfo
} from '../rest/api';
import { BrukereMedAntall, UtkastStatus } from '../rest/data/bruker';
import { InnloggetVeileder } from '../rest/data/innlogget-veileder';
import { AktivEnhet } from '../rest/data/aktiv-enhet';
import { OrNothing } from '../utils/types/ornothing';
import { lagHentUnleashFeaturetoggleInfo, OboUnleashFeatures } from '../rest/obo-unleash';

export const [DataFetcherStoreProvider, useDataFetcherStore] = constate(() => {
	const brukereFetcher = useFetch<BrukereMedAntall, { sok: BeslutteroversiktSok }>(lagHentBrukereFetchInfo);
	const innloggetVeilederFetcher = useFetch<InnloggetVeileder>(lagHentInnloggetVeilederFetchInfo);
	const aktivEnhetFetcher = useFetch<OrNothing<AktivEnhet>>(lagHentAktivEnhetFetchInfo);
	const unleashFeaturetoggleFetcher = useFetch<OboUnleashFeatures>(lagHentUnleashFeaturetoggleInfo);

	function oppdaterBeslutter(vedtakId: number) {
		const statusEndret = new Date().toISOString();
		const veileder = innloggetVeilederFetcher.data;

		brukereFetcher.updateData(data => ({
			...data,
			brukere: data.brukere.map(bruker =>
				bruker.vedtakId === vedtakId
					? {
							...bruker,
							status: UtkastStatus.KLAR_TIL_BESLUTTER,
							beslutterNavn: veileder.navn,
							beslutterIdent: veileder.ident,
							statusEndret
						}
					: bruker
			)
		}));
	}

	return {
		oppdaterBeslutter,
		brukereFetcher,
		innloggetVeilederFetcher,
		aktivEnhetFetcher,
		unleashFeaturetoggleFetcher
	};
});
