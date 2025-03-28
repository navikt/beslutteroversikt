import { FetchInfo } from './utils';

export const VIS_VEDTAKSLOSNING_14A = 'veilarbvedtaksstotte.visVedtakslosning14a';

export const ALL_TOGGLES = [VIS_VEDTAKSLOSNING_14A];

export interface OboUnleashFeatures {
	[VIS_VEDTAKSLOSNING_14A]: boolean;
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
