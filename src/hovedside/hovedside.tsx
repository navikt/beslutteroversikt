import React from 'react';
import { DataFetcher } from '../components/datafetcher';
import { UserTable } from '../components/user-table/user-table';
import { FilterEtiketter } from '../components/filter-etiketter/filter-etiketter';
import { useFilteredUsersStore } from '../stores/filtered-users-store';
import { Filters } from '../components/filters/filters';
import './hovedside.less';

export const Hovedside = () => {
	const { filteredUsers } = useFilteredUsersStore();

    return (
	    <main className="hovedside">
		    <DataFetcher>
			    <div className="hovedside__innhold">
				    <Filters />
				    <FilterEtiketter/>
				    <UserTable brukere={filteredUsers}/>
			    </div>
		    </DataFetcher>
	    </main>
    );
};
