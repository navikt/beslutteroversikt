import type { AktivEnhet } from '../../rest/data/aktiv-enhet';

export const aktivEnhet: AktivEnhet = {
	aktivEnhet: '1234'
};

export const modiaDecorator = {
	saksbehandler: {
		ident: 'Z999999',
		fornavn: 'F_999999',
		etternavn: 'E_999999',
		navn: 'F_999999 E_999999'
	},
	enheter: [
		{
			enhetId: '1234',
			navn: 'Test enhet'
		},
		{
			enhetId: '1111',
			navn: 'Annen test enhet'
		}
	],
	ident: 'Z99999',
	navn: 'F_999999 E_999999',
	fornavn: 'F_999999',
	etternavn: 'E_999999'
};
