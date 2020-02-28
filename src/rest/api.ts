import { FetchInfo } from './utils';

export const VEILARBVEDTAKSSTOTTE_API = '/veilarbvedtaksstotte/api';
export const VEILARBVEILEDER_API = '/veilarbveileder/api';

export const lagHentBrukereFetchInfo = (): FetchInfo => ({
	url: `${VEILARBVEDTAKSSTOTTE_API}/beslutter/brukere`
});

export const lagHentInnloggetVeilederFetchInfo = (): FetchInfo => ({
	url: `${VEILARBVEILEDER_API}/veileder/v2/me`
});