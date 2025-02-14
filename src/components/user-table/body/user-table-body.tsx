import { UserRow } from './user-table-row';
import { Bruker } from '../../../rest/data/bruker';
import './user-table-body.less';

interface UserTableBodyProps {
	brukere: Bruker[];
}

export const UserTableBody = ({ brukere }: UserTableBodyProps) => {
	return (
		<div role="rowgroup" className="user-table-body">
			{brukere.map((bruker, idx) => (
				<UserRow idx={idx} bruker={bruker} key={bruker.brukerFnr} />
			))}
		</div>
	);
};
