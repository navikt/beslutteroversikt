import { http, HttpResponse, RequestHandler } from 'msw';
import {
	DARKMODE_TOGGLE,
	EKSEMPELTOGGLE,
	ENHETSFILTER_OG_ENKELTTILGANG_TOGGLE,
	OboUnleashFeatures
} from '../../rest/obo-unleash';

const mockFeatures: OboUnleashFeatures = {
	[EKSEMPELTOGGLE]: false,
	[DARKMODE_TOGGLE]: false,
	[ENHETSFILTER_OG_ENKELTTILGANG_TOGGLE]: true
};

export const oboUnleashHandlers: RequestHandler[] = [
	http.get('/obo-unleash/api/feature', async () => {
		return HttpResponse.json(mockFeatures);
	})
];
