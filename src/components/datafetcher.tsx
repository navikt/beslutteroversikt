import { useEffect } from 'react';
import { useDataFetcherStore } from '../stores/data-fetcher-store';
import { hasAnyFailed, isAnyNotStartedOrPending, isNotStarted } from '../rest/utils';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import Spinner from './felles/spinner/spinner';

export function DataFetcher(props: { children: any }) {
	const { innloggetVeilederFetcher, aktivEnhetFetcher, tilhorerVeilederUtrulletKontorFetcher } =
		useDataFetcherStore();

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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [innloggetVeilederFetcher, aktivEnhetFetcher, tilhorerVeilederUtrulletKontorFetcher]);

	// Trenger ikke å sjekke om aktivEnhetFetcher er ferdig
	if (
		isAnyNotStartedOrPending([innloggetVeilederFetcher, aktivEnhetFetcher, tilhorerVeilederUtrulletKontorFetcher])
	) {
		return <Spinner />;
	} else if (hasAnyFailed([innloggetVeilederFetcher, aktivEnhetFetcher, tilhorerVeilederUtrulletKontorFetcher])) {
		return (
			<AlertStripeFeil className="vedtaksstotte-alert">
				Det oppnås for tiden ikke kontakt med alle baksystemer. Vi jobber med å løse saken. Vennligst prøv igjen
				senere.
			</AlertStripeFeil>
		);
	}

	return props.children;
}
