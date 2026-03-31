import { BodyShort } from '@navikt/ds-react';
import { UtkastStatus } from '../../../rest/data/bruker';
import { utkaststatusTekstOgIkon } from './utkast-status-tekst-og-ikon';

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
