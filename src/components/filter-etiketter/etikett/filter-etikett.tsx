import React from 'react';
import { EtikettInfo } from 'nav-frontend-etiketter';
import { OnRemoveClicked } from '../filter-etiketter';
import xIcon from './x.svg';
import './filter-etikett.less';

interface FilterEtikettProps {
    id: string;
    tekst: string;
    onRemoveClicked: OnRemoveClicked;
}

export const FilterEtikett = (props: FilterEtikettProps) => {
    const {id, tekst, onRemoveClicked} = props;

    return (
        <button className="filter-etikett" onClick={() => onRemoveClicked(id)}>
            <EtikettInfo>
                {tekst} <img className="filter-etikett__icon" src={xIcon} alt="Fjern etikett" />
            </EtikettInfo>
        </button>
    );
};
