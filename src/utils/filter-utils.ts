import { Filters } from '../stores/filter-store';
import { Bruker } from '../rest/data/bruker';
import { isEmpty } from './index';
import { Enhet } from '../rest/data/innlogget-veileder';

export const hasFilters = (filters: Filters): boolean => {
	return !isEmpty(filters.fnrOrName);
};

export const filterUsers = (filters: Filters, users: Bruker[]): Bruker[] => {
	let filteredUsers = [...users];

	if (!isEmpty(filters.fnrOrName)) {
		filteredUsers = filteredUsers.filter(u => matchesFnrOrName(filters.fnrOrName, u));
	}

	if (filters.enheter.length > 0) {
		filteredUsers = filteredUsers.filter(u => matchesEnheter(filters.enheter, u));
	}

	return filteredUsers;
};

const matchesEnheter = (enheter: Enhet[], bruker: Bruker): boolean => {
	return enheter.find(enhet => enhet.enhetId === bruker.oppfolgingsenhetId) != null;
};

const matchesFnrOrName = (fnrOrName: string, bruker: Bruker): boolean => {
	const brukerNavn = bruker.fornavn + ' ' + bruker.etternavn;
	return bruker.fnr.includes(fnrOrName) || brukerNavn.toLowerCase().includes(fnrOrName.toLowerCase());
};
