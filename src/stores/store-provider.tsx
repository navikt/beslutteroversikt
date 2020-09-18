import React from 'react';
import { DataFetcherStoreProvider } from './data-fetcher-store';
import { SokStoreProvider } from './sok-store';
import { ChildrenProps } from '../utils/types/children-props';
import { SokSync } from '../components/sok-sync';

const StoreProvider = (props: ChildrenProps) => {
	return (
		<DataFetcherStoreProvider>
			<SokStoreProvider>
				{props.children}
				<SokSync />
			</SokStoreProvider>
		</DataFetcherStoreProvider>
	);
};

export default StoreProvider;
