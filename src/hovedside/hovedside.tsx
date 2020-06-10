import React from 'react';
import { DataFetcher } from '../components/datafetcher';
import { UserTable } from '../components/user-table/user-table';
import { Filters } from '../components/filters/filters';
import { PaginationBar } from '../components/pagination-bar/pagination-bar';
import './hovedside.less';

export const Hovedside = () => {
    return (
	    <main className="hovedside">
			    <Filters />
			    {/*<FilterEtiketter/>*/}
			    <div className="hovedside__table">
				    <PaginationBar />
				    <UserTable />
			    </div>
	    </main>
    );
};
