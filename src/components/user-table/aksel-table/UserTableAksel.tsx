import { Table } from '@navikt/ds-react';
import { UserTableRowAksel } from './body/UserTableRowAksel';
import { useDataFetcherStore } from '../../../stores/data-fetcher-store';
import { UserTableHeaderAksel } from './header/user-table-header-aksel';
import './user-table-aksel.css';

export const UserTableAksel = () => {
	const { brukereFetcher } = useDataFetcherStore();
	const tableBrukere = (brukereFetcher.data && brukereFetcher.data.brukere) || [];

	return (
		<Table title="Brukere som trenger kvalitetssikring" className="user-table-aksel" zebraStripes>
			<UserTableHeaderAksel />
			<Table.Body>
				{tableBrukere.map((bruker, index) => (
					// Bruker index som key fordi maskerte brukarar har fnr=""
					<UserTableRowAksel bruker={bruker} key={index} />
				))}
			</Table.Body>
		</Table>
	);
};
