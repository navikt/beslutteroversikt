import { Filters } from '../stores/filter-store';
import { Bruker } from '../rest/data/bruker';
import { isEmpty } from './index';

export const hasFilters = (filters: Filters): boolean => {
	return !isEmpty(filters.fnrOrName);
};

export const filterUsers = (filters: Filters, users: Bruker[]): Bruker[] => {
	let filteredUsers = [...users];

	if (!isEmpty(filters.fnrOrName)) {
		filteredUsers = filteredUsers.filter(u => matchesFnrOrName(filters.fnrOrName, u));
	}

	return filteredUsers;
};

const matchesFnrOrName = (fnrOrName: string, bruker: Bruker): boolean => {
	const brukerNavn = bruker.fornavn + ' ' + bruker.etternavn;
	return bruker.fnr.includes(fnrOrName) || brukerNavn.toLowerCase().includes(fnrOrName.toLowerCase());
};
