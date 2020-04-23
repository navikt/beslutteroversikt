import React from 'react';
import cls from 'classnames';
import { Bruker, UtkastStatus } from '../../../rest/data/bruker';
import { formatDateStr, formatDateTime } from '../../../utils/date-utils';
import { Normaltekst, Element } from 'nav-frontend-typografi';
import { fjernNavFraEnhetNavn, lagBrukerNavn, mapBrukerStatusTilTekst } from '../../../utils';
import klarForUtsendelseIcon from './status/klar_for_utsendelse.svg';
import trengerBeslutterIcon from './status/trenger_beslutter.svg';
import trengerTilbakemeldingIcon from './status/trenger_tilbakemelding.svg';
import venterPaResponsIcon from './status/venter_pa_respons.svg';
import { OrNothing } from '../../../utils/types/ornothing';

export const UserRow = (props: { bruker: Bruker, aktivEnhet: OrNothing<string> }) => {
	const {
		brukerFnr, brukerFornavn, brukerEtternavn, statusEndret,
		brukerOppfolgingsenhetNavn, vedtakStartet,
		beslutterNavn, veilederNavn, status
	} = props.bruker;

	const erMaskert = brukerFnr === '';

	function lagBrukerUrl() {
		if (!erMaskert) {
			const enhetQueryParam = props.aktivEnhet ? `?enhet=${props.aktivEnhet}` : '';
			return `/veilarbpersonflatefs/${brukerFnr}${enhetQueryParam}#visVedtaksstotte`;
		}

		return undefined;
	}

	return (
		<li className="user-table-row">
			<a className={cls('user-table-row__innhold', {'user-table-row__innhold--maskert': erMaskert})} href={lagBrukerUrl()}>
				<Normaltekst>{lagBrukerNavn(brukerFornavn, brukerEtternavn)}</Normaltekst>
				<Element>{brukerFnr}</Element>
				<Normaltekst>{formatDateStr(vedtakStartet)}</Normaltekst>
				<UtkastStatusData status={status}/>
				<Element>{beslutterNavn || '-'}</Element>
				<Normaltekst>{veilederNavn}</Normaltekst>
				<Normaltekst>{formatDateTime(statusEndret)}</Normaltekst>
				<Normaltekst>{fjernNavFraEnhetNavn(brukerOppfolgingsenhetNavn)}</Normaltekst>
			</a>
		</li>
	);
};

const UtkastStatusData = (props: { status: UtkastStatus }) => {
	let statusIkon;

	switch (props.status) {
		case UtkastStatus.TRENGER_BESLUTTER:
			statusIkon = trengerBeslutterIcon;
			break;
		case UtkastStatus.KLAR_TIL_BESLUTTER:
			statusIkon = trengerTilbakemeldingIcon;
			break;
		case UtkastStatus.KLAR_TIL_VEILEDER:
			statusIkon = venterPaResponsIcon;
			break;
		case UtkastStatus.GODKJENT_AV_BESLUTTER:
			statusIkon = klarForUtsendelseIcon;
			break;
	}

	return (
		<span className={'status'}>
			<img className={'status_ikon'} src={statusIkon} alt={'status ikon'}/>
			<Normaltekst>{mapBrukerStatusTilTekst(props.status)}</Normaltekst>
		</span>
	);
};
