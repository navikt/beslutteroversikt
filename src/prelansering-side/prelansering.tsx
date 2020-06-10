import React from 'react';
import { PrelanseringInfoSide } from './prelansering-side';
import { PRELANSERING_INFO_OM_LOSNING_TOGGLE } from '../rest/feature';
import { useDataFetcherStore } from '../stores/data-fetcher-store';

export function Prelansering() {
    const { featuresFetcher } = useDataFetcherStore();

    return (
        <>
            {featuresFetcher.data[PRELANSERING_INFO_OM_LOSNING_TOGGLE] && <PrelanseringInfoSide />}
        </>
    );
}
