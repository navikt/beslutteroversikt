import { useEffect } from 'react';
import { Alert } from '@navikt/ds-react';
import { useDataFetcherStore } from '../stores/data-fetcher-store';
import { FetchState, hasAnyFailed, isAnyNotStartedOrPending, isNotStarted } from '../rest/utils';
import Spinner from './felles/spinner/spinner';

export function DataFetcher(props: { children: React.ReactNode }) {
	const {
		innloggetVeilederFetcher,
		enheterMedUtkastFetcher,
		aktivEnhetFetcher,
		unleashFeaturetoggleFetcher,
		enhetsfilterOgEnkelttilgangAktivert
	} = useDataFetcherStore();

	useEffect(() => {
		if (isNotStarted(innloggetVeilederFetcher)) {
			innloggetVeilederFetcher.fetch(null);
		}

		if (enhetsfilterOgEnkelttilgangAktivert && isNotStarted(enheterMedUtkastFetcher)) {
			enheterMedUtkastFetcher.fetch(null);
		}

		if (isNotStarted(aktivEnhetFetcher)) {
			aktivEnhetFetcher.fetch(null);
		}

		if (isNotStarted(unleashFeaturetoggleFetcher)) {
			unleashFeaturetoggleFetcher.fetch(null);
		}
	}, [
		innloggetVeilederFetcher,
		enheterMedUtkastFetcher,
		aktivEnhetFetcher,
		unleashFeaturetoggleFetcher,
		enhetsfilterOgEnkelttilgangAktivert
	]);

	// Trenger ikke å sjekke om aktivEnhetFetcher er ferdig
	const fetchers: FetchState[] = [innloggetVeilederFetcher, aktivEnhetFetcher, unleashFeaturetoggleFetcher];
	if (enhetsfilterOgEnkelttilgangAktivert) {
		fetchers.push(enheterMedUtkastFetcher);
	}
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
