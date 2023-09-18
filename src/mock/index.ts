import FetchMock, { MiddlewareUtils, MockHandler } from 'yet-another-fetch-mock';
import { mockBeslutteroversiktSok } from './sok-mock';
import { MODIACONTEXTHOLDER_API, VEILARBVEDTAKSSTOTTE_API, VEILARBVEILEDER_API } from '../rest/api';
import { innloggetVeileder } from './data/innlogget-veileder';
import { aktivEnhet } from './data/aktiv-enhet';

export interface Mock {
	url: string;
	handler: MockHandler;
}

const fetchMock = FetchMock.configure({
	enableFallback: true,
	middleware: MiddlewareUtils.combine(MiddlewareUtils.delayMiddleware(500), MiddlewareUtils.loggingMiddleware())
});

fetchMock.post(mockBeslutteroversiktSok.url, mockBeslutteroversiktSok.handler);
fetchMock.get(`${VEILARBVEILEDER_API}/veileder/v2/me`, successResponse(innloggetVeileder));
fetchMock.get(`${MODIACONTEXTHOLDER_API}/context/aktivenhet`, successResponse(aktivEnhet));
fetchMock.post(`${MODIACONTEXTHOLDER_API}/context`, successResponse());
fetchMock.get(`${VEILARBVEDTAKSSTOTTE_API}/utrulling/tilhorerVeilederUtrulletKontor`, successResponse(true));

function successResponse(responseData?: any): MockHandler {
	return (req, res, ctx) => {
		if (responseData) {
			return res(ctx.json(responseData));
		}
		return res(ctx.status(200));
	};
}

// eslint-disable-next-line
function failureResponse(): MockHandler {
	return (req, res, ctx) => res(ctx.status(500));
}
