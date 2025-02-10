import { Bruker, UtkastStatus } from '../../../rest/data/bruker';
import { formatDateStr, formatDateStrWithMonthName, formatTimeStr } from '../../../utils/date-utils';
import { capitalize, fjernNavFraEnhetNavn, lagBrukerNavn, mapBrukerStatusTilTekst } from '../../../utils';
import { OrNothing } from '../../../utils/types/ornothing';
import { BrukerDirektelenkeMedFeilmelding } from '../bruker-direktelenke-med-feilmelding';
import { Bleed, BodyShort, CopyButton, Tooltip } from '@navikt/ds-react';
import { ChatElipsisIcon, ChatExclamationmarkIcon, PersonPlusIcon } from '@navikt/aksel-icons';
import './user-table-body.less';

export const UserRow = (props: { idx: number; bruker: Bruker; aktivEnhet: OrNothing<string> }) => {
	const { aktivEnhet } = props;
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
	} = props.bruker;

	const erMaskert = brukerFnr === '';

	return (
		// idx starter på 0, men gyldige verdier for aria-rowindex er 1 og oppover
		<div role="row" aria-rowindex={props.idx + 1} className="user-table-row">
			<div className="user-table-row__innhold">
				<Bleed marginBlock="2" style={{ display: 'flex' }}>
					{!erMaskert && (
						<BrukerDirektelenkeMedFeilmelding
							enhet={aktivEnhet}
							fnr={brukerFnr}
							knappTekst={`${capitalize(lagBrukerNavn(brukerEtternavn, brukerFornavn))}`}
						/>
					)}
				</Bleed>
				<BodyShort size="small">
					{brukerFnr && (
						<Tooltip content="Kopier fødselsnr" placement="right">
							<CopyButton
								copyText={brukerFnr}
								text={brukerFnr}
								title="Fødselsnummer"
								size="xsmall"
								iconPosition="right"
							/>
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

const UtkastStatusData = (props: { status: UtkastStatus }) => {
	let StatusIkon;
	switch (props.status) {
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
			<BodyShort size="small">{mapBrukerStatusTilTekst(props.status)}</BodyShort>
		</span>
	);
};
