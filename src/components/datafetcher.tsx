import React, { useEffect } from 'react';
import { useFetchStore } from '../stores/fetch-store';
import { hasAnyFailed, isAnyNotStartedOrPending, isNotStarted } from '../rest/utils';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import Spinner from './felles/spinner/spinner';

export function DataFetcher(props: { children: any }) {
	const { brukere, innloggetVeileder } = useFetchStore();

	useEffect(() => {
		if (isNotStarted(brukere)) {
			brukere.fetch(null);
		}

		if (isNotStarted(innloggetVeileder)) {
			innloggetVeileder.fetch(null);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [brukere, innloggetVeileder]);

	if (isAnyNotStartedOrPending([brukere, innloggetVeileder])) {
		return <Spinner />;
	} else if (hasAnyFailed([brukere, innloggetVeileder])) {
		return (
			<AlertStripeFeil className="vedtaksstotte-alert">
				Det oppnås for tiden ikke kontakt med alle baksystemer.
				Vi jobber med å løse saken. Vennligst prøv igjen senere.
			</AlertStripeFeil>
		);
	}

	return props.children;
}
