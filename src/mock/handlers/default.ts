import { http, passthrough, RequestHandler } from 'msw';

/*
 * Request handlere som bruker passthrough vil intercepte en request til den spesifiserte
 * path-en men så bare sende det videre uten behandling.
 *
 * Alle path-er som vi ikke har definert handlere for vil gi warning i console.
 * Ser man en warning i console for en path kan man enten definere den her med en passthrough
 * eller definere en faktisk handler for den i en passende fil dersom vi ønsker å returnere noe mock-data.
 */
export const defaultHandlers: RequestHandler[] = [
	http.get('/modiacontextholder/api/decorator', async () => {
		return passthrough();
	}),
	http.get('https://cdn.nav.no*', async () => {
		passthrough();
	}),
	http.get('/index.css', async () => {
		passthrough();
	})
];
