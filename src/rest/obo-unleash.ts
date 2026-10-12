import { FetchInfo } from './utils';

export const EKSEMPELTOGGLE = 'skriv-togglenavn-her';
export const DARKMODE_TOGGLE = 'beslutteroversikt.darkmode';
export const ENHETSFILTER_OG_ENKELTTILGANG_TOGGLE = 'beslutteroversikt.enhetsfilter_og_enkelttilgang';

export const ALL_TOGGLES = [EKSEMPELTOGGLE, DARKMODE_TOGGLE, ENHETSFILTER_OG_ENKELTTILGANG_TOGGLE];

export interface OboUnleashFeatures {
	[EKSEMPELTOGGLE]: boolean;
	[DARKMODE_TOGGLE]: boolean;
	[ENHETSFILTER_OG_ENKELTTILGANG_TOGGLE]: boolean;
}

export function lagHentUnleashFeaturetoggleInfo(): FetchInfo {
	const features = ALL_TOGGLES.map(element => 'feature=' + element).join('&');
	const url = `/obo-unleash/api/feature?${features}`;

	const config: RequestInit = {
		method: 'get',
		credentials: 'same-origin',
		headers: {
			'Nav-Consumer-Id': 'beslutteroversikt',
			'Content-Type': 'application/json'
		}
	};

	return {
		...config,
		url
	};
}
