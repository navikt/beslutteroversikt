import { afterAll, afterEach, assert, beforeAll, describe, expect, it, vi } from 'vitest';
import { getResponse } from 'msw';
import { VEILARBVEDTAKSSTOTTE_API } from '../../rest/api';
import { UtkastStatus } from '../../rest/data/bruker';
import { innloggetVeileder } from '../data/innlogget-veileder';
import { alleBrukere, veilarbvedtaksstotteHandlers } from './veilarbvedtaksstotte';

const origin = 'http://localhost';
const bruker = alleBrukere[0];
const originalBruker = { ...bruker };
const endpoint = `${origin}${VEILARBVEDTAKSSTOTTE_API}/beslutter/bliBeslutter`;

beforeAll(() => {
	vi.stubGlobal('location', new URL(origin));
});

afterEach(() => {
	Object.assign(bruker, originalBruker);
});

afterAll(() => {
	vi.unstubAllGlobals();
});

describe('bliBeslutter tests', () => {
	it('assigns the logged-in veileder and exposes the updated status in searches', async () => {
		bruker.beslutterNavn = null;
		bruker.beslutterIdent = null;
		bruker.status = UtkastStatus.TRENGER_BESLUTTER;
		bruker.statusEndret = '2020-01-01T00:00:00.000Z';
		const startedAt = Date.now();

		const response = await getResponse(
			veilarbvedtaksstotteHandlers,
			new Request(`${endpoint}?vedtakId=${bruker.vedtakId}`, { method: 'POST' })
		);

		expect(response?.status).toBe(200);
		expect(await response?.text()).toBe('');
		expect(Date.parse(bruker.statusEndret)).toBeGreaterThanOrEqual(startedAt);

		const searchResponse = await getResponse(
			veilarbvedtaksstotteHandlers,
			new Request(`${origin}${VEILARBVEDTAKSSTOTTE_API}/beslutteroversikt/sok`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					fra: 0,
					antall: alleBrukere.length,
					filter: { visMineBrukere: true, status: UtkastStatus.KLAR_TIL_BESLUTTER }
				})
			})
		);

		assert(searchResponse, 'Expected the search handler to return a response');
		expect(searchResponse.status).toBe(200);
		expect((await searchResponse.json()).brukere).toContainEqual(
			expect.objectContaining({
				vedtakId: bruker.vedtakId,
				beslutterNavn: innloggetVeileder.navn,
				beslutterIdent: innloggetVeileder.ident,
				status: UtkastStatus.KLAR_TIL_BESLUTTER
			})
		);
	});

	it('rejects a missing vedtakId without changing data', async () => {
		const originalBrukere = structuredClone(alleBrukere);
		const response = await getResponse(veilarbvedtaksstotteHandlers, new Request(endpoint, { method: 'POST' }));

		expect(response?.status).toBe(400);
		expect(alleBrukere).toEqual(originalBrukere);
	});

	it('returns 404 for an unknown vedtakId', async () => {
		const originalBrukere = structuredClone(alleBrukere);
		const unknownId = Math.max(...alleBrukere.map(bruker => bruker.vedtakId)) + 1;
		const response = await getResponse(
			veilarbvedtaksstotteHandlers,
			new Request(`${endpoint}?vedtakId=${unknownId}`, { method: 'POST' })
		);

		expect(response?.status).toBe(404);
		expect(alleBrukere).toEqual(originalBrukere);
	});
});
