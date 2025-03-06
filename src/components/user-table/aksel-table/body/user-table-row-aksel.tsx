import { CopyButton, Table, Tooltip } from '@navikt/ds-react';
import { Bruker } from '../../../../rest/data/bruker';
import { capitalize, fjernNavFraEnhetNavn, lagBrukerNavn } from '../../../../utils';
import { formatDateStr, formatDateStrWithMonthName, formatTimeStr } from '../../../../utils/date-utils';
import { UtkastStatusData } from '../../body/status/utkast-status-data';
import { BrukerDirektelenkeMedFeilmelding } from '../../bruker-direktelenke-med-feilmelding';
import './user-table-row-aksel.css';

interface Props {
	bruker: Bruker;
}

export const UserTableRowAksel = ({ bruker }: Props) => {
	const {
		brukerFnr,
		brukerFornavn,
		brukerEtternavn,
		statusEndret,
		brukerOppfolgingsenhetNavn,
		vedtakStartet,
		beslutterNavn,
		veilederNavn,
		status
	} = bruker;

	const erMaskert = brukerFnr === '';

	return (
		<Table.Row shadeOnHover={false}>
			<Table.HeaderCell>
				{!erMaskert && (
					<BrukerDirektelenkeMedFeilmelding
						fnr={brukerFnr}
						knappTekst={`${capitalize(lagBrukerNavn(brukerEtternavn, brukerFornavn))}`}
					/>
				)}
			</Table.HeaderCell>
			<Table.DataCell>
				{brukerFnr && (
					<Tooltip content="Kopier fødselsnummer" placement="right">
						<CopyButton
							size="small"
							iconPosition="right"
							copyText={brukerFnr}
							text={brukerFnr}
							className="user-table-row__innhold--knapp"
						/>
					</Tooltip>
				)}
			</Table.DataCell>
			<Table.DataCell>{formatDateStr(vedtakStartet)}</Table.DataCell>
			<Table.DataCell className="utkast-status">
				<UtkastStatusData status={status} />
			</Table.DataCell>
			<Table.DataCell>{beslutterNavn ?? '-'}</Table.DataCell>
			<Table.DataCell>{veilederNavn}</Table.DataCell>
			<Table.DataCell>
				<span>{formatDateStrWithMonthName(statusEndret)}</span>&nbsp;
				<span>{formatTimeStr(statusEndret)}</span>
			</Table.DataCell>
			<Table.DataCell>{fjernNavFraEnhetNavn(brukerOppfolgingsenhetNavn)}</Table.DataCell>
		</Table.Row>
	);
};
