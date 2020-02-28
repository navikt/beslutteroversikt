import React from 'react';
import { Bruker } from '../../rest/data/bruker';
import { UserRow } from './user-table-row';
import { UserTableHeader } from './user-table-header';
import './user-table.less';

export const UserTable = (props: { brukere: Bruker[] }) => {
    return (
    	<table>
		    <UserTableHeader />
		    {props.brukere.map((bruker, idx) => <UserRow bruker={bruker} key={idx} />)}
	    </table>
    );
};
