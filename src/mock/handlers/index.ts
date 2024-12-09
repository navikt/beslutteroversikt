import { RequestHandler } from 'msw';
import { veilarbvedtaksstotteHandlers } from './veilarbvedtaksstotte';
import { modiacontextholderHandlers } from './modiacontextholder';
import { veilarbveilederHandlers } from './veilarbveileder';

export const allHandlers: RequestHandler[] = [
	...veilarbvedtaksstotteHandlers,
	...modiacontextholderHandlers,
	...veilarbveilederHandlers
];
