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
				<Table.ColumnHeader
					sortKey={OrderByField.VEDTAK_STARTET}
					sortable
					title="Dato da veileder opprettet utkast til vedtak"
				>
					Utkast opprettet
				</Table.ColumnHeader>
				<Table.ColumnHeader
					sortKey={OrderByField.STATUS}
					sortable
					title="Status for kvalitetssikring av utkastet til vedtak"
				>
					Status
				</Table.ColumnHeader>
				<Table.ColumnHeader
					sortKey={OrderByField.STATUS_ENDRET}
					sortable
					title="Dato da status for kvalitetssikringen sist ble endret"
				>
					Status endret
				</Table.ColumnHeader>
				<Table.ColumnHeader
					sortKey={OrderByField.BESLUTTER_NAVN}
					sortable
					title="Kvalitetssikreren for utkastet til vedtak"
				>
					Kvalitetssikrer
				</Table.ColumnHeader>
				<Table.ColumnHeader
					sortKey={OrderByField.VEILEDER_NAVN}
					sortable
					title="Veilederen som er ansvarlig for vedtaket"
				>
					Veileder
				</Table.ColumnHeader>
				<Table.ColumnHeader
					sortKey={OrderByField.BRUKER_OPPFOLGINGSENHET_NAVN}
					sortable
					title="Enheten der brukeren følges opp"
				>
					Enhet
				</Table.ColumnHeader>
			</Table.Row>
		</Table.Header>
	);
};
