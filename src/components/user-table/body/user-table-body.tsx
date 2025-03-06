import { Alert, Table } from '@navikt/ds-react';
import { OrderByField } from '../../../rest/api';
import { UserTableRow } from './user-table-row';
import { useDataFetcherStore } from '../../../stores/data-fetcher-store';
import { hasFinished } from '../../../rest/utils';
import Spinner from '../../felles/spinner/spinner';
import './user-table-body.css';

export const UserTableBody = () => {
	const { brukereFetcher } = useDataFetcherStore();
	const brukere = (brukereFetcher.data && brukereFetcher.data.brukere) || [];
	const laster = !hasFinished(brukereFetcher);

	return (
		<Table.Body className="user-table-body">
			{laster ? (
				<Table.Row shadeOnHover={false}>
					<Table.DataCell colSpan={Object.values(OrderByField).length} className="laster-tabelldata">
						<Spinner />
					</Table.DataCell>
				</Table.Row>
			) : (
				<>
					{brukere.map((bruker, index) => (
						// Bruker index som key fordi maskerte brukarar har fnr=""
						<UserTableRow bruker={bruker} key={index} />
					))}

					{brukere.length === 0 && (
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
	);
};
