import { APP_NAME } from './constants';
import { sendEventTilVedtaksstotte } from '../rest/api';
import env from './environment';

export interface FrontendEvent {
	name: string;
	fields?: {};
	tags?: {};
}

export const logMetrikk = (metrikkNavn: string, fields?: {}, tags?: {}): void => {
	if (env.isLocal || env.isDevelopment) {
		// eslint-disable-next-line no-console
		console.log('Event', metrikkNavn, 'Fields:', fields, 'Tags:', tags);
	} else {
		sendEventTilVedtaksstotte({ name: `${APP_NAME}.metrikker.${metrikkNavn}`, fields, tags });
	}
};
