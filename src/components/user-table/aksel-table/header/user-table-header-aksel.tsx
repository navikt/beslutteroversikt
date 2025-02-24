import { Table } from '@navikt/ds-react';

export const UserTableHeaderAksel = () => {
	return (
		<Table.Header>
			<Table.Row>
				<Table.HeaderCell>Etternavn, Fornavn</Table.HeaderCell>
				<Table.HeaderCell>Fødselsnummer</Table.HeaderCell>
				<Table.HeaderCell>Utkast opprettet</Table.HeaderCell>
				<Table.HeaderCell>Status</Table.HeaderCell>
				<Table.HeaderCell>Kvalitetssikrer</Table.HeaderCell>
				<Table.HeaderCell>Veileder</Table.HeaderCell>
				<Table.HeaderCell>Status endret</Table.HeaderCell>
				<Table.HeaderCell>Enhet</Table.HeaderCell>
			</Table.Row>
		</Table.Header>
	);
};
