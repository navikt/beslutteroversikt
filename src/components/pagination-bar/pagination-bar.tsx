import React from 'react';
import { HoyreChevron, VenstreChevron } from 'nav-frontend-chevron';
import cls from 'classnames';
import { useSokStore } from '../../stores/sok-store';
import './pagination-bar.less';
import Show from '../felles/show';
import { useDataFetcherStore } from '../../stores/data-fetcher-store';
import { Element } from 'nav-frontend-typografi';
import { hasData } from '../../rest/utils';

function PagineringKnapp(props: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) {
    const { className, children, ...rest } = props;
    return (
        <button className={cls(className, 'paginering__knapp')} {...rest}>
            {props.children}
        </button>
    );
}

export function PaginationBar() {
    const { currentPage, totalPages, seeAll, setCurrentPage, pageSize } = useSokStore();
    const { brukereFetcher } = useDataFetcherStore();

    const erPaForsteSide: boolean = currentPage === 1;
    const erPaSisteSide: boolean = currentPage >= totalPages;

    const fraBruker = ((currentPage - 1) * pageSize) + 1;
    const tilBruker = ((currentPage - 1) * pageSize) + (brukereFetcher.data ? brukereFetcher.data.brukere.length : 0);
    const totaltBrukere = brukereFetcher.data ? brukereFetcher.data.totaltAntall : 0;

    function handlePageChanged(newPage: number) {
        setCurrentPage(newPage);
    }

    // function handleSeeAllChanged() {
    //     const toggledSeeAll = !seeAll;
    //
    //     if (toggledSeeAll) {
    //         setPageSize(SEE_ALL_PAGINATION_SIZE);
    //     } else {
    //         setPageSize(DEFAULT_PAGINATION_SIZE);
    //     }
    //
    //     setCurrentPage(1);
    //     setSeeAll(toggledSeeAll);
    // }

    return (
        <div className="pagination-bar">
            <div>
                <Show if={hasData(brukereFetcher)}>
                    <Element>
                        Viser {fraBruker}-{tilBruker} av totalt {totaltBrukere} brukere
                    </Element>
                </Show>
            </div>
            <div className={cls('paginering')}>
                {/* Vent litt med "Se Alle" funksjonen siden ABAC ikke håndterer store spørringer */}
                {/*<PagineringKnapp onClick={handleSeeAllChanged}>*/}
                {/*    {!seeAll ? 'Se alle' : 'Se færre'}*/}
                {/*</PagineringKnapp>*/}
                <PagineringKnapp aria-label="Forrige side" disabled={erPaForsteSide} onClick={() => handlePageChanged(currentPage - 1)}>
                    <VenstreChevron/>
                </PagineringKnapp>

                <Show if={!erPaForsteSide}>
                    <PagineringKnapp aria-label="Første side" onClick={() => handlePageChanged(1)}>1</PagineringKnapp>
                </Show>

                <PagineringKnapp aria-label="Valgt side">
                    <strong>{currentPage}</strong>
                </PagineringKnapp>

                <Show if={!erPaSisteSide && !seeAll}>
                    <PagineringKnapp aria-label="Siste side" onClick={() => handlePageChanged(totalPages)}>
                        {totalPages}
                    </PagineringKnapp>
                </Show>

                <PagineringKnapp aria-label="Neste side" disabled={erPaSisteSide || seeAll} onClick={() => handlePageChanged(currentPage + 1)}>
                    <HoyreChevron/>
                </PagineringKnapp>
            </div>
        </div>
    );
}
