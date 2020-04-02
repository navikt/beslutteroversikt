import { Filters, StatusFilter } from '../stores/filter-store';
import { Bruker, UtkastStatus } from '../rest/data/bruker';
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

	if (filters.status !== StatusFilter.ALLE) {
		filteredUsers = filteredUsers.filter(u => matchesStatusFilter(filters.status, u));
	}

	return filteredUsers;
};

const matchesStatusFilter = (status: StatusFilter, bruker: Bruker): boolean => {
	if (status === StatusFilter.VENTER_PA_VEILEDER && bruker.status === UtkastStatus.VENTER_PA_VEILEDER) {
		return true;
	} else if (status === StatusFilter.VENTER_PA_BESLUTTER && bruker.status === UtkastStatus.VENTER_PA_BESLUTTER) {
		return true;
	} else if (status === StatusFilter.KLAR_TIL_UTSENDING && bruker.status === UtkastStatus.KLAR_TIL_UTSENDING) {
		return true;
	}

	return false;
};

const matchesEnheter = (enheter: Enhet[], bruker: Bruker): boolean => {
	return enheter.find(enhet => enhet.enhetId === bruker.oppfolgingsenhetId) != null;
};

const matchesFnrOrName = (fnrOrName: string, bruker: Bruker): boolean => {
	const brukerNavn = bruker.fornavn + ' ' + bruker.etternavn;
	return bruker.fnr.includes(fnrOrName) || brukerNavn.toLowerCase().includes(fnrOrName.toLowerCase());
};
