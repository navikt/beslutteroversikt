import { useState } from 'react';
import { SortState, Table } from '@navikt/ds-react';
import { UserTableRowAksel } from './body/user-table-row-aksel';
import { useDataFetcherStore } from '../../../stores/data-fetcher-store';
import { UserTableHeaderAksel } from './header/user-table-header-aksel';
import {
	AkselSortDirection,
	mapAkselSortDirectionToOrderByDirection,
	mapOrderByDirectionToAkselSortDirection,
	OrderByField
} from '../../../rest/api';
import { useSokStore } from '../../../stores/sok-store';
import './user-table-aksel.css';

interface ScopedSortState extends SortState {
	orderBy: OrderByField;
}

export const UserTableAksel = () => {
	const { brukereFetcher } = useDataFetcherStore();
	const { orderByField, orderByDirection, setOrderByField, setOrderByDirection } = useSokStore();
	const tableBrukere = (brukereFetcher.data && brukereFetcher.data.brukere) || [];
	const [sort, setSort] = useState<ScopedSortState | undefined>();

	const sortFraState: ScopedSortState = {
		orderBy: orderByField ?? OrderByField.TEST,
		direction: mapOrderByDirectionToAkselSortDirection(orderByDirection)
	};

	const sykleOrderBy = (nyKey: OrderByField, gamalKey: OrderByField, gamalDir: AkselSortDirection) => {
		return nyKey === gamalKey && gamalDir === 'descending';
	};
	const sykleDir = (nyKey: OrderByField, gamalKey: OrderByField, gamalDir: AkselSortDirection) => {
		return nyKey === gamalKey && gamalDir === 'ascending';
	};

	// Syklar gjennom "valgt kolonne asc, desc og ingen valgt kolonne" på kvart tredje klikk på same ting.
	const handleSort = (sortKey: ScopedSortState['orderBy']) => {
		setSort(
			sort && sykleOrderBy(sortKey, sort.orderBy, sort.direction)
				? undefined
				: {
						orderBy: sortKey,
						direction: sort && sykleDir(sortKey, sort.orderBy, sort.direction) ? 'descending' : 'ascending'
					}
		);
		setOrderByField(sort?.orderBy);
		setOrderByDirection(mapAkselSortDirectionToOrderByDirection(sort?.direction ?? 'none'));
	};

	return (
		<>
			<p>
				Sort:
				<br />
				orderBy: {sort?.orderBy ?? 'undefined/null'}
				<br />
				direction: {sort?.direction ?? 'undefined/null'}
				<br />
				<br />
				SortState:
				<br />
				orderByField: {orderByField ?? 'undefined/null'}
				<br />
				orderByDirection: {orderByDirection ?? 'undefined/null'}
			</p>
			<Table
				title="Brukere som trenger kvalitetssikring"
				sort={sortFraState}
				onSortChange={sortKey => handleSort(sortKey as ScopedSortState['orderBy'])}
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
			</Table>
		</>
	);
};
