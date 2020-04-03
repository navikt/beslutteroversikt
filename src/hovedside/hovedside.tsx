import React from 'react';
import { DataFetcher } from '../components/datafetcher';
import { UserTable } from '../components/user-table/user-table';
import { Filters } from '../components/filters/filters';
import { useFetchStore } from '../stores/fetch-store';
import './hovedside.less';
import Spinner from '../components/felles/spinner/spinner';
import Show from '../components/felles/show';
import { hasFinished, isNotStartedOrPending } from '../rest/utils';

export const Hovedside = () => {
	const { brukere } = useFetchStore();

    return (
	    <main className="hovedside">
		    <DataFetcher>
			    <div className="hovedside__innhold">
				    <Filters />
				    {/*<FilterEtiketter/>*/}
				    <Show if={isNotStartedOrPending(brukere)}>
				        <Spinner />
				    </Show>
				    <Show if={hasFinished(brukere)}>
					    <UserTable brukere={brukere.data}/>
				    </Show>
			    </div>
		    </DataFetcher>
	    </main>
    );
};
