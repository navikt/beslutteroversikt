import React from 'react';
import { Bruker } from '../../../rest/data/bruker';
import { formatDateStr, tidSiden } from '../../../utils/date-utils';
import { Normaltekst, Element } from 'nav-frontend-typografi';
import { fjernNavFraEnhetNavn } from '../../../utils';

export const UserRow = (props: {bruker: Bruker}) => {
	const {
		fnr, fornavn, etternavn, utkastSistEndret,
		oppfolgingsenhetNavn, vedtakStartet,
		beslutterNavn, veilederNavn, status
	} = props.bruker;

    return (
    	<li className="user-table-row">
		    <Normaltekst>{etternavn + ', ' + fornavn}</Normaltekst>
		    <Element>{fnr}</Element>
		    <Normaltekst>{formatDateStr(vedtakStartet)}</Normaltekst>
		    <Normaltekst>{status}</Normaltekst>
		    <Element>{beslutterNavn}</Element>
		    <Normaltekst>{veilederNavn}</Normaltekst>
		    <Normaltekst>{fjernNavFraEnhetNavn(oppfolgingsenhetNavn)}</Normaltekst>
		    <Normaltekst>{tidSiden(utkastSistEndret)}</Normaltekst>
	    </li>
    );
};
