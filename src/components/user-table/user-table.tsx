import { SortState, Table } from '@navikt/ds-react';
import { UserTableHeader } from './header/user-table-header';
import { UserTableBody } from './body/user-table-body';
import { OrderByField } from '../../rest/api';
import { useSokStore } from '../../stores/sok-store';
import './user-table.css';
import {
	finnNesteSorteringsretning,
	finnNesteSorteringsverdi,
	mapOrderByDirectionToAkselSortDirection
} from './sortering-utils';

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

	// Vekslar mellom "valgt kolonne asc", "valgt kolonne desc" og "ingen valgt kolonne" på kvart tredje klikk på same kolonneoverskrift.
	const handleSort = (sortKey: ScopedSortState['orderBy']) => {
		const oldSortKey = orderByField;
		const oldSortDir = orderByDirection;

		setOrderByField(finnNesteSorteringsverdi(sortKey, oldSortKey, oldSortDir));
		setOrderByDirection(finnNesteSorteringsretning(sortKey, oldSortKey, oldSortDir));
	};

	return (
		<div className="user-table-container">
			<Table
				aria-label="Brukere som trenger kvalitetssikring"
				sort={sortState}
				onSortChange={sortKey => handleSort(sortKey as OrderByField)}
				className="user-table"
				zebraStripes
			>
				<UserTableHeader />
				<UserTableBody />
			</Table>
		</div>
	);
};
