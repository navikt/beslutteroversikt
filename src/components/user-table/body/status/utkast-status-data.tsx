import { Bleed, BodyShort } from '@navikt/ds-react';
import { ChatElipsisIcon, ChatExclamationmarkIcon, PersonPlusIcon } from '@navikt/aksel-icons';
import { UtkastStatus } from '../../../../rest/data/bruker';
import { mapBrukerStatusTilTekst } from '../../../../utils';

interface Props {
	status: UtkastStatus;
}

export const UtkastStatusData = ({ status }: Props) => {
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
