import React from 'react';
import { useFetchStore } from './fetch-store';
import { useFilterStore } from './filter-store';
import { useFilteredUsersStore } from './filtered-users-store';

import { ChildrenProps } from '../utils/types/children-props';

const StoreProvider = (props: ChildrenProps) => {
	return (
		<useFilteredUsersStore.Provider>
			<useFetchStore.Provider>
				<useFilterStore.Provider>
					{props.children}
				</useFilterStore.Provider>
			</useFetchStore.Provider>
		</useFilteredUsersStore.Provider>
	);
};

export default StoreProvider;
