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
		<div role="rowgroup" className="user-table-body">
			{props.brukere.map((bruker, idx) => (
				<UserRow idx={idx} bruker={bruker} aktivEnhet={props.aktivEnhet} key={idx} />
			))}
		</div>
	);
};
