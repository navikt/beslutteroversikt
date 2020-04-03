import React from 'react';
import { useDataFetcherStore } from './data-fetcher-store';
import { useSokStore } from './sok-store';

import { ChildrenProps } from '../utils/types/children-props';

const StoreProvider = (props: ChildrenProps) => {
	return (
		<useDataFetcherStore.Provider>
			<useSokStore.Provider>
				{props.children}
			</useSokStore.Provider>
		</useDataFetcherStore.Provider>
	);
};

export default StoreProvider;
