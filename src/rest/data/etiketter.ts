export interface Etiketter {
	erDoed: boolean;
	egenAnsatt: boolean;
	diskresjonskodeFortrolig: string | null;
	kandidatForUtmelding: boolean;
}

export interface EtiketterForBruker {
	fnr: string;
	etiketter: Etiketter;
}
