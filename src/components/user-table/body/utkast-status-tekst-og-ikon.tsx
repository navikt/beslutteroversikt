import type { ReactNode } from 'react';
import { ChatElipsisIcon, ChatExclamationmarkIcon, PersonPlusIcon } from '@navikt/aksel-icons';
import { Bleed } from '@navikt/ds-react';
import { UtkastStatus } from '../../../rest/data/bruker';

export const utkaststatusTekstOgIkon: { [key in UtkastStatus]: { tekst: string; ikon: ReactNode } } = {
	[UtkastStatus.TRENGER_BESLUTTER]: {
		tekst: 'Trenger kvalitetssikring',
		ikon: (
			<Bleed marginBlock="space-4 space-8" asChild>
				<PersonPlusIcon aria-hidden={true} className="status_ikon" />
			</Bleed>
		)
	},
	[UtkastStatus.KLAR_TIL_BESLUTTER]: {
		tekst: 'Venter på tilbakemelding',
		ikon: (
			<Bleed marginBlock="space-0 space-12" asChild>
				<ChatExclamationmarkIcon aria-hidden={true} className="status_ikon" />
			</Bleed>
		)
	},
	[UtkastStatus.KLAR_TIL_VEILEDER]: {
		tekst: 'Venter på veileder',
		ikon: (
			<Bleed marginBlock="space-0 space-12" asChild>
				<ChatElipsisIcon aria-hidden={true} className="status_ikon" />
			</Bleed>
		)
	},
	[UtkastStatus.GODKJENT_AV_BESLUTTER]: {
		tekst: 'Klar til utsendelse',
		ikon: (
			<Bleed marginBlock="space-0 space-12" asChild>
				<ChatElipsisIcon aria-hidden={true} className="status_ikon" />
			</Bleed>
		)
	}
};
