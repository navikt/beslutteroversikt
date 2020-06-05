import { HandlerArgument, ResponseData } from 'yet-another-fetch-mock';
import { BeslutteroversiktSok, VEILARBVEDTAKSSTOTTE_API } from '../rest/api';
import { lagBrukere } from './data/brukere';
import { Mock } from './index';
import { Bruker } from '../rest/data/bruker';
import { innloggetVeileder } from './data/innlogget-veileder';

const alleBrukere = lagBrukere(85);

export const mockBeslutteroversiktSok: Mock = {
	url: `${VEILARBVEDTAKSSTOTTE_API}/beslutteroversikt/sok`,
	handler: async (args: HandlerArgument): Promise<ResponseData> => {
		const sok = args.body as BeslutteroversiktSok;
		const filtrerteBrukere = filtrerBrukere(sok, alleBrukere);
		const paginerteBrukere = filtrerteBrukere.slice(sok.fra, sok.fra + sok.antall);
		return { status: 200, body: JSON.stringify({ brukere: paginerteBrukere, totaltAntall: filtrerteBrukere.length }) };
	}
};

const filtrerBrukere = (sok: BeslutteroversiktSok, brukere: Bruker[]): Bruker[] => {
	return brukere.filter(bruker => {
		if (!sok.filter) {
			return true;
		}

		if (sok.filter.visMineBrukere) {
			if (bruker.beslutterNavn !== (innloggetVeileder.fornavn + ' ' + innloggetVeileder.etternavn)) {
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