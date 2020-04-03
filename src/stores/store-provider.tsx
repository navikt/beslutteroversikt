import React from 'react';
import { useFetchStore } from './fetch-store';
import { useSokStore } from './sok-store';

import { ChildrenProps } from '../utils/types/children-props';

const StoreProvider = (props: ChildrenProps) => {
	return (
		<useFetchStore.Provider>
			<useSokStore.Provider>
				{props.children}
			</useSokStore.Provider>
		</useFetchStore.Provider>
	);
};

export default StoreProvider;
