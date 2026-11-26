import { BeslutteroversiktSok, VEILARBVEDTAKSSTOTTE_API } from '../../rest/api';
import { http, HttpResponse, RequestHandler } from 'msw';
import { Bruker, UtkastStatus } from '../../rest/data/bruker';
import { innloggetVeileder } from '../data/innlogget-veileder';
import { lagBrukere } from '../data/brukere';
import { enheter } from '../data/enheter';

export const veilarbvedtaksstotteHandlers: RequestHandler[] = [
	http.get(`${VEILARBVEDTAKSSTOTTE_API}/beslutteroversikt/enheter`, () => HttpResponse.json(enheter)),
	http.post(`${VEILARBVEDTAKSSTOTTE_API}/beslutter/bliBeslutter`, ({ request }) => {
		const vedtakId = Number(new URL(request.url).searchParams.get('vedtakId'));

		if (!Number.isSafeInteger(vedtakId) || vedtakId <= 0) {
			return HttpResponse.json({ message: 'Invalid vedtakId' }, { status: 400 });
		}

		const bruker = alleBrukere.find(bruker => bruker.vedtakId === vedtakId);

		if (!bruker) {
			return HttpResponse.json({ message: 'Vedtak not found' }, { status: 404 });
		}

		bruker.beslutterNavn = innloggetVeileder.navn;
		bruker.beslutterIdent = innloggetVeileder.ident;
		bruker.status = UtkastStatus.KLAR_TIL_BESLUTTER;
		bruker.statusEndret = new Date().toISOString();

		return new HttpResponse(null, { status: 200 });
	}),
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
