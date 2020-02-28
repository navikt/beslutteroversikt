import React from 'react';
import { DataFetcher } from '../components/datafetcher';
import { StatusFilter } from '../components/filter-paneler/status-filter/status-filter';
import { EnhetFilter } from '../components/filter-paneler/enhet-filter/enhet-filter';
import { Sokefelt } from '../components/sokefelt/sokefelt';
import { UserTable } from '../components/user-table/user-table';
import { FilterEtiketter } from '../components/filter-etiketter/filter-etiketter';
import { useFilteredUsersStore } from '../stores/filtered-users-store';
import './hovedside.less';

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
