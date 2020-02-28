import React from 'react';
import { useFetchStore } from './fetch-store';
import { useFilterStore } from './filter-store';
import { ChildrenProps } from '../utils/types/children-props';

const StoreProvider = (props: ChildrenProps) => {
	return (
		<useFetchStore.Provider>
			<useFilterStore.Provider>
				{props.children}
			</useFilterStore.Provider>
		</useFetchStore.Provider>
	);
};

export default StoreProvider;
