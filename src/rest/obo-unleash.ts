import { FetchInfo } from './utils';

export const EKSEMPELTOGGLE = 'skriv-togglenavn-her';

export const ALL_TOGGLES = [EKSEMPELTOGGLE];

export interface OboUnleashFeatures {
	[EKSEMPELTOGGLE]: boolean;
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
