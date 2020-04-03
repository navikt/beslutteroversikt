import { HandlerArgument, ResponseData } from 'yet-another-fetch-mock';
import { VEILARBVEDTAKSSTOTTE_API } from '../rest/api';
import { lagBrukere } from './data/brukere';
import { Mock } from './index';

const alleBrukere = lagBrukere(100);

export const mockBeslutteroversiktSok: Mock = {
	url: `${VEILARBVEDTAKSSTOTTE_API}/beslutteroversikt/sok`,
	handler: async (args: HandlerArgument): Promise<ResponseData> => {

		return { status: 200, body: JSON.stringify(alleBrukere) };
	}
};
