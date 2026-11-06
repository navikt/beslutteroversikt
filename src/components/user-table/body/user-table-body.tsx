import { Table } from '@navikt/ds-react';
import { LasterInnholdRad } from './laster-innhold-rad';
import { UserTableRow } from './user-table-row';
import { FantIngenBrukereAlertRad } from './fant-ingen-brukere-alert-rad';
import { useDataFetcherStore } from '../../../stores/data-fetcher-store';
import { hasFinished } from '../../../rest/utils';
import './user-table-body.css';

export const UserTableBody = () => {
	const { brukereFetcher, etiketterFetcher } = useDataFetcherStore();
	const brukere = (brukereFetcher.data && brukereFetcher.data.brukere) || [];
	const etiketterPerFnr = new Map((etiketterFetcher.data ?? []).map(etiketter => [etiketter.fnr, etiketter]));
	const laster = !hasFinished(brukereFetcher);

	return (
		<Table.Body className="user-table-body">
			{laster ? (
				<LasterInnholdRad />
			) : (
				<>
					{brukere.map((bruker, index) => (
						// Bruker index som key fordi maskerte brukarar har fnr="" og vi ikkje har noko anna unik info på brukar
						<UserTableRow bruker={bruker} etiketter={etiketterPerFnr.get(bruker.brukerFnr)} key={index} />
					))}

					{brukere.length === 0 && <FantIngenBrukereAlertRad />}
				</>
			)}
		</Table.Body>
	);
};
