import { APP_NAME } from './constants';
import { logger } from './logger';

const fixNullValues = (obj: object): object => {
	Object.entries(obj).forEach(([key, value]) => {
		if (value === null) {
			(obj as any)[key] = undefined;
		}
	});
	return obj;
};

const logEvent = (logTag: string, fields?: {}, tags?: {}): void => {
	const frontlogger = (window as any).frontendlogger;

	if (frontlogger && frontlogger.event) {
		const eventFields = fields || {};
		const eventTags = tags || {};

		// Frontendlogger does not handle null values at this moment
		fixNullValues(eventFields);
		fixNullValues(eventTags);

		frontlogger.event(logTag, fields, tags);
	} else {
		logger.log('Event', logTag, 'Fields:', fields, 'Tags:', tags);
	}
};

const logError = (fields?: {}, tags?: {}): void => {
	logEvent(`${APP_NAME}.error`, fields, tags);
};

const logMetrikk = (metrikkNavn: string, fields?: {}, tags?: {}): void => {
	logEvent(`${APP_NAME}.metrikker.${metrikkNavn}`, fields, tags);
};

export const frontendlogger = {
	logEvent,
	logMetrikk,
	logError
};
