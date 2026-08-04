import { http, HttpResponse, RequestHandler } from 'msw';
import { DARKMODE_TOGGLE, EKSEMPELTOGGLE, OboUnleashFeatures } from '../../rest/obo-unleash';

const mockFeatures: OboUnleashFeatures = {
	[EKSEMPELTOGGLE]: false,
	[DARKMODE_TOGGLE]: false
};

export const oboUnleashHandlers: RequestHandler[] = [
	http.get('/obo-unleash/api/feature', async () => {
		return HttpResponse.json(mockFeatures);
	})
];
