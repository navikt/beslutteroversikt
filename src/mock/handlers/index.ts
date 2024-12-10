import { RequestHandler } from 'msw';
import { veilarbvedtaksstotteHandlers } from './veilarbvedtaksstotte';
import { modiacontextholderHandlers } from './modiacontextholder';
import { veilarbveilederHandlers } from './veilarbveileder';
import { defaultHandlers } from './default';

export const allHandlers: RequestHandler[] = [
	...veilarbvedtaksstotteHandlers,
	...modiacontextholderHandlers,
	...veilarbveilederHandlers,
	...defaultHandlers
];
