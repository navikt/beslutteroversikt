import { Bleed, BodyShort, CopyButton, Tooltip } from '@navikt/ds-react';
import { ChatElipsisIcon, ChatExclamationmarkIcon, PersonPlusIcon } from '@navikt/aksel-icons';
import { Bruker, UtkastStatus } from '../../../rest/data/bruker';
import { formatDateStr, formatDateStrWithMonthName, formatTimeStr } from '../../../utils/date-utils';
import { capitalize, fjernNavFraEnhetNavn, lagBrukerNavn, mapBrukerStatusTilTekst } from '../../../utils';
import { BrukerDirektelenkeMedFeilmelding } from '../bruker-direktelenke-med-feilmelding';
import './user-table-body.less';

interface UserRowProps {
	idx: number;
	bruker: Bruker;
}

export const UserRow = ({ idx, bruker }: UserRowProps) => {
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
				<Bleed marginBlock="2" style={{ display: 'flex' }}>
					{!erMaskert && (
						<BrukerDirektelenkeMedFeilmelding
							fnr={brukerFnr}
							knappTekst={`${capitalize(lagBrukerNavn(brukerEtternavn, brukerFornavn))}`}
						/>
					)}
				</Bleed>
				<BodyShort size="small">
					{brukerFnr && (
						<Tooltip content="Kopier fødselsnr" placement="right">
							<CopyButton copyText={brukerFnr} text={brukerFnr} size="xsmall" iconPosition="right" />
						</Tooltip>
					)}
				</BodyShort>
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

interface UtkastStatusDataProps {
	status: UtkastStatus;
}

const UtkastStatusData = ({ status }: UtkastStatusDataProps) => {
	let StatusIkon;
	switch (status) {
		case UtkastStatus.TRENGER_BESLUTTER:
			StatusIkon = (
				<Bleed marginBlock="1 2" asChild>
					<PersonPlusIcon title="Trenger kvalitetssikrer-ikon" className="status_ikon" />
				</Bleed>
			);
			break;
		case UtkastStatus.KLAR_TIL_BESLUTTER:
			StatusIkon = (
				<Bleed marginBlock="0 3" asChild>
					<ChatExclamationmarkIcon title="Venter på tilbakemelding-ikon" className="status_ikon" />
				</Bleed>
			);
			break;
		case UtkastStatus.KLAR_TIL_VEILEDER:
			StatusIkon = (
				<Bleed marginBlock="0 3" asChild>
					<ChatElipsisIcon title="Venter på veileder-ikon" className="status_ikon" />
				</Bleed>
			);
			break;
		case UtkastStatus.GODKJENT_AV_BESLUTTER:
			StatusIkon = (
				<Bleed marginBlock="0 3" asChild>
					<ChatElipsisIcon title="Godkjent av kvalitetssikrer-ikon" className="status_ikon" />
				</Bleed>
			);
			break;
	}

	return (
		<span role="cell" className={'status'}>
			{StatusIkon}
			<BodyShort size="small">{mapBrukerStatusTilTekst(status)}</BodyShort>
		</span>
	);
};
