import { Alert, Table } from '@navikt/ds-react';
import { OrderByField } from '../../../rest/api';

export const FantIngenBrukereAlertRad = () => {
	return (
		<Table.Row shadeOnHover={false}>
			<Table.DataCell colSpan={Object.values(OrderByField).length} className="fant-ingen-brukere-alert">
				<Alert variant="info">Fant ingen brukere</Alert>
			</Table.DataCell>
		</Table.Row>
	);
};
