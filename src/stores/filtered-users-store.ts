import { useState } from 'react';
import createUseContext from 'constate';
import { Bruker } from '../rest/data/bruker';

export const useFilteredUsersStore = createUseContext(() => {
	const [filteredUsers, setFilteredUsers] = useState<Bruker[]>([]);
	return { filteredUsers, setFilteredUsers };
});
