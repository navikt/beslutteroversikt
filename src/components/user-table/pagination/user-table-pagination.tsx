import React from 'react';
import { HoyreChevron, VenstreChevron } from 'nav-frontend-chevron';
import cls from 'classnames';
import { useSokStore } from '../../../stores/sok-store';
import './user-table-pagination.less';
import { DEFAULT_PAGINATION_SIZE, SEE_ALL_PAGINATION_SIZE } from '../../../utils/sok-utils';
import Show from '../../felles/show';

function PagineringKnapp(props: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) {
    const { className, children, ...rest } = props;
    return (
        <button className={cls(className, 'paginering__knapp')} {...rest}>
            {props.children}
        </button>
    );
}

export function UserTablePagination() {
    const { currentPage, totalPages, seeAll, setCurrentPage, setSeeAll, setPageSize } = useSokStore();

    const erPaForsteSide: boolean = currentPage === 1;
    const erPaSisteSide: boolean = currentPage >= totalPages;

    function handlePageChanged(newPage: number) {
        setCurrentPage(newPage);
    }

    function handleSeeAllChanged() {
        const toggledSeeAll = !seeAll;

        if (toggledSeeAll) {
            setPageSize(SEE_ALL_PAGINATION_SIZE);
        } else {
            setPageSize(DEFAULT_PAGINATION_SIZE);
        }

        setCurrentPage(1);
        setSeeAll(toggledSeeAll);
    }

    return (
        <div className={cls('paginering')}>
            <PagineringKnapp onClick={handleSeeAllChanged}>
                {!seeAll ? 'Se alle' : 'Se færre'}
            </PagineringKnapp>

            <PagineringKnapp disabled={erPaForsteSide} onClick={() => handlePageChanged(currentPage - 1)}>
                <VenstreChevron/>
            </PagineringKnapp>

            <Show if={!erPaForsteSide}>
                <PagineringKnapp onClick={() => handlePageChanged(1)}>1</PagineringKnapp>
            </Show>

            <PagineringKnapp>
                <strong>{currentPage}</strong>
            </PagineringKnapp>

            <Show if={!erPaSisteSide && !seeAll}>
                <PagineringKnapp onClick={() => handlePageChanged(totalPages)}>
                    {totalPages}
                </PagineringKnapp>
            </Show>

            <PagineringKnapp disabled={erPaSisteSide || seeAll} onClick={() => handlePageChanged(currentPage + 1)}>
                <HoyreChevron/>
            </PagineringKnapp>
        </div>
    );
}
