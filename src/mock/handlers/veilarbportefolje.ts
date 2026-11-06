import { http, HttpResponse, RequestHandler } from 'msw';
import { VEILARBPORTEFOLJE_API } from '../../rest/api';
import { EtiketterForBruker } from '../../rest/data/etiketter';

const lagEtiketter = (fnr: string): EtiketterForBruker => {
	const siffer = Number(fnr.charAt(fnr.length - 1));
	return {
		fnr,
		etiketter: {
			erDoed: siffer === 0,
			egenAnsatt: siffer === 3,
			diskresjonskodeFortrolig: siffer === 1 ? '6' : siffer === 2 ? '7' : null,
			kandidatForUtmelding: siffer === 4
		}
	};
};

export const veilarbportefoljeHandlers: RequestHandler[] = [
	http.post(`${VEILARBPORTEFOLJE_API}/v1/beslutteroversikt/hent-etiketter`, async ({ request }) => {
		const body = (await request.json()) as { fnr: string[] };
		return HttpResponse.json(body.fnr.map(lagEtiketter));
	})
];
