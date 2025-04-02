import { useEffect } from 'react';
import { Alert } from '@navikt/ds-react';
import { useDataFetcherStore } from '../stores/data-fetcher-store';
import { hasAnyFailed, isAnyNotStartedOrPending, isNotStarted } from '../rest/utils';
import Spinner from './felles/spinner/spinner';

export function DataFetcher(props: { children: React.ReactNode }) {
	const { innloggetVeilederFetcher, aktivEnhetFetcher, unleashFeaturetoggleFetcher } = useDataFetcherStore();

	useEffect(() => {
		if (isNotStarted(innloggetVeilederFetcher)) {
			innloggetVeilederFetcher.fetch(null);
		}

		if (isNotStarted(aktivEnhetFetcher)) {
			aktivEnhetFetcher.fetch(null);
		}

		if (isNotStarted(unleashFeaturetoggleFetcher)) {
			unleashFeaturetoggleFetcher.fetch(null);
		}
	}, [innloggetVeilederFetcher, aktivEnhetFetcher, unleashFeaturetoggleFetcher]);

	// Trenger ikke å sjekke om aktivEnhetFetcher er ferdig
	if (isAnyNotStartedOrPending([innloggetVeilederFetcher, aktivEnhetFetcher, unleashFeaturetoggleFetcher])) {
		return <Spinner />;
	} else if (hasAnyFailed([innloggetVeilederFetcher, aktivEnhetFetcher, unleashFeaturetoggleFetcher])) {
		return (
			<Alert variant="error">
				Vi får ikke kontakt med alle baksystemene, prøv igjen senere. Gjerne meld sak i Porten om problemet
				varer lenge.
			</Alert>
		);
	}

	return props.children;
}
