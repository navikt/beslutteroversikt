import { Alert, SortState, Table } from '@navikt/ds-react';
import { UserTableRowAksel } from './body/user-table-row-aksel';
import { useDataFetcherStore } from '../../../stores/data-fetcher-store';
import { UserTableHeaderAksel } from './header/user-table-header-aksel';
import { mapOrderByDirectionToAkselSortDirection, OrderByDirection, OrderByField } from '../../../rest/api';
import { useSokStore } from '../../../stores/sok-store';
import { OrNothing } from '../../../utils/types/ornothing';
import './user-table-aksel.css';

interface ScopedSortState extends SortState {
	orderBy: OrderByField;
}

export const UserTableAksel = () => {
	const { brukereFetcher } = useDataFetcherStore();
	const { orderByField, orderByDirection, setOrderByField, setOrderByDirection } = useSokStore();
	const tableBrukere = (brukereFetcher.data && brukereFetcher.data.brukere) || [];

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
		<>
			<p>
				<br />
				SortState:
				<br />
				orderByField: {orderByField ?? 'undefined/null'}
				<br />
				orderByDirection: {orderByDirection ?? 'undefined/null'}
			</p>
			<Table
				title="Brukere som trenger kvalitetssikring"
				sort={sortState}
				onSortChange={sortKey => handleSort(sortKey as OrderByField)}
				className="user-table-aksel"
				zebraStripes
			>
				<UserTableHeaderAksel />
				<Table.Body>
					{tableBrukere.map((bruker, index) => (
						// Bruker index som key fordi maskerte brukarar har fnr=""
						<UserTableRowAksel bruker={bruker} key={index} />
					))}
				</Table.Body>
				{tableBrukere.length === 0 && (
					<Table.Row>
						<Table.DataCell
							colSpan={Object.values(OrderByField).length}
							className="fant-ingen-brukere-alert"
						>
							<Alert variant="info">Fant ingen brukere</Alert>
						</Table.DataCell>
					</Table.Row>
				)}
			</Table>
		</>
	);
};
