import { Bleed, BodyShort } from '@navikt/ds-react';
import { ChatElipsisIcon, ChatExclamationmarkIcon, PersonPlusIcon } from '@navikt/aksel-icons';
import { UtkastStatus } from '../../../rest/data/bruker';

interface Props {
	status: UtkastStatus;
}

export const UtkastStatusData = ({ status }: Props) => {
	return (
		<span className="status">
			{utkaststatusTekstOgIkon[status].ikon}
			<BodyShort size="small">{utkaststatusTekstOgIkon[status].tekst}</BodyShort>
		</span>
	);
};

export const utkaststatusTekstOgIkon: { [key in UtkastStatus]: { tekst: string; ikon: React.ReactNode } } = {
	[UtkastStatus.TRENGER_BESLUTTER]: {
		tekst: 'Trenger kvalitetssikring',
		ikon: (
			<Bleed marginBlock="1 2" asChild>
				<PersonPlusIcon aria-hidden={true} className="status_ikon" />
			</Bleed>
		)
	},
	[UtkastStatus.KLAR_TIL_BESLUTTER]: {
		tekst: 'Venter på tilbakemelding',
		ikon: (
			<Bleed marginBlock="0 3" asChild>
				<ChatExclamationmarkIcon aria-hidden={true} className="status_ikon" />
			</Bleed>
		)
	},
	[UtkastStatus.KLAR_TIL_VEILEDER]: {
		tekst: 'Venter på veileder',
		ikon: (
			<Bleed marginBlock="0 3" asChild>
				<ChatElipsisIcon aria-hidden={true} className="status_ikon" />
			</Bleed>
		)
	},
	[UtkastStatus.GODKJENT_AV_BESLUTTER]: {
		tekst: 'Klar til utsendelse',
		ikon: (
			<Bleed marginBlock="0 3" asChild>
				<ChatElipsisIcon aria-hidden={true} className="status_ikon" />
			</Bleed>
		)
	}
};
