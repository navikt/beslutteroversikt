import { UserTableHeader } from './header/user-table-header';
import { Alert } from '@navikt/ds-react';
import { UserTableBody } from './body/user-table-body';
import { OrderByData } from './table-utils';
import { useSokStore } from '../../stores/sok-store';
import { useDataFetcherStore } from '../../stores/data-fetcher-store';
import { hasFinished, isNotStartedOrPending } from '../../rest/utils';
import Spinner from '../felles/spinner/spinner';
import './user-table.less';

export const UserTable = () => {
	const { brukereFetcher, aktivEnhetFetcher } = useDataFetcherStore();
	const { orderByField, orderByDirection, setOrderByField, setOrderByDirection } = useSokStore();
	const tableBrukere = (brukereFetcher.data && brukereFetcher.data.brukere) || [];
	const aktivEnhet = aktivEnhetFetcher.data ? aktivEnhetFetcher.data.aktivEnhet : undefined;
	const orderByData: OrderByData = {
		field: orderByField,
		direction: orderByDirection
	};

	function handleOnOrderByChanged(nyData: OrderByData) {
		setOrderByField(nyData.field);
		setOrderByDirection(nyData.direction);
	}

	return (
		<div
			role="table"
			aria-label="Brukere som trenger kvalitetssikring"
			aria-rowcount={tableBrukere.length}
			className="user-table"
		>
			<UserTableHeader orderByData={orderByData} onOrderByChanged={handleOnOrderByChanged} />
			{isNotStartedOrPending(brukereFetcher) && <Spinner />}
			{tableBrukere.length === 0 && hasFinished(brukereFetcher) ? (
				<Alert variant="info">Fant ingen brukere</Alert>
			) : (
				<UserTableBody brukere={tableBrukere} aktivEnhet={aktivEnhet} />
			)}
		</div>
	);
};
