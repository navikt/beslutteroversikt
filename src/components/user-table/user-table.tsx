import { SortState, Table } from '@navikt/ds-react';
import { UserTableHeader } from './header/user-table-header';
import { UserTableBody } from './body/user-table-body';
import { OrderByDirection, OrderByField } from '../../rest/api';
import { useSokStore } from '../../stores/sok-store';
import { OrNothing } from '../../utils/types/ornothing';
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

	const nextDir = (
		nyKey: OrderByField,
		gamalKey: OrNothing<OrderByField>,
		gamalDir: OrNothing<OrderByDirection>
	): OrderByDirection | undefined => {
		if (gamalKey && gamalDir && nyKey === gamalKey) {
			if (gamalDir === OrderByDirection.ASC) {
				return OrderByDirection.DESC;
			}
			if (gamalDir === OrderByDirection.DESC) {
				return undefined;
			}
		}
		return OrderByDirection.ASC;
	};

	const nextOrderByField = (
		nyKey: OrderByField,
		gamalKey: OrNothing<OrderByField>,
		gamalDir: OrNothing<OrderByDirection>
	): OrderByField | undefined => {
		if (nyKey === gamalKey && gamalDir === OrderByDirection.DESC) {
			return undefined;
		}
		return nyKey;
	};

	// Vekslar mellom "valgt kolonne asc", "valgt kolonne desc" og "ingen valgt kolonne" på kvart tredje klikk på same kolonneoverskrift.
	const handleSort = (sortKey: ScopedSortState['orderBy']) => {
		const oldSortKey = orderByField;
		const oldSortDir = orderByDirection;

		setOrderByField(nextOrderByField(sortKey, oldSortKey, oldSortDir));
		setOrderByDirection(nextDir(sortKey, oldSortKey, oldSortDir));
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

type AkselSortDirection = 'ascending' | 'descending' | 'none';

const mapOrderByDirectionToAkselSortDirection = (dir: OrNothing<OrderByDirection>): AkselSortDirection => {
	switch (dir) {
		case OrderByDirection.ASC:
			return 'ascending';
		case OrderByDirection.DESC:
			return 'descending';
		default:
			return 'none';
	}
};
