import { FetchInfo } from './utils';
import { OrNothing } from '../utils/types/ornothing';
import { UtkastStatus } from './data/bruker';
import { TOGGLES } from './feature';

export const VEILARBVEDTAKSSTOTTE_API = '/veilarbvedtaksstotte/api';
export const VEILARBVEILEDER_API = '/veilarbveileder/api';
export const MODIACONTEXTHOLDER_API = '/modiacontextholder/api';
export const FEATURE_TOGGLE_URL = '/veilarbpersonflatefs/api/feature';

export interface BeslutteroversiktSok {
	fra: number;
	antall: number;

	filter: OrNothing<BeslutterOversiktSokFilter>;

	orderByField: OrNothing<OrderByField>;
	orderByDirection: OrNothing<OrderByDirection>;
}

export interface BeslutterOversiktSokFilter {
	enheter: OrNothing<string[]>;
	status: OrNothing<UtkastStatus>;
	visMineBrukere: OrNothing<boolean>;
	navnEllerFnr: OrNothing<string>;
}

export enum OrderByField {
	BRUKER_ETTERNAVN = 'BRUKER_ETTERNAVN',
	BRUKER_OPPFOLGINGSENHET_NAVN = 'BRUKER_OPPFOLGINGSENHET_NAVN',
	BRUKER_FNR = 'BRUKER_FNR',
	VEDTAK_STARTET = 'VEDTAK_STARTET',
	STATUS = 'STATUS',
	STATUS_ENDRET = 'STATUS_ENDRET',
	BESLUTTER_NAVN = 'BESLUTTER_NAVN',
	VEILEDER_NAVN = 'VEILEDER_NAVN'
}

export enum OrderByDirection {
	ASC, DESC
}

export const lagHentFeaturesFetchInfo = (): FetchInfo => {
	const toggles = TOGGLES.map(element => 'feature=' + element).join('&');
	return { url: `${FEATURE_TOGGLE_URL}/?${toggles}` };
};

export const lagHentBrukereFetchInfo = (params: { sok: BeslutteroversiktSok }): FetchInfo => ({
	url: `${VEILARBVEDTAKSSTOTTE_API}/beslutteroversikt/sok`,
	method: 'POST',
	headers: {
		'Content-Type': 'application/json'
	},
	body: JSON.stringify(params.sok)
});

export const lagHentInnloggetVeilederFetchInfo = (): FetchInfo => ({
	url: `${VEILARBVEILEDER_API}/veileder/v2/me`
});

export const lagHentAktivEnhetFetchInfo = (): FetchInfo => ({
	url: `${MODIACONTEXTHOLDER_API}/context/aktivenhet`
});
