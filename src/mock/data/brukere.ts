import faker from 'faker';
import { Bruker, BrukerStatus } from '../../rest/data/bruker';
import { enheter } from './enheter';

export const lagBrukere = (antallBrukere: number): Bruker[] => {
	const brukere: Bruker[] = [];

	for (let i = 0; i < antallBrukere; i++) {
		const randomEnhet = faker.random.arrayElement(enheter);

		const bruker: Bruker = {
			beslutterNavn: faker.name.firstName() + ' ' + faker.name.lastName(),
			fnr: faker.random.number(1231999999999).toString(),
			fornavn: faker.name.firstName(),
			etternavn: faker.name.lastName(),
			oppfolgingStartet: faker.date.recent().toISOString(),
			oppfolgingsenhetId: randomEnhet.enhetId,
			oppfolgingsenhetNavn: randomEnhet.navn,
			status: BrukerStatus.KLAR_TIL_UTSENDING,
			utkastSistEndret: faker.date.recent().toISOString()
		};

		brukere.push(bruker);
	}

	return brukere;
};