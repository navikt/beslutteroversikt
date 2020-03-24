import React from 'react';
import { Bruker } from '../../../rest/data/bruker';
import { formatDateTime, dagerSiden } from '../../../utils/date-utils';
import { Normaltekst } from 'nav-frontend-typografi';

export const UserRow = (props: {bruker: Bruker}) => {
	const {
		fnr, fornavn, etternavn, utkastSistEndret,
		oppfolgingsenhetNavn, oppfolgingStartet,
		beslutterNavn, status
	} = props.bruker;

    return (
    	<li className="user-table-row">
		    <Normaltekst>{etternavn + ', ' + fornavn}</Normaltekst>
		    <Normaltekst>{fnr}</Normaltekst>
		    <Normaltekst>{dagerSiden(oppfolgingStartet)}</Normaltekst>
		    <Normaltekst>{oppfolgingsenhetNavn}</Normaltekst>
		    <Normaltekst>{beslutterNavn}</Normaltekst>
		    <Normaltekst>{status}</Normaltekst>
		    <Normaltekst>{formatDateTime(utkastSistEndret)}</Normaltekst>
	    </li>
    );
};
