import { http, HttpResponse, RequestHandler } from 'msw';
import { EKSEMPELTOGGLE, OboUnleashFeatures } from '../../rest/obo-unleash';

const mockFeatures: OboUnleashFeatures = {
	[EKSEMPELTOGGLE]: false
};

export const oboUnleashHandlers: RequestHandler[] = [
	http.get('/obo-unleash/api/feature', async () => {
		return HttpResponse.json(mockFeatures);
	})
];
