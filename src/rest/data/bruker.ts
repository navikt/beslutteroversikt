
export enum UtkastStatus {
	TRENGER_BESLUTTER = 'TRENGER_BESLUTTER',
	KLAR_TIL_BESLUTTER = 'KLAR_TIL_BESLUTTER',
	KLAR_TIL_VEILEDER = 'KLAR_TIL_VEILEDER',
	GODKJENT_AV_BESLUTTER = 'GODKJENT_AV_BESLUTTER'
}

export interface BrukereMedAntall {
	brukere: Bruker[];
	totaltAntall: number;
}

export interface Bruker {
	brukerFnr: string;
	brukerFornavn: string;
	brukerEtternavn: string;
	brukerOppfolgingsenhetId: string;
	brukerOppfolgingsenhetNavn: string;

	status: UtkastStatus;
	beslutterNavn: string | null;
	veilederNavn: string;

	statusEndret: string; // dato
	vedtakStartet: string; // dato
}
