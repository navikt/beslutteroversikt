import FetchMock, { MiddlewareUtils } from 'yet-another-fetch-mock';
import { lagBrukere } from './data/brukere';
import { VEILARBVEDTAKSSTOTTE_API, VEILARBVEILEDER_API } from '../rest/api';
import { innloggetVeileder } from './data/innlogget-veileder';

const fetchMock = FetchMock.configure({
	enableFallback: true,
	middleware: MiddlewareUtils.combine(MiddlewareUtils.delayMiddleware(500), MiddlewareUtils.loggingMiddleware())
});

const brukere: any = lagBrukere(30);

fetchMock.get(`${VEILARBVEDTAKSSTOTTE_API}/beslutter/brukere`, brukere);
fetchMock.get(`${VEILARBVEILEDER_API}/veileder/v2/me`, innloggetVeileder as any);