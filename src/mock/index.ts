import FetchMock, { MiddlewareUtils } from 'yet-another-fetch-mock';


const fetchMock = FetchMock.configure({
	enableFallback: true,
	middleware: MiddlewareUtils.combine(MiddlewareUtils.delayMiddleware(500), MiddlewareUtils.loggingMiddleware())
});

fetchMock.get('/veilarbvedtaksstotte/api/:fnr/vedtakFraArena', {});