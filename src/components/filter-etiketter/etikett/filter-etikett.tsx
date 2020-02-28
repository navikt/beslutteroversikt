import React from 'react';
import { EtikettInfo } from 'nav-frontend-etiketter';
import './filter-etikett.less';
import { OnRemoveClicked } from '../filter-etiketter';

interface FilterEtikettProps {
    id: string;
    tekst: string;
    onRemoveClicked: OnRemoveClicked;
}

export const FilterEtikett = (props: FilterEtikettProps) => {
    const {id, tekst, onRemoveClicked} = props;

    return (
        <button className="filter-etikett" onClick={() => onRemoveClicked(id)}>
            <EtikettInfo>{tekst}</EtikettInfo>
        </button>
    );
};
