import React from 'react';
import { Bruker } from '../../rest/data/bruker';
import { UserRow } from './user-table-row';
import { UserTableHeader } from './user-table-header';
import './user-table.less';
import { Systemtittel } from 'nav-frontend-typografi';

export const UserTable = (props: { brukere: Bruker[] }) => {
	const { brukere } = props;

	if (brukere.length === 0) {
		return (
			<div>
				<Systemtittel>Fant ingen brukere</Systemtittel>
			</div>
		);
	}

    return (
    	<table>
		    <thead>
		        <UserTableHeader />
		    </thead>
		    <tbody>
		        {props.brukere.map((bruker, idx) => <UserRow bruker={bruker} key={idx} />)}
		    </tbody>
	    </table>
    );
};
