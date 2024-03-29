export type FetchInfo = RequestInit & { url: string };

export enum FetchStatus {
	NOT_STARTED = 'NOT_STARTED',
	PENDING = 'PENDING',
	FINISHED = 'FINISHED'
}

export interface FetchState<D = any> {
	status: FetchStatus;
	error: any;
	data: D;
	httpCode: number;
}

export function erGCP(): boolean {
	return window.location.hostname.endsWith('intern.nav.no') || window.location.hostname.endsWith('intern.dev.nav.no');
}

export const isAnyNotStartedOrPending = (fetch: FetchState | FetchState[]): boolean => {
	if (Array.isArray(fetch)) {
		return fetch.some(f => isNotStartedOrPending(f));
	}

	return isNotStartedOrPending(fetch);
};

export const hasAnyFailed = (fetch: FetchState | FetchState[]): boolean => {
	if (Array.isArray(fetch)) {
		return fetch.some(f => hasFailed(f));
	}

	return hasFailed(fetch);
};

export const isNotStarted = (fetch: FetchState): boolean => {
	return fetch.status === FetchStatus.NOT_STARTED;
};

export const isNotStartedOrPending = (fetch: FetchState): boolean => {
	return fetch.status === FetchStatus.NOT_STARTED || fetch.status === FetchStatus.PENDING;
};

export const hasFinished = (fetch: FetchState): boolean => {
	return fetch.status === FetchStatus.FINISHED;
};

export const hasFinishedWithData = (fetch: FetchState): boolean => {
	return hasFinished(fetch) && hasData(fetch);
};

export const hasFailed = (fetch: FetchState): boolean => {
	return fetch.error != null || fetch.httpCode >= 400;
};

export const hasData = (fetch: FetchState): boolean => {
	return fetch.data != null;
};
