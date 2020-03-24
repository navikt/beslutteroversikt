
export enum BrukerStatus {
	VENTER_PA_VEILEDER = 'VENTER_PA_VEILEDER',
	VENTER_PA_BESLUTTER = 'VENTER_PA_BESLUTTER',
	KLAR_TIL_UTSENDING = 'KLAR_TIL_UTSENDING'
}

export interface Bruker {
	fnr: string;
	fornavn: string;
	etternavn: string;
	status: BrukerStatus;
	beslutterNavn: string;
	veilederNavn: string;
	utkastSistEndret: string; // dato

	vedtakStartet: string; // dato
	oppfolgingsenhetId: string;
	oppfolgingsenhetNavn: string;
}