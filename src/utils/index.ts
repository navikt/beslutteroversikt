import { type RefObject, useEffect, useRef } from 'react';

export function usePrevious<T>(value: T) {
	const ref = useRef<T>(value);

	// Store current value in ref
	useEffect(() => {
		ref.current = value;
	}, [value]);

	return ref.current;
}

export function isEmpty(str: string): boolean {
	return str ? str.trim().length === 0 : true;
}

export function randBetween(from: number, to: number): number {
	return Math.round(Math.random() * (to - from) + from);
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

export const vedKlikkUtenfor = (refs: Array<RefObject<Element | null>>, klikkTarget: Node | null, fn: () => void) => {
	if (!refs.some(ref => ref.current?.contains(klikkTarget))) {
		fn();
	}
};
