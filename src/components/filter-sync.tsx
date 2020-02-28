import { useEffect } from 'react';
import { useFetchStore } from '../stores/fetch-store';
import { useFilteredUsersStore } from '../stores/filtered-users-store';
import { useFilterStore } from '../stores/filter-store';
import { hasData } from '../rest/utils';
import { filterUsers, hasFilters } from '../utils/filter-utils';

export const FilterSync = () => {
	const { brukere } = useFetchStore();
	const { setFilteredUsers } = useFilteredUsersStore();
	const { filters } = useFilterStore();

	useEffect(() => {
		if (hasData(brukere) && !hasFilters(filters)) {
			setFilteredUsers(brukere.data);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [brukere]);

	useEffect(() => {
		if (hasData(brukere)) {
			setFilteredUsers(filterUsers(filters, brukere.data));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [filters]);

    return null;
};
