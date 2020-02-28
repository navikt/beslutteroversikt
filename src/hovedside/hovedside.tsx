import React from 'react';
import { DataFetcher } from '../components/datafetcher';
import './hovedside.less';
import { StatusFilter } from '../components/status-filter/status-filter';
import { EnhetFilter } from '../components/enhet-filter/enhet-filter';
import { Sokefelt } from '../components/sokefelt/sokefelt';

export const Hovedside = () => {
    return (
	    <main className="hovedside">
		    <DataFetcher>
			    <div className="filter-column">
				    <Sokefelt/>
				    <StatusFilter/>
				    <EnhetFilter/>
			    </div>
			    <div className="table-column">
				    <p>TODO</p>
			    </div>
		    </DataFetcher>
	    </main>
    );
};
