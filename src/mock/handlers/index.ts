import { RequestHandler } from 'msw';
import { veilarbvedtaksstotteHandlers } from './veilarbvedtaksstotte';
import { modiacontextholderHandlers } from './modiacontextholder';
import { veilarbveilederHandlers } from './veilarbveileder';
import { defaultHandlers } from './default';
import { oboUnleashHandlers } from './mock-obo-unleash';
import { veilarbportefoljeHandlers } from './veilarbportefolje';

export const allHandlers: RequestHandler[] = [
	...veilarbvedtaksstotteHandlers,
	...modiacontextholderHandlers,
	...veilarbveilederHandlers,
	...veilarbportefoljeHandlers,
	...defaultHandlers,
	...oboUnleashHandlers
];
