import { http, HttpResponse, RequestHandler } from 'msw';
import { VEILARBPORTEFOLJE_API } from '../../rest/api';
import { BrukerEtiketter } from '../../rest/data/etiketter';

const lagEtiketter = (fnr: string): BrukerEtiketter => {
	const siffer = Number(fnr.charAt(fnr.length - 1));
	return {
		fnr,
		erDoed: siffer === 0,
		diskresjonskodeFortrolig: siffer === 1 ? '6' : siffer === 2 ? '7' : null,
		egenAnsatt: siffer === 3,
		kandidatForUtmelding: siffer === 4
	};
};

export const veilarbportefoljeHandlers: RequestHandler[] = [
	http.post(`${VEILARBPORTEFOLJE_API}/v1/beslutteroversikt/hent-etiketter`, async ({ request }) => {
		const body = (await request.json()) as { fnrListe: string[] };
		return HttpResponse.json(body.fnrListe.map(lagEtiketter));
	})
];
