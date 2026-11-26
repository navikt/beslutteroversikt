import { PersonPlusIcon } from '@navikt/aksel-icons';
import { BodyShort, Button, ErrorMessage } from '@navikt/ds-react';
import { lagBliBeslutterFetchInfo } from '../../../rest/api';
import { UtkastStatus } from '../../../rest/data/bruker';
import useFetch from '../../../rest/use-fetch';
import { FetchStatus, hasFailed, hasFinished } from '../../../rest/utils';
import { utkaststatusTekstOgIkon } from './utkast-status-tekst-og-ikon';
import { useDataFetcherStore } from '../../../stores/data-fetcher-store';
import { KVALITETSSIKRERROLLE_TOGGLE } from '../../../rest/obo-unleash';

interface Props {
	status: UtkastStatus;
	vedtakId: number;
	veilederIdent: string;
	onBeslutterRegistrert: (vedtakId: number) => void;
}

export const UtkastStatusData = ({ status, vedtakId, veilederIdent, onBeslutterRegistrert }: Props) => {
	const { unleashFeaturetoggleFetcher, innloggetVeilederFetcher } = useDataFetcherStore();
	const visBliKvalitetssikrerKnapp = Boolean(unleashFeaturetoggleFetcher.data?.[KVALITETSSIKRERROLLE_TOGGLE]);
	const innloggetVeilederIdent = innloggetVeilederFetcher.data?.ident;
	const kanBliKvalitetssikrer = Boolean(
		status === UtkastStatus.TRENGER_BESLUTTER &&
		innloggetVeilederIdent &&
		veilederIdent &&
		innloggetVeilederIdent !== veilederIdent
	);

	const bliBeslutter = useFetch<void, number>(lagBliBeslutterFetchInfo);
	const laster = bliBeslutter.status === FetchStatus.PENDING;
	const harFeilet = hasFinished(bliBeslutter) && (hasFailed(bliBeslutter) || bliBeslutter.httpCode !== 200);

	function handleOnBliBeslutterClicked() {
		bliBeslutter.fetch(vedtakId, state => {
			if (state.httpCode === 200 && !hasFailed(state)) {
				onBeslutterRegistrert(vedtakId);
			}
		});
	}

	return (
		<span className="status">
			{visBliKvalitetssikrerKnapp && kanBliKvalitetssikrer ? (
				<Button
					size="small"
					icon={<PersonPlusIcon />}
					loading={laster}
					disabled={laster}
					onClick={handleOnBliBeslutterClicked}
				>
					Bli kvalitetssikrer
				</Button>
			) : (
				<>
					{utkaststatusTekstOgIkon[status].ikon}
					<BodyShort size="small">{utkaststatusTekstOgIkon[status].tekst}</BodyShort>
				</>
			)}
			{harFeilet && (
				<ErrorMessage as="span" size="small" role="alert">
					Kunne ikke registrere deg som kvalitetssikrer. Prøv igjen.
				</ErrorMessage>
			)}
		</span>
	);
};
