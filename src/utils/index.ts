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
		case UtkastStatus.TRENGER_BESLUTTER:
			return 'Trenger beslutter';
		case UtkastStatus.KLAR_TIL_VEILEDER:
			return 'Venter på veileder';
		case UtkastStatus.KLAR_TIL_BESLUTTER:
			return 'Trenger tilbakemelding';
		case UtkastStatus.GODKJENT_AV_BESLUTTER:
			return 'Klar for utsendelse';
		default:
			return '';

	}
}
