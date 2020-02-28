import React from 'react';
import { Bruker } from '../../rest/data/bruker';
import { formatDateStr, formatDateTime } from '../../utils/date-utils';

export const UserRow = (props: {bruker: Bruker}) => {
	const {
		fnr, fornavn, etternavn, utkastSistEndret,
		oppfolgingsenhetNavn, oppfolgingStartet,
		beslutterNavn, status
	} = props.bruker;

    return (
    	<tr className="user-table__row">
		    <td>{fnr}</td>
		    <td>{fornavn + ' ' + etternavn}</td>
		    <td>{formatDateStr(oppfolgingStartet)}</td>
		    <td>{oppfolgingsenhetNavn}</td>
		    <td>{beslutterNavn}</td>
		    <td>{status}</td>
		    <td>{formatDateTime(utkastSistEndret)}</td>
	    </tr>
    );
};
