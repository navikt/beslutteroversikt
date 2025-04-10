import { FetchInfo } from './utils';
import { OrNothing } from '../utils/types/ornothing';
import { UtkastStatus } from './data/bruker';
import { FrontendEvent } from '../utils/logger';

export const VEILARBVEDTAKSSTOTTE_API = '/veilarbvedtaksstotte/api';
export const VEILARBVEILEDER_API = '/veilarbveileder/api';
export const MODIACONTEXTHOLDER_API = '/modiacontextholder/api';

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
	ASC = 'ASC',
	DESC = 'DESC'
}

export const lagHentBrukereFetchInfo = (params: { sok: BeslutteroversiktSok }): FetchInfo => ({
	url: `${VEILARBVEDTAKSSTOTTE_API}/beslutteroversikt/sok`,
	method: 'POST',
	credentials: 'same-origin',
	headers: {
		'Content-Type': 'application/json'
	},
	body: JSON.stringify(params.sok)
});

export const lagHentInnloggetVeilederFetchInfo = (): FetchInfo => ({
	credentials: 'same-origin',
	url: `${VEILARBVEILEDER_API}/veileder/v2/me`
});

export const lagHentAktivEnhetFetchInfo = (): FetchInfo => ({
	credentials: 'same-origin',
	url: `${MODIACONTEXTHOLDER_API}/context/aktivenhet`
});

export function sendEventTilVedtaksstotte(event: FrontendEvent) {
	const url = `${VEILARBVEDTAKSSTOTTE_API}/logger/event`;
	const config = {
		method: 'post',
		credentials: 'same-origin',
		headers: {
			'Nav-Consumer-Id': 'beslutteroversikt',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(event)
	};

	// @ts-ignore
	return fetch(url, config);
}

export const lagSettBrukerIKontekstFetchInfo = (fnr: string): FetchInfo => ({
	body: JSON.stringify({ verdi: fnr, eventType: 'NY_AKTIV_BRUKER' }),
	credentials: 'same-origin',
	headers: {
		'Nav-Consumer-Id': 'beslutteroversikt',
		'Content-Type': 'application/json'
	},
	method: 'post',
	url: `${MODIACONTEXTHOLDER_API}/context`
});
