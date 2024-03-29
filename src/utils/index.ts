// tslint:disable-next-line:no-empty
import { UtkastStatus } from '../rest/data/bruker';
import { useEffect, useRef } from 'react';
import { type RefObject } from 'react';

export function usePrevious<T>(value: T) {
	const ref = useRef<T>(value);

	// Store current value in ref
	useEffect(() => {
		ref.current = value;
	}, [value]);

	return ref.current;
}

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

export function capitalize(str: string) {
	return str
		.toLowerCase()
		.replace(/(^|[^a-z\u00C0-\u017F\u0400-\u04FF'])([a-z\u00C0-\u017F\u0400-\u04FF])/g, s => s.toUpperCase());
}

export function lagBrukerNavn(fornavn: string, etternavn: string): string {
	const manglerFornavn = fornavn === '';
	const manglerEtternavn = etternavn === '';

	if (manglerFornavn && manglerEtternavn) {
		return '';
	} else if (manglerFornavn || manglerEtternavn) {
		// Skal egentlig ikke skje, men hvis ett av navnene mangler så trenger vi ikke å separere med ","
		return fornavn + etternavn;
	}

	return fornavn + ', ' + etternavn;
}

export function mapBrukerStatusTilTekst(status: UtkastStatus): string {
	switch (status) {
		case UtkastStatus.TRENGER_BESLUTTER:
			return 'Trenger kvalitetssikring';
		case UtkastStatus.KLAR_TIL_VEILEDER:
			return 'Venter på veileder';
		case UtkastStatus.KLAR_TIL_BESLUTTER:
			return 'Venter på tilbakemelding';
		case UtkastStatus.GODKJENT_AV_BESLUTTER:
			return 'Klar til utsendelse';
		default:
			return '';
	}
}

export const vedKlikkUtenfor = (refs: RefObject<HTMLElement>[], klikkTarget: Node | null, fn: () => void) => {
	if (!refs.some(ref => ref.current?.contains(klikkTarget))) {
		fn();
	}
};
