import React, { useEffect } from 'react';
import { useDataFetcherStore } from '../stores/data-fetcher-store';
import { hasAnyFailed, isAnyNotStartedOrPending, isNotStarted } from '../rest/utils';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import Spinner from './felles/spinner/spinner';

export function DataFetcher(props: { children: any }) {
	const { innloggetVeilederFetcher, aktivEnhetFetcher } = useDataFetcherStore();

	useEffect(() => {
		if (isNotStarted(innloggetVeilederFetcher)) {
			innloggetVeilederFetcher.fetch(null);
		}

		if (isNotStarted(aktivEnhetFetcher)) {
			aktivEnhetFetcher.fetch(null);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [innloggetVeilederFetcher]);

	// Trenger ikke å sjekke om aktivEnhetFetcher er ferdig
	if (isAnyNotStartedOrPending([innloggetVeilederFetcher])) {
		return <Spinner />;
	} else if (hasAnyFailed([innloggetVeilederFetcher])) {
		return (
			<AlertStripeFeil className="vedtaksstotte-alert">
				Det oppnås for tiden ikke kontakt med alle baksystemer.
				Vi jobber med å løse saken. Vennligst prøv igjen senere.
			</AlertStripeFeil>
		);
	}

	return props.children;
}
