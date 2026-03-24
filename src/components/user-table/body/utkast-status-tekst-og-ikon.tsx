import type { ReactNode } from 'react';
import { ChatElipsisIcon, ChatExclamationmarkIcon, PersonPlusIcon } from '@navikt/aksel-icons';
import { UtkastStatus } from '../../../rest/data/bruker';

export const utkaststatusTekstOgIkon: { [key in UtkastStatus]: { tekst: string; ikon: ReactNode } } = {
	[UtkastStatus.TRENGER_BESLUTTER]: {
		tekst: 'Trenger kvalitetssikring',
		ikon: <PersonPlusIcon aria-hidden={true} className="status_ikon" />
	},
	[UtkastStatus.KLAR_TIL_BESLUTTER]: {
		tekst: 'Venter på tilbakemelding',
		ikon: <ChatExclamationmarkIcon aria-hidden={true} className="status_ikon" />
	},
	[UtkastStatus.KLAR_TIL_VEILEDER]: {
		tekst: 'Venter på veileder',
		ikon: <ChatElipsisIcon aria-hidden={true} className="status_ikon" />
	},
	[UtkastStatus.GODKJENT_AV_BESLUTTER]: {
		tekst: 'Klar til utsendelse',
		ikon: <ChatElipsisIcon aria-hidden={true} className="status_ikon" />
	}
};
