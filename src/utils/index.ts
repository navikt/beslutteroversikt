// tslint:disable-next-line:no-empty
import { BrukerStatus } from '../rest/data/bruker';

export function doNothing() {}

export function isEmpty(str: string): boolean {
	return str ? str.trim().length === 0 : true;
}

export function randBetween(from: number, to: number): number {
	return Math.round(Math.random() * (to - from) + from);
}

export function fjernNavFraEnhetNavn(enhetNavn: string): string {
	return enhetNavn.replace('NAV', '').trim();
}

export function mapBrukerStatusTilTekst(status: BrukerStatus): string {
	switch (status) {
		case BrukerStatus.KLAR_FOR_BESLUTTER:
			return 'Trenger for beslutter';
		case BrukerStatus.HAR_BESLUTTER:
			return 'Har beslutter';
		case BrukerStatus.VENTER_PA_VEILEDER:
			return 'Venter på respons';
		case BrukerStatus.VENTER_PA_BESLUTTER:
			return 'Trenger tilbakemelding';
		case BrukerStatus.KLAR_TIL_UTSENDING:
			return 'Klar for utsendelse';
		default:
			return '';

	}
}
