import React from 'react';
import { Bruker } from '../../rest/data/bruker';
import { UserRow } from './user-table-row';
import { UserTableHeader } from './user-table-header';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import './user-table.less';

export const UserTable = (props: { brukere: Bruker[] }) => {
	const { brukere } = props;

	if (brukere.length === 0) {
		return (
			<AlertStripeInfo>
                Fant ingen brukere
			</AlertStripeInfo>
		);
	}

    return (
    	<table className="user-table">
		    <thead>
		        <UserTableHeader />
		    </thead>
		    <tbody>
		        {props.brukere.map((bruker, idx) => <UserRow bruker={bruker} key={idx} />)}
		    </tbody>
	    </table>
    );
};
