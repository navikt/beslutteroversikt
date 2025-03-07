import { Table } from '@navikt/ds-react';
import { OrderByField } from '../../../rest/api';

export const UserTableHeader = () => {
	return (
		<Table.Header>
			<Table.Row>
				<Table.ColumnHeader sortKey={OrderByField.BRUKER_ETTERNAVN} sortable>
					Etternavn, Fornavn
				</Table.ColumnHeader>
				<Table.ColumnHeader sortKey={OrderByField.BRUKER_FNR} sortable>
					Fødselsnummer
				</Table.ColumnHeader>
				<Table.ColumnHeader sortKey={OrderByField.VEDTAK_STARTET} sortable>
					Utkast opprettet
				</Table.ColumnHeader>
				<Table.ColumnHeader sortKey={OrderByField.STATUS} sortable>
					Status
				</Table.ColumnHeader>
				<Table.ColumnHeader sortKey={OrderByField.STATUS_ENDRET} sortable>
					Status endret
				</Table.ColumnHeader>
				<Table.ColumnHeader sortKey={OrderByField.BESLUTTER_NAVN} sortable>
					Kvalitetssikrer
				</Table.ColumnHeader>
				<Table.ColumnHeader sortKey={OrderByField.VEILEDER_NAVN} sortable>
					Veileder
				</Table.ColumnHeader>
				<Table.ColumnHeader sortKey={OrderByField.BRUKER_OPPFOLGINGSENHET_NAVN} sortable>
					Enhet
				</Table.ColumnHeader>
			</Table.Row>
		</Table.Header>
	);
};
