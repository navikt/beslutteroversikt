import { VEILARBVEILEDER_API } from '../../rest/api';
import { innloggetVeileder } from '../data/innlogget-veileder';
import { http, HttpResponse, RequestHandler } from 'msw';

export const veilarbveilederHandlers: RequestHandler[] = [
	http.get(`${VEILARBVEILEDER_API}/veileder/v2/me`, async () => {
		return HttpResponse.json(innloggetVeileder);
	})
];
