import { http, HttpResponse, RequestHandler } from 'msw';
import {
	DARKMODE_TOGGLE,
	EKSEMPELTOGGLE,
	KVALITETSSIKRERROLLE_TOGGLE,
	OboUnleashFeatures
} from '../../rest/obo-unleash';

const mockFeatures: OboUnleashFeatures = {
	[EKSEMPELTOGGLE]: false,
	[DARKMODE_TOGGLE]: false,
	[KVALITETSSIKRERROLLE_TOGGLE]: true
};

export const oboUnleashHandlers: RequestHandler[] = [
	http.get('/obo-unleash/api/feature', async () => {
		return HttpResponse.json(mockFeatures);
	})
];
