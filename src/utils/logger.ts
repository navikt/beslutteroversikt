import {
	createFrontendLogger,
	createMockFrontendLogger,
	DEFAULT_FRONTENDLOGGER_API_URL
} from '@navikt/frontendlogger/lib';
import { APP_NAME } from './constants';

export const logger = process.env.REACT_APP_DEV
	? createMockFrontendLogger(APP_NAME)
	: createFrontendLogger(APP_NAME, DEFAULT_FRONTENDLOGGER_API_URL);

export const logError = (fields?: {}, tags?: {}): void => {
	logger.event(`${APP_NAME}.error`, fields, tags);
};

export const logMetrikk = (metrikkNavn: string, fields?: {}, tags?: {}): void => {
	logger.event(`${APP_NAME}.metrikker.${metrikkNavn}`, fields, tags);
};
