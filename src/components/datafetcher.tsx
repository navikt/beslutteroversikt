import { useEffect } from 'react';
import { Alert } from '@navikt/ds-react';
import { useDataFetcherStore } from '../stores/data-fetcher-store';
import { hasAnyFailed, isAnyNotStartedOrPending, isNotStarted } from '../rest/utils';
import Spinner from './felles/spinner/spinner';

export function DataFetcher(props: { children: React.ReactNode }) {
	const { innloggetVeilederFetcher, enheterMedUtkastFetcher, aktivEnhetFetcher, unleashFeaturetoggleFetcher } =
		useDataFetcherStore();

	useEffect(() => {
		if (isNotStarted(innloggetVeilederFetcher)) {
			innloggetVeilederFetcher.fetch(null);
		}

		if (isNotStarted(enheterMedUtkastFetcher)) {
			enheterMedUtkastFetcher.fetch(null);
		}

		if (isNotStarted(aktivEnhetFetcher)) {
			aktivEnhetFetcher.fetch(null);
		}

		if (isNotStarted(unleashFeaturetoggleFetcher)) {
			unleashFeaturetoggleFetcher.fetch(null);
		}
	}, [innloggetVeilederFetcher, enheterMedUtkastFetcher, aktivEnhetFetcher, unleashFeaturetoggleFetcher]);

	// Trenger ikke å sjekke om aktivEnhetFetcher er ferdig
	const fetchers = [
		innloggetVeilederFetcher,
		enheterMedUtkastFetcher,
		aktivEnhetFetcher,
		unleashFeaturetoggleFetcher
	];
	if (isAnyNotStartedOrPending(fetchers)) {
		return <Spinner />;
	} else if (hasAnyFailed(fetchers)) {
		return (
			<Alert variant="error">
				Vi får ikke kontakt med alle baksystemene, prøv igjen senere. Gjerne meld sak i Porten om problemet
				varer lenge.
			</Alert>
		);
	}

	return props.children;
}
