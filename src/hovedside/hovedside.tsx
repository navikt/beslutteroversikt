import React from 'react';
import { DataFetcher } from '../components/datafetcher';
import { UserTable } from '../components/user-table/user-table';
import { Filters } from '../components/filters/filters';
import './hovedside.less';

export const Hovedside = () => {
    return (
	    <main className="hovedside">
		    <DataFetcher>
			    <div className="hovedside__innhold">
				    <Filters />
				    {/*<FilterEtiketter/>*/}
				    <UserTable />
			    </div>
		    </DataFetcher>
	    </main>
    );
};
