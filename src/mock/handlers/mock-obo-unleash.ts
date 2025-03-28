import { http, HttpResponse, RequestHandler } from 'msw';
import { OboUnleashFeatures, VIS_VEDTAKSLOSNING_14A } from '../../rest/obo-unleash';

const mockFeatures: OboUnleashFeatures = {
	[VIS_VEDTAKSLOSNING_14A]: true
};

export const oboUnleashHandlers: RequestHandler[] = [
	http.get('/obo-unleash/api/feature', async () => {
		return HttpResponse.json(mockFeatures);
	})
];
