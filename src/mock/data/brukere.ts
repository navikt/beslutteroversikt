import faker from 'faker';
import { Bruker, BrukerStatus } from '../../rest/data/bruker';
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

export const lagBrukere = (antallBrukere: number): Bruker[] => {
	const brukere: Bruker[] = [];

	for (let i = 0; i < antallBrukere; i++) {
		const randomEnhet = faker.random.arrayElement(enheter);
		const bruker: Bruker = {
			beslutterNavn: faker.name.firstName() + ' ' + faker.name.lastName(),
			fnr: randomFnr(),
			fornavn: faker.name.firstName(),
			etternavn: faker.name.lastName(),
			oppfolgingStartet: faker.date.recent(30).toISOString(),
			oppfolgingsenhetId: randomEnhet.enhetId,
			oppfolgingsenhetNavn: randomEnhet.navn,
			status: faker.random.objectElement(BrukerStatus) as BrukerStatus,
			utkastSistEndret: faker.date.recent().toISOString()
		};

		brukere.push(bruker);
	}

	return brukere;
};