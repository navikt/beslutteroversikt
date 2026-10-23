export interface Enhet {
	enhetId: string;
	enhetNavn: string;
}

export interface InnloggetVeileder {
	fornavn: string;
	etternavn: string;
	navn: string;
	ident: string;
	enheter: Enhet[];
}
