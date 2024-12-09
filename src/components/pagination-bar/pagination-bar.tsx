import { useSokStore } from '../../stores/sok-store';
import { useDataFetcherStore } from '../../stores/data-fetcher-store';
import { Label, Pagination } from '@navikt/ds-react';
import './pagination-bar.css';

export function PaginationBar() {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { currentPage, totalPages, seeAll, setCurrentPage, pageSize } = useSokStore();
	const { brukereFetcher } = useDataFetcherStore();

	const fraBruker = (currentPage - 1) * pageSize + 1;
	const tilBruker = (currentPage - 1) * pageSize + (brukereFetcher.data ? brukereFetcher.data.brukere.length : 0);
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
		<section title="Paginering" className="pagination-bar">
			<Label size="small" aria-live="polite">
				Viser {totaltBrukere ? `${fraBruker}–${tilBruker}` : 0} av totalt {totaltBrukere} brukere
			</Label>
			{/* Vent litt med "Se Alle" funksjonen siden ABAC ikke håndterer store spørringer */}
			{/*<PagineringKnapp onClick={handleSeeAllChanged}>*/}
			{/*    {!seeAll ? 'Se alle' : 'Se færre'}*/}
			{/*</PagineringKnapp>*/}
			<Pagination
				size="small"
				count={totalPages}
				page={currentPage}
				onPageChange={handlePageChanged}
				siblingCount={0}
				boundaryCount={1}
			/>
		</section>
	);
}
