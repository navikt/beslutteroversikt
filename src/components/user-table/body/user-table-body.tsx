import React from 'react';
import { UserRow } from './user-table-row';
import { Bruker } from '../../../rest/data/bruker';
import { OrNothing } from '../../../utils/types/ornothing';
import './user-table-body.less';

interface UserTableBodyProps {
	brukere: Bruker[];
	aktivEnhet: OrNothing<string>;
}

export const UserTableBody = (props: UserTableBodyProps) => {
    return (
	    <ul className="user-table-body">
		    {props.brukere.map((bruker, idx) => <UserRow bruker={bruker} aktivEnhet={props.aktivEnhet} key={idx} />)}
	    </ul>
    );
};
