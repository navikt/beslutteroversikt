import React, { useEffect } from 'react';
import { useFetchStore } from '../stores/fetch-store';
import { hasAnyFailed, isAnyNotStartedOrPending, isNotStarted } from '../rest/utils';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import Spinner from './felles/spinner/spinner';

export function DataFetcher(props: { children: any }) {
	const { innloggetVeileder } = useFetchStore();

	useEffect(() => {
		if (isNotStarted(innloggetVeileder)) {
			innloggetVeileder.fetch(null);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [innloggetVeileder]);

	if (isAnyNotStartedOrPending([innloggetVeileder])) {
		return <Spinner />;
	} else if (hasAnyFailed([innloggetVeileder])) {
		return (
			<AlertStripeFeil className="vedtaksstotte-alert">
				Det oppnås for tiden ikke kontakt med alle baksystemer.
				Vi jobber med å løse saken. Vennligst prøv igjen senere.
			</AlertStripeFeil>
		);
	}

	return props.children;
}
