import { useEffect } from 'react';
import { Alert } from '@navikt/ds-react';
import { useDataFetcherStore } from '../stores/data-fetcher-store';
import { hasAnyFailed, isAnyNotStartedOrPending, isNotStarted } from '../rest/utils';
import Spinner from './felles/spinner/spinner';

export function DataFetcher(props: { children: React.ReactNode }) {
	const {
		innloggetVeilederFetcher,
		aktivEnhetFetcher,
		tilhorerVeilederUtrulletKontorFetcher,
		unleashFeaturetoggleFetcher
	} = useDataFetcherStore();

	useEffect(() => {
		if (isNotStarted(innloggetVeilederFetcher)) {
			innloggetVeilederFetcher.fetch(null);
		}

		if (isNotStarted(aktivEnhetFetcher)) {
			aktivEnhetFetcher.fetch(null);
		}

		if (isNotStarted(tilhorerVeilederUtrulletKontorFetcher)) {
			tilhorerVeilederUtrulletKontorFetcher.fetch(null);
		}

		if (isNotStarted(unleashFeaturetoggleFetcher)) {
			unleashFeaturetoggleFetcher.fetch(null);
		}
	}, [
		innloggetVeilederFetcher,
		aktivEnhetFetcher,
		tilhorerVeilederUtrulletKontorFetcher,
		unleashFeaturetoggleFetcher
	]);

	// Trenger ikke å sjekke om aktivEnhetFetcher er ferdig
	if (
		isAnyNotStartedOrPending([
			innloggetVeilederFetcher,
			aktivEnhetFetcher,
			tilhorerVeilederUtrulletKontorFetcher,
			unleashFeaturetoggleFetcher
		])
	) {
		return <Spinner />;
	} else if (
		hasAnyFailed([
			innloggetVeilederFetcher,
			aktivEnhetFetcher,
			tilhorerVeilederUtrulletKontorFetcher,
			unleashFeaturetoggleFetcher
		])
	) {
		return (
			<Alert variant="error">
				Vi får ikke kontakt med alle baksystemene, prøv igjen senere. Gjerne meld sak i Porten om problemet
				varer lenge.
			</Alert>
		);
	}

	return props.children;
}
