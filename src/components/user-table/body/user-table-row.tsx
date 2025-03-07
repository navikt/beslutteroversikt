import { CopyButton, Table, Tooltip } from '@navikt/ds-react';
import { Bruker } from '../../../rest/data/bruker';
import { capitalize, fjernNavFraEnhetNavn, lagBrukerNavn } from '../../../utils';
import { formatDateStr, formatDateStrWithMonthName, formatTimeStr } from '../../../utils/date-utils';
import { UtkastStatusData } from './utkast-status-data';
import { BrukerDirektelenkeMedFeilmelding } from './bruker-direktelenke-med-feilmelding';
import './user-table-row.css';

interface Props {
	bruker: Bruker;
}

export const UserTableRow = ({ bruker }: Props) => {
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
		<Table.Row shadeOnHover={false} className="user-table-row">
			<Table.HeaderCell className="celle-med-knapp">
				{!erMaskert && (
					<BrukerDirektelenkeMedFeilmelding
						fnr={brukerFnr}
						knappTekst={`${capitalize(lagBrukerNavn(brukerEtternavn, brukerFornavn))}`}
					/>
				)}
			</Table.HeaderCell>
			<Table.DataCell className="celle-med-knapp">
				{brukerFnr && (
					<Tooltip content="Kopier fødselsnummer" placement="right">
						<CopyButton size="small" iconPosition="right" copyText={brukerFnr} text={brukerFnr} />
					</Tooltip>
				)}
			</Table.DataCell>
			<Table.DataCell className="celle-med-tekst">{formatDateStr(vedtakStartet)}</Table.DataCell>
			<Table.DataCell className="utkast-status-celle">
				<UtkastStatusData status={status} />
			</Table.DataCell>
			<Table.DataCell className="celle-med-tekst">
				<span>{formatDateStrWithMonthName(statusEndret)}</span>&nbsp;
				<span>{formatTimeStr(statusEndret)}</span>
			</Table.DataCell>
			<Table.DataCell className="celle-med-tekst">{beslutterNavn ?? '-'}</Table.DataCell>
			<Table.DataCell className="celle-med-tekst">{veilederNavn}</Table.DataCell>
			<Table.DataCell className="celle-med-tekst">
				{fjernNavFraEnhetNavn(brukerOppfolgingsenhetNavn)}
			</Table.DataCell>
		</Table.Row>
	);
};
