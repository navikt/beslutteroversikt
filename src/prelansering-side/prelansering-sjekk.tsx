import React, { PropsWithChildren, useEffect } from 'react';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { PRELANSERING_INFO_OM_LOSNING_TOGGLE } from '../rest/feature';
import Spinner from '../components/felles/spinner/spinner';
import env from '../utils/environment';
import { Prelansering } from './prelansering';
import { useDataFetcherStore } from '../stores/data-fetcher-store';
import { hasAnyFailed, isAnyNotStartedOrPending, isNotStarted } from '../rest/utils';


export function PrelanseringSjekk(props: PropsWithChildren<any>) {
    const { featuresFetcher } = useDataFetcherStore();

    useEffect(() => {
        if (isNotStarted(featuresFetcher)) {
            featuresFetcher.fetch(null);
        }
    }, [featuresFetcher]);

    if (isAnyNotStartedOrPending([featuresFetcher])) {
        return <Spinner />;
    } else if (hasAnyFailed([featuresFetcher])) {
        return (
            <AlertStripeFeil className="vedtaksstotte-alert">
                Det oppnås for tiden ikke kontakt med alle baksystemer.
                Vi jobber med å løse saken. Vennligst prøv igjen senere.
            </AlertStripeFeil>
        );
    }

    return (featuresFetcher.data[PRELANSERING_INFO_OM_LOSNING_TOGGLE] && !env.isDevelopment) ? <Prelansering/> : props.children;
}
