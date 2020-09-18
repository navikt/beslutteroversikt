import FetchMock, { MiddlewareUtils, MockHandler } from 'yet-another-fetch-mock';
import { mockBeslutteroversiktSok } from './sok-mock';
import { MODIACONTEXTHOLDER_API, VEILARBVEILEDER_API } from '../rest/api';
import { innloggetVeileder } from './data/innlogget-veileder';
import { aktivEnhet } from './data/aktiv-enhet';
import features from './data/features';

export interface Mock {
	url: string;
	handler: MockHandler
}

const fetchMock = FetchMock.configure({
	enableFallback: true,
	middleware: MiddlewareUtils.combine(MiddlewareUtils.delayMiddleware(500), MiddlewareUtils.loggingMiddleware())
});

fetchMock.post(mockBeslutteroversiktSok.url, mockBeslutteroversiktSok.handler);
fetchMock.get(`${VEILARBVEILEDER_API}/veileder/v2/me`, jsonResponse(innloggetVeileder));
fetchMock.get(`${MODIACONTEXTHOLDER_API}/context/aktivenhet`, jsonResponse(aktivEnhet));
fetchMock.get('/veilarbpersonflatefs/api/feature', jsonResponse(features));

function jsonResponse(value: any): MockHandler {
	return (req, res, ctx) => res(ctx.json(value));
}
