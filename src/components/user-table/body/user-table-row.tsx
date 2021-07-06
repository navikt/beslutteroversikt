import React, { CSSProperties } from 'react';
import cls from 'classnames';
import { Bruker, UtkastStatus } from '../../../rest/data/bruker';
import { formatDateStr, formatDateTime } from '../../../utils/date-utils';
import { Normaltekst, Element } from 'nav-frontend-typografi';
import { fjernNavFraEnhetNavn, lagBrukerNavn, mapBrukerStatusTilTekst } from '../../../utils';
import { OrNothing } from '../../../utils/types/ornothing';
import { DialogDots, DialogReport } from '@navikt/ds-icons';
import { AddPeople } from '@navikt/ds-icons';
import './user-table-body.less';

export const UserRow = (props: { idx: number, bruker: Bruker, aktivEnhet: OrNothing<string> }) => {
	const {
		brukerFnr, brukerFornavn, brukerEtternavn, statusEndret,
		brukerOppfolgingsenhetNavn, vedtakStartet,
		beslutterNavn, veilederNavn, status
	} = props.bruker;

	const erMaskert = brukerFnr === '';

	function lagBrukerUrl() {
		if (!erMaskert) {
			const enhetQueryParam = props.aktivEnhet ? `?enhet=${props.aktivEnhet}` : '';
			return `/veilarbpersonflatefs/${brukerFnr}${enhetQueryParam}#visVedtaksstotte#visUtkast`;
		}

		return undefined;
	}

	const alignStart: CSSProperties = { textAlign: 'start' };

	return (
		<div role="row" aria-rowindex={props.idx} className="user-table-row">
			<a className={cls('user-table-row__innhold', {'user-table-row__innhold--maskert': erMaskert})} href={lagBrukerUrl()}>
				<Normaltekst tag="span" role="cell" style={alignStart}>{lagBrukerNavn(brukerFornavn, brukerEtternavn)}</Normaltekst>
				<Element tag="span" role="cell">{brukerFnr}</Element>
				<Normaltekst tag="span" role="cell">{formatDateStr(vedtakStartet)}</Normaltekst>
				<UtkastStatusData status={status}/>
				<Element tag="span" role="cell" style={alignStart}>{beslutterNavn || '-'}</Element>
				<Normaltekst tag="span" role="cell" style={alignStart}>{veilederNavn}</Normaltekst>
				<Normaltekst tag="span" role="cell">{formatDateTime(statusEndret)}</Normaltekst>
				<Normaltekst tag="span" role="cell">{fjernNavFraEnhetNavn(brukerOppfolgingsenhetNavn)}</Normaltekst>
			</a>
		</div>
	);
};

const UtkastStatusData = (props: { status: UtkastStatus }) => {
	let StatusIkon;
	const ariaLabel = 'Systemikon';
	let ikonFarge;

	switch (props.status) {
		case UtkastStatus.TRENGER_BESLUTTER:
			StatusIkon = AddPeople;
			ikonFarge = ''
			break;
		case UtkastStatus.KLAR_TIL_BESLUTTER:
			StatusIkon = DialogReport;
			ikonFarge = 'status_ikon__oransje'
			break;
		case UtkastStatus.KLAR_TIL_VEILEDER:
			StatusIkon = DialogDots;
			ikonFarge = 'status_ikon__bla'
			break;
		case UtkastStatus.GODKJENT_AV_BESLUTTER:
			StatusIkon = DialogDots;
			ikonFarge = 'status_ikon__bla'
			break;
	}

	return (
		<span role="cell" className={'status'}>
			<StatusIkon className={ikonFarge}
			aria-label={ariaLabel}
			role="img"
			focusable="false"
			/>
			<Normaltekst>{mapBrukerStatusTilTekst(props.status)}</Normaltekst>
		</span>
	);
};
