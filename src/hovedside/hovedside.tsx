import React from 'react';
import { DataFetcher } from '../components/datafetcher';
import './hovedside.less';
import { StatusFilter } from '../components/status-filter/status-filter';
import { EnhetFilter } from '../components/enhet-filter/enhet-filter';
import { Sokefelt } from '../components/sokefelt/sokefelt';
import { UserTable } from '../components/user-table/user-table';
import { useFetchStore } from '../stores/fetch-store';

export const Hovedside = () => {
	const { brukere } = useFetchStore();

    return (
	    <main className="hovedside">
		    <DataFetcher>
			    <div className="filter-column">
				    <Sokefelt/>
				    <StatusFilter/>
				    <EnhetFilter/>
			    </div>
			    <div className="table-column">
				    <UserTable brukere={brukere.data} />
			    </div>
		    </DataFetcher>
	    </main>
    );
};
