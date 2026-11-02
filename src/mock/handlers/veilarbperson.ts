import { http, HttpResponse, RequestHandler } from 'msw';
import { VEILARBPERSON_GRAPHQL } from '../../rest/api';
import { Personalia } from '../../rest/data/personalia';

const lagPersonalia = (fnr: string): Personalia => {
	const siffer = Number(fnr.charAt(fnr.length - 1));
	return {
		dodsdato: siffer === 0 ? '2024-01-01' : null,
		diskresjonskode: siffer === 1 ? '6' : siffer === 2 ? '7' : null,
		egenAnsatt: siffer === 3
	};
};

export const veilarbpersonHandlers: RequestHandler[] = [
	http.post(VEILARBPERSON_GRAPHQL, async ({ request }) => {
		const body = (await request.json()) as { variables: { fnr: string } };
		return HttpResponse.json({ data: { person: lagPersonalia(body.variables.fnr) } });
	})
];
