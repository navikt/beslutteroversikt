import { type RefObject, useState } from 'react';

export function usePrevious<T>(value: T) {
	const [prev, setPrev] = useState<T>(value);
	const [curr, setCurr] = useState<T>(value);

	if (curr !== value) {
		setPrev(curr);
		setCurr(value);
	}

	return prev;
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
