import faker from 'faker';
import { Bruker, UtkastStatus } from '../../rest/data/bruker';
import { enheter } from './enheter';
import { randBetween } from '../../utils';

function randomFnr(): string {
	const dag = randBetween(1, 31);
	const mnd = randBetween(1, 12);
	const ar = randBetween(0, 99);
	const arhundre = randBetween(0, 99).toString().padStart(2, '0');
	const kjonnsiffer = faker.random.boolean() ? 4 : 1;
	const individsifre = `${arhundre}${kjonnsiffer}`;
	const kontrollsifre = `${randBetween(0, 9)}${randBetween(0, 9)}`;

	return `${dag.toString().padStart(2, '0')}${mnd.toString().padStart(2, '0')}${ar.toString().padStart(2, '0')}${individsifre}${kontrollsifre}`;
}

function tEllerNull<T>(t: T): T | null {
	if (randBetween(1, 5) === 1) return null;
	else return t;
}

export const lagBrukere = (antallBrukere: number): Bruker[] => {
	const brukere: Bruker[] = [];

	for (let i = 0; i < antallBrukere; i++) {
		const randomEnhet = faker.random.arrayElement(enheter);
		const beslutterNavn = tEllerNull(faker.name.firstName() + ' ' + faker.name.lastName());
		const bruker: Bruker = {
			beslutterNavn: tEllerNull(faker.name.firstName() + ' ' + faker.name.lastName()),
			veilederNavn: faker.name.firstName() + ' ' + faker.name.lastName(),
			brukerFnr: randomFnr(),
			brukerFornavn: faker.name.firstName(),
			brukerEtternavn: faker.name.lastName(),
			vedtakStartet: faker.date.recent(30).toISOString(),
			brukerOppfolgingsenhetId: randomEnhet.enhetId,
			brukerOppfolgingsenhetNavn: randomEnhet.navn,
			status: !beslutterNavn ? UtkastStatus.TRENGER_BESLUTTER : faker.random.objectElement(UtkastStatus) as UtkastStatus,
			statusEndret: faker.date.recent().toISOString()
		};

		brukere.push(bruker);
	}

	return brukere;
};
