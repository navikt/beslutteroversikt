import React, { useEffect } from 'react';
import { DataFetcher } from '../components/datafetcher';
import './hovedside.less';
import { StatusFilter } from '../components/status-filter/status-filter';
import { EnhetFilter } from '../components/enhet-filter/enhet-filter';
import { Sokefelt } from '../components/sokefelt/sokefelt';
import { UserTable } from '../components/user-table/user-table';
import { FilterEtiketter } from '../components/filter-etiketter/filter-etiketter';
import { useFilteredUsersStore } from '../stores/filtered-users-store';

export const Hovedside = () => {
	const { filteredUsers } = useFilteredUsersStore();

    return (
	    <main className="hovedside">
		    <DataFetcher>
			    <div className="filter-column">
				    <Sokefelt/>
				    <StatusFilter/>
				    <EnhetFilter/>
			    </div>
			    <div className="table-column">
				    <FilterEtiketter/>
				    <UserTable brukere={filteredUsers}/>
			    </div>
		    </DataFetcher>
	    </main>
    );
};
