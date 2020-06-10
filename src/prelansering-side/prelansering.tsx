import React from 'react';
import { PrelanseringInfoSide } from './prelansering-side';
import { PRELANSERING_INFO_OM_LOSNING_TOGGLE } from '../rest/feature';
import { useSokStore } from '../stores/sok-store';

export function Prelansering() {
    const { features } = useSokStore();

    return (
        <div>
            {features[PRELANSERING_INFO_OM_LOSNING_TOGGLE] && <PrelanseringInfoSide />}
        </div>
    );
}
