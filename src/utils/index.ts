// tslint:disable-next-line:no-empty
import { UtkastStatus } from '../rest/data/bruker';

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

export function mapBrukerStatusTilTekst(status: UtkastStatus): string {
	switch (status) {
		case UtkastStatus.KLAR_FOR_BESLUTTER:
			return 'Trenger beslutter';
		case UtkastStatus.HAR_BESLUTTER:
			return 'Har beslutter';
		case UtkastStatus.VENTER_PA_VEILEDER:
			return 'Venter på respons';
		case UtkastStatus.VENTER_PA_BESLUTTER:
			return 'Trenger tilbakemelding';
		case UtkastStatus.KLAR_TIL_UTSENDING:
			return 'Klar for utsendelse';
		default:
			return '';

	}
}
