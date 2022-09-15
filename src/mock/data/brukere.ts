import { faker } from '@faker-js/faker';
import { Bruker, UtkastStatus } from '../../rest/data/bruker';
import { enheter } from './enheter';
import { randBetween } from '../../utils';

function randomFnr(): string {
	const dag = randBetween(1, 31);
	const mnd = randBetween(1, 12);
	const ar = randBetween(0, 99);
	const arhundre = randBetween(0, 99).toString().padStart(2, '0');
	const kjonnsiffer = Math.random() < 0.5 ? 4 : 1;
	const individsifre = `${arhundre}${kjonnsiffer}`;
	const kontrollsifre = `${randBetween(0, 9)}${randBetween(0, 9)}`;

	return `${dag.toString().padStart(2, '0')}${mnd.toString().padStart(2, '0')}${ar
		.toString()
		.padStart(2, '0')}${individsifre}${kontrollsifre}`;
}

// TODO: Kan byttes ut med vanlig UtkastStatus når godkjent status er fjernet
enum UtkastStatusUtenGodkjent {
	TRENGER_BESLUTTER = 'TRENGER_BESLUTTER',
	KLAR_TIL_BESLUTTER = 'KLAR_TIL_BESLUTTER',
	KLAR_TIL_VEILEDER = 'KLAR_TIL_VEILEDER'
}

export const lagBrukere = (antallBrukere: number): Bruker[] => {
	const brukere: Bruker[] = [];

	let maskerteBrukere = 4;

	for (let i = 0; i < antallBrukere; i++) {
		const randomEnhet = enheter[randBetween(0, enheter.length - 1)];

		const lengde = Math.floor(Math.random() * Object.keys(UtkastStatusUtenGodkjent).length);
		const randomStatus: UtkastStatus =
			UtkastStatus[Object.keys(UtkastStatus)[lengde] as keyof typeof UtkastStatusUtenGodkjent];

		const beslutterNavn =
			randomStatus === UtkastStatus.TRENGER_BESLUTTER
				? null
				: faker.name.firstName() + ' ' + faker.name.lastName();

		const bruker: Bruker = {
			beslutterNavn,
			veilederNavn: faker.name.firstName() + ' ' + faker.name.lastName(),
			brukerFnr: randomFnr(),
			brukerFornavn: faker.name.firstName(),
			brukerEtternavn: faker.name.lastName(),
			vedtakStartet: faker.date.recent(30).toISOString(),
			brukerOppfolgingsenhetId: randomEnhet.enhetId,
			brukerOppfolgingsenhetNavn: randomEnhet.navn,
			status: randomStatus,
			statusEndret: faker.date.recent().toISOString()
		};

		if (maskerteBrukere > 0) {
			bruker.brukerFnr = '';
			bruker.brukerFornavn = '';
			bruker.brukerEtternavn = '';

			maskerteBrukere--;
		}

		brukere.push(bruker);
	}

	return brukere;
};
