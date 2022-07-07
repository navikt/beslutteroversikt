import { APP_NAME } from './constants';
import { sendEventTilVedtaksstotte } from '../rest/api';

export interface FrontendEvent {
	name: string;
	fields?: {};
	tags?: {};
}

export const logMetrikk = (metrikkNavn: string, fields?: {}, tags?: {}): void => {
	if (process.env.REACT_APP_DEV === 'true') {
		// tslint:disable-next-line:no-console
		console.log('Event', metrikkNavn, 'Fields:', fields, 'Tags:', tags);
	} else {
		sendEventTilVedtaksstotte({name: `${APP_NAME}.metrikker.${metrikkNavn}`, fields, tags});
	}
};