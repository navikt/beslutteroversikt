import React from 'react';
import { DataFetcher } from '../components/datafetcher';
import { StatusFilterPanel } from '../components/filter-paneler/status-filter-panel/status-filter-panel';
import { EnhetFilterPanel } from '../components/filter-paneler/enhet-filter-panel/enhet-filter-panel';
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
			    <div className="hovedside__innhold">
				    <div className="filter-column">
					    <Sokefelt/>
					    <StatusFilterPanel/>
					    <EnhetFilterPanel/>
				    </div>
				    <div className="table-column">
					    <FilterEtiketter/>
					    <UserTable brukere={filteredUsers}/>
				    </div>
			    </div>
		    </DataFetcher>
	    </main>
    );
};
