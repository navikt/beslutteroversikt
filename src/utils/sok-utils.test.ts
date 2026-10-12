import { describe, expect, it } from 'vitest';
import type { Filters } from '../stores/sok-store';
import { lagBeslutterOversiktSok } from './sok-utils';
import { lagHentBrukereFetchInfo, lagHentEnheterMedUtkastFetchInfo } from '../rest/api';
import { UtkastStatus } from '../rest/data/bruker';

describe('enhetsfilter i søkeforespørselen', () => {
	it('henter enheter med utkast fra riktig endepunkt', () => {
		expect(lagHentEnheterMedUtkastFetchInfo()).toEqual({
			url: '/veilarbvedtaksstotte/api/beslutteroversikt/enheter',
			method: 'GET',
			credentials: 'same-origin'
		});
	});
	const filters: Filters = {
		enheter: [
			{ enhetId: '0234', navn: 'Nav Gjerdrum' },
			{ enhetId: '0219', navn: 'Nav Bærum' }
		],
		fnrOrName: '',
		status: undefined,
		visMineBrukere: false
	};

	it('sender valgte enhetsnumre som strenger til /sok', () => {
		const sok = lagBeslutterOversiktSok(filters, 1, 50, false, undefined, undefined);
		const request = lagHentBrukereFetchInfo({ sok });
		expect(request.url).toBe('/veilarbvedtaksstotte/api/beslutteroversikt/sok');
		expect(request.method).toBe('POST');
		expect(JSON.parse(String(request.body)).filter.enheter).toEqual(['0234', '0219']);
	});

	it('kombinerer enhetsfilteret med status og egne brukere', () => {
		const sok = lagBeslutterOversiktSok(
			{ ...filters, status: UtkastStatus.KLAR_TIL_BESLUTTER, visMineBrukere: true },
			1,
			50,
			false,
			undefined,
			undefined
		);
		expect(sok.filter).toMatchObject({
			enheter: ['0234', '0219'],
			status: UtkastStatus.KLAR_TIL_BESLUTTER,
			visMineBrukere: true
		});
	});

	it('fjerner enhetsbegrensningen når siste enhet fjernes', () => {
		const sok = lagBeslutterOversiktSok({ ...filters, enheter: [] }, 1, 50, false, undefined, undefined);
		expect(sok.filter).toBeUndefined();

		const sokMedStatus = lagBeslutterOversiktSok(
			{ ...filters, enheter: [], status: UtkastStatus.KLAR_TIL_BESLUTTER },
			1,
			50,
			false,
			undefined,
			undefined
		);
		expect(sokMedStatus.filter?.enheter).toEqual([]);
		expect(sokMedStatus.filter?.status).toBe(UtkastStatus.KLAR_TIL_BESLUTTER);
	});
});
