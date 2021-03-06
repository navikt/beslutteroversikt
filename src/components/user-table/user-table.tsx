import React from 'react';
import { UserTableHeader } from './header/user-table-header';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { UserTableBody } from './body/user-table-body';
import { OrderByData } from './table-utils';
import { useSokStore } from '../../stores/sok-store';
import './user-table.less';
import { useDataFetcherStore } from '../../stores/data-fetcher-store';
import { hasFinished, isNotStartedOrPending } from '../../rest/utils';
import Show from '../felles/show';
import Spinner from '../felles/spinner/spinner';

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
    	<div role="table" aria-label="Brukere som trenger kvalitetssikring" aria-rowcount={tableBrukere.length} className="user-table">
		    <UserTableHeader orderByData={orderByData} onOrderByChanged={handleOnOrderByChanged} />
		    <Show if={isNotStartedOrPending(brukereFetcher)}>
			    <Spinner />
		    </Show>
		    {
		    	tableBrukere.length === 0 && hasFinished(brukereFetcher)
				    ? (
					    <AlertStripeInfo className="user-table__no-users">
						    <span role="alert" aria-live="polite">Fant ingen brukere</span>
					    </AlertStripeInfo>
			        )
				    : <UserTableBody brukere={tableBrukere} aktivEnhet={aktivEnhet} />
		    }
	    </div>
    );
};
