import { Bruker } from '../rest/data/bruker';
import { isEmpty } from './index';
import { Enhet } from '../rest/data/innlogget-veileder';
import { Filters } from '../stores/sok-store';

export const hasFilters = (filters: Filters): boolean => {
	return (
		!isEmpty(filters.fnrOrName) ||
		(filters.enheter && filters.enheter.length > 0) ||
		filters.status != null ||
		filters.visMineBrukere
	);
};

export const filterUsers = (filters: Filters, users: Bruker[]): Bruker[] => {
	let filteredUsers = [...users];

	if (!isEmpty(filters.fnrOrName)) {
		filteredUsers = filteredUsers.filter(u => matchesFnrOrName(filters.fnrOrName, u));
	}

	if (filters.enheter.length > 0) {
		filteredUsers = filteredUsers.filter(u => matchesEnheter(filters.enheter, u));
	}

	if (filters.status) {
		filteredUsers = filteredUsers.filter(u => filters.status === u.status);
	}

	return filteredUsers;
};

const matchesEnheter = (enheter: Enhet[], bruker: Bruker): boolean => {
	return enheter.find(enhet => enhet.enhetId === bruker.brukerOppfolgingsenhetId) != null;
};

const matchesFnrOrName = (fnrOrName: string, bruker: Bruker): boolean => {
	const brukerNavn = bruker.brukerFornavn + ' ' + bruker.brukerEtternavn;
	return bruker.brukerFnr.includes(fnrOrName) || brukerNavn.toLowerCase().includes(fnrOrName.toLowerCase());
};
