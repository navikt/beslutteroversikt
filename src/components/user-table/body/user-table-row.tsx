import { Bleed, BodyShort, CopyButton, Tooltip } from '@navikt/ds-react';
import { Bruker } from '../../../rest/data/bruker';
import { formatDateStr, formatDateStrWithMonthName, formatTimeStr } from '../../../utils/date-utils';
import { capitalize, fjernNavFraEnhetNavn, lagBrukerNavn } from '../../../utils';
import { BrukerDirektelenkeMedFeilmelding } from '../bruker-direktelenke-med-feilmelding';
import { UtkastStatusData } from './status/utkast-status-data';
import './user-table-body.less';

interface Props {
	idx: number;
	bruker: Bruker;
}

export const UserRow = ({ idx, bruker }: Props) => {
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
		// idx starter på 0, men gyldige verdier for aria-rowindex er 1 og oppover
		<div role="row" aria-rowindex={idx + 1} className="user-table-row">
			<div className="user-table-row__innhold">
				<Bleed marginBlock="2" marginInline="3" style={{ display: 'flex' }}>
					{!erMaskert && (
						<BrukerDirektelenkeMedFeilmelding
							fnr={brukerFnr}
							knappTekst={`${capitalize(lagBrukerNavn(brukerEtternavn, brukerFornavn))}`}
						/>
					)}
				</Bleed>
				<Bleed marginBlock="2" marginInline="3" style={{ display: 'flex' }}>
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
				</Bleed>
				<BodyShort size="small">{formatDateStr(vedtakStartet)}</BodyShort>
				<UtkastStatusData status={status} />
				<BodyShort size="small">{beslutterNavn ?? '–'}</BodyShort>
				<BodyShort size="small">{veilederNavn}</BodyShort>
				<BodyShort size="small" className="user-table-row__innhold--dato">
					<span>{formatDateStrWithMonthName(statusEndret)}</span>&nbsp;
					<span>{formatTimeStr(statusEndret)}</span>
				</BodyShort>
				<BodyShort size="small">{fjernNavFraEnhetNavn(brukerOppfolgingsenhetNavn)}</BodyShort>
			</div>
		</div>
	);
};
