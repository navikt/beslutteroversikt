import { MODIACONTEXTHOLDER_API } from '../../rest/api';
import { aktivEnhet, modiaDecorator } from '../data/aktiv-enhet';
import { http, HttpResponse, RequestHandler } from 'msw';

export const modiacontextholderHandlers: RequestHandler[] = [
	http.get(`${MODIACONTEXTHOLDER_API}/context/aktivenhet`, async () => {
		return HttpResponse.json(aktivEnhet);
	}),
	http.get(`${MODIACONTEXTHOLDER_API}/decorator`, async () => {
		return HttpResponse.json(modiaDecorator);
	}),
	http.post(`${MODIACONTEXTHOLDER_API}/context`, async () => {
		return new HttpResponse(null, { status: 200 });
	})
];
