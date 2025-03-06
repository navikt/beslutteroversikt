import { SortState, Table } from '@navikt/ds-react';
import { UserTableHeader } from './header/user-table-header';
import { UserTableBody } from './body/user-table-body';
import { OrderByField } from '../../rest/api';
import { useSokStore } from '../../stores/sok-store';
import {
	finnNesteSorteringsretning,
	finnNesteSorteringsfelt,
	mapOrderByDirectionToAkselSortDirection
} from './sortering-utils';
import './user-table.css';

interface ScopedSortState extends SortState {
	orderBy: OrderByField;
}

export const UserTable = () => {
	const { orderByField, orderByDirection, setOrderByField, setOrderByDirection } = useSokStore();

	const sortState: ScopedSortState | undefined = orderByField
		? {
				orderBy: orderByField,
				direction: mapOrderByDirectionToAkselSortDirection(orderByDirection)
			}
		: undefined;

	/**
	 * Vekslar mellom "valgt kolonne asc", "valgt kolonne desc" og "ingen valgt kolonne" på kvart tredje klikk på same kolonneoverskrift.
	 */
	const handleSortering = (sorteringsfelt: ScopedSortState['orderBy']) => {
		const gammeltSorteringsfelt = orderByField;
		const gammelSorteringsretning = orderByDirection;

		setOrderByField(finnNesteSorteringsfelt(sorteringsfelt, gammeltSorteringsfelt, gammelSorteringsretning));
		setOrderByDirection(finnNesteSorteringsretning(sorteringsfelt, gammeltSorteringsfelt, gammelSorteringsretning));
	};

	return (
		<div className="user-table-container">
			<Table
				aria-label="Brukere som trenger kvalitetssikring"
				sort={sortState}
				onSortChange={sortKey => handleSortering(sortKey as OrderByField)}
				className="user-table"
				zebraStripes
			>
				<UserTableHeader />
				<UserTableBody />
			</Table>
		</div>
	);
};
