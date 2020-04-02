import React from 'react';
import { Bruker, UtkastStatus } from '../../../rest/data/bruker';
import { formatDateStr, tidSiden } from '../../../utils/date-utils';
import { Normaltekst, Element } from 'nav-frontend-typografi';
import { fjernNavFraEnhetNavn, mapBrukerStatusTilTekst } from '../../../utils';
import harBeslutterIcon from './status/har_beslutter.svg';
import klarForUtsendelseIcon from './status/klar_for_utsendelse.svg';
import trengerBeslutterIcon from './status/trenger_beslutter.svg';
import trengerTilbakemeldingIcon from './status/trenger_tilbakemelding.svg';
import venterPaResponsIcon from './status/venter_pa_respons.svg';

export const UserRow = (props: {bruker: Bruker}) => {
	const {
		fnr, fornavn, etternavn, utkastSistEndret,
		oppfolgingsenhetNavn, vedtakStartet,
		beslutterNavn, veilederNavn, status
	} = props.bruker;

    return (
    	<li className="user-table-row">
		    <Normaltekst>{etternavn + ', ' + fornavn}</Normaltekst>
		    <Element>{fnr}</Element>
		    <Normaltekst>{formatDateStr(vedtakStartet)}</Normaltekst>
			<UtkastStatusData status={status}/>
		    <Element>{beslutterNavn || '-'}</Element>
		    <Normaltekst>{veilederNavn}</Normaltekst>
		    <Normaltekst>{tidSiden(utkastSistEndret)}</Normaltekst>
		    <Normaltekst>{fjernNavFraEnhetNavn(oppfolgingsenhetNavn)}</Normaltekst>
	    </li>
    );
};

const UtkastStatusData = (props: { status: UtkastStatus }) => {
	let statusIkon;
	switch (props.status) {
		case UtkastStatus.KLAR_FOR_BESLUTTER:
			statusIkon = trengerBeslutterIcon;
			break;
		case UtkastStatus.HAR_BESLUTTER:
			statusIkon = harBeslutterIcon;
			break;
		case UtkastStatus.VENTER_PA_VEILEDER:
			statusIkon = trengerTilbakemeldingIcon;
			break;
		case UtkastStatus.VENTER_PA_BESLUTTER:
			statusIkon = venterPaResponsIcon;
			break;
		case UtkastStatus.KLAR_TIL_UTSENDING:
			statusIkon = klarForUtsendelseIcon;
			break;
	}
	return (
		<span className={'status'}>
			<img className={'status_ikon'} src={statusIkon} alt={'status ikon'} />
		<Normaltekst>{mapBrukerStatusTilTekst(props.status)}</Normaltekst>
	</span>);
};
