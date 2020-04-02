import React from 'react';
import { Bruker } from '../../rest/data/bruker';
import { UserTableHeader } from './header/user-table-header';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { UserTableBody } from './body/user-table-body';
import './user-table.less';
import { OrderByData } from './table-utils';

export const UserTable = (props: { brukere: Bruker[] }) => {
	const { brukere } = props;

	if (brukere.length === 0) {
		return (
			<AlertStripeInfo className="user-table__no-users">
                Fant ingen brukere
			</AlertStripeInfo>
		);
	}

	function handleOnOrderByChanged(orderByData: OrderByData) {

	}

    return (
    	<section className="user-table">
		    <UserTableHeader onOrderByChanged={handleOnOrderByChanged} />
			<UserTableBody brukere={brukere} />
	    </section>
    );
};
