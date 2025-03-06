import { Alert, SortState, Table } from '@navikt/ds-react';
import { UserTableRow } from './body/user-table-row';
import { useDataFetcherStore } from '../../stores/data-fetcher-store';
import { UserTableHeader } from './header/user-table-header';
import { OrderByDirection, OrderByField } from '../../rest/api';
import { useSokStore } from '../../stores/sok-store';
import { OrNothing } from '../../utils/types/ornothing';
import { hasFinished } from '../../rest/utils';
import Spinner from '../felles/spinner/spinner';
import './user-table.css';

interface ScopedSortState extends SortState {
	orderBy: OrderByField;
}

export const UserTable = () => {
	const { brukereFetcher } = useDataFetcherStore();
	const { orderByField, orderByDirection, setOrderByField, setOrderByDirection } = useSokStore();
	const tableBrukere = (brukereFetcher.data && brukereFetcher.data.brukere) || [];
	const laster = !hasFinished(brukereFetcher);

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
				<Table.Body>
					{laster ? (
						<Table.Row shadeOnHover={false}>
							<Table.DataCell colSpan={Object.values(OrderByField).length} className="laster-tabelldata">
								<Spinner />
							</Table.DataCell>
						</Table.Row>
					) : (
						<>
							{tableBrukere.map((bruker, index) => (
								// Bruker index som key fordi maskerte brukarar har fnr=""
								<UserTableRow bruker={bruker} key={index} />
							))}

							{tableBrukere.length === 0 && (
								<Table.Row shadeOnHover={false}>
									<Table.DataCell
										colSpan={Object.values(OrderByField).length}
										className="fant-ingen-brukere-alert"
									>
										<Alert variant="info">Fant ingen brukere</Alert>
									</Table.DataCell>
								</Table.Row>
							)}
						</>
					)}
				</Table.Body>
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
