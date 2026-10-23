import { BeslutteroversiktSok, VEILARBVEDTAKSSTOTTE_API } from '../../rest/api';
import { http, HttpResponse, RequestHandler } from 'msw';
import { Bruker } from '../../rest/data/bruker';
import { innloggetVeileder } from '../data/innlogget-veileder';
import { lagBrukere } from '../data/brukere';
import { enheter } from '../data/enheter';

export const veilarbvedtaksstotteHandlers: RequestHandler[] = [
	http.get(`${VEILARBVEDTAKSSTOTTE_API}/beslutteroversikt/enheter`, () => HttpResponse.json(enheter)),
	http.post(`${VEILARBVEDTAKSSTOTTE_API}/beslutteroversikt/sok`, async ({ request }) => {
		const sokRequest = (await request.json()) as BeslutteroversiktSok;
		const filtrerteBrukere = filtrerBrukere(sokRequest, alleBrukere);
		const paginerteBrukere = filtrerteBrukere.slice(sokRequest.fra, sokRequest.fra + sokRequest.antall);

		return HttpResponse.json({ brukere: paginerteBrukere, totaltAntall: filtrerteBrukere.length });
	})
];

export const alleBrukere = lagBrukere(85);
export const filtrerBrukere = (sok: BeslutteroversiktSok, brukere: Bruker[]): Bruker[] => {
	return brukere.filter(bruker => {
		if (!sok.filter) {
			return true;
		}

		if (sok.filter.visMineBrukere) {
			if (bruker.beslutterNavn !== innloggetVeileder.fornavn + ' ' + innloggetVeileder.etternavn) {
				return false;
			}
		}

		if (sok.filter.status) {
			if (bruker.status !== sok.filter.status) {
				return false;
			}
		}

		if (sok.filter.enheter && sok.filter.enheter.length > 0) {
			if (!sok.filter.enheter.includes(bruker.brukerOppfolgingsenhetId)) {
				return false;
			}
		}

		return true;
	});
};
