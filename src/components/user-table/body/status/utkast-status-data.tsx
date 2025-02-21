import { Bleed, BodyShort } from '@navikt/ds-react';
import { ChatElipsisIcon, ChatExclamationmarkIcon, PersonPlusIcon } from '@navikt/aksel-icons';
import { UtkastStatus } from '../../../../rest/data/bruker';

interface Props {
	status: UtkastStatus;
}

export const UtkastStatusData = ({ status }: Props) => {
	return (
		<span role="cell" className="status">
			{utkaststatusTekstOgIkon[status].ikon}
			<BodyShort size="small">{utkaststatusTekstOgIkon[status].tekst}</BodyShort>
		</span>
	);
};

const utkaststatusTekstOgIkon: { [key in UtkastStatus]: { tekst: string; ikon: React.ReactNode } } = {
	[UtkastStatus.TRENGER_BESLUTTER]: {
		tekst: 'Trenger kvalitetssikring',
		ikon: (
			<Bleed marginBlock="1 2" asChild>
				<PersonPlusIcon title="Trenger kvalitetssikrer-ikon" className="status_ikon" />
			</Bleed>
		)
	},
	[UtkastStatus.KLAR_TIL_BESLUTTER]: {
		tekst: 'Venter på tilbakemelding',
		ikon: (
			<Bleed marginBlock="0 3" asChild>
				<ChatExclamationmarkIcon title="Venter på tilbakemelding-ikon" className="status_ikon" />
			</Bleed>
		)
	},
	[UtkastStatus.KLAR_TIL_VEILEDER]: {
		tekst: 'Venter på veileder',
		ikon: (
			<Bleed marginBlock="0 3" asChild>
				<ChatElipsisIcon title="Venter på veileder-ikon" className="status_ikon" />
			</Bleed>
		)
	},
	[UtkastStatus.GODKJENT_AV_BESLUTTER]: {
		tekst: 'Klar til utsendelse',
		ikon: (
			<Bleed marginBlock="0 3" asChild>
				<ChatElipsisIcon title="Godkjent av kvalitetssikrer-ikon" className="status_ikon" />
			</Bleed>
		)
	}
};
