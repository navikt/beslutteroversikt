import { Alert } from '@navikt/ds-react';
import { UserTableHeader } from './header/user-table-header';
import { UserTableBody } from './body/user-table-body';
import { OrderByData } from './table-utils';
import { useSokStore } from '../../stores/sok-store';
import { useDataFetcherStore } from '../../stores/data-fetcher-store';
import { hasFinished, isNotStartedOrPending } from '../../rest/utils';
import Spinner from '../felles/spinner/spinner';
import './user-table.less';

export const UserTable = () => {
	const { brukereFetcher } = useDataFetcherStore();
	const { orderByField, orderByDirection, setOrderByField, setOrderByDirection } = useSokStore();
	const tableBrukere = (brukereFetcher.data && brukereFetcher.data.brukere) || [];

	const orderByData: OrderByData = {
		field: orderByField,
		direction: orderByDirection
	};

	function handleOnOrderByChanged(nyData: OrderByData) {
		setOrderByField(nyData.field);
		setOrderByDirection(nyData.direction);
	}

	const tableOrAlert = () => {
		if (hasFinished(brukereFetcher)) {
			if (tableBrukere.length === 0) {
				return <Alert variant="info">Fant ingen brukere</Alert>;
			} else {
				return <UserTableBody brukere={tableBrukere} />;
			}
		}
	};

	return (
		<div
			role="table"
			aria-label="Brukere som trenger kvalitetssikring"
			aria-rowcount={tableBrukere.length}
			className="user-table"
		>
			<UserTableHeader orderByData={orderByData} onOrderByChanged={handleOnOrderByChanged} />
			{isNotStartedOrPending(brukereFetcher) && <Spinner />}
			{tableOrAlert()}
		</div>
	);
};
