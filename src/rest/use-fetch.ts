import { useCallback, useMemo, useState } from 'react';
import { FetchInfo, FetchState, FetchStatus } from './utils';

export interface Fetch<D = unknown, FP = unknown> extends FetchState<D> {
	fetch: (fetchParams: FP, onFinished?: (fetchState: FetchState<D>) => void) => void;
	reset: () => void;
}

const createInitialFetchState = <D>(): FetchState<D> => ({
	status: FetchStatus.NOT_STARTED,
	error: null,
	data: null as unknown as D,
	httpCode: -1
});

const createPendingFetchState = <D>(): FetchState<D> => ({
	status: FetchStatus.PENDING,
	error: null,
	data: null as unknown as D,
	httpCode: -1
});

const createFinishedFetchState = <D = {}>(data: D | null, error: unknown, httpCode: number): FetchState<D> => ({
	status: FetchStatus.FINISHED,
	error,
	data: data as D,
	httpCode
});

const useFetch = <D = {}, FP = unknown>(createFetchInfo: (fetchParams: FP) => FetchInfo): Fetch<D, FP> => {
	const [fetchState, setFetchState] = useState<FetchState<D>>(createInitialFetchState<D>());

	const apiFetchCallback = useCallback(
		(fetchParams: FP, onFinished?: (fetchState: FetchState<D>) => void) => {
			const fetchInfo = createFetchInfo(fetchParams);
			const { url, ...restInfo } = fetchInfo;

			setFetchState(createPendingFetchState<D>());

			fetch(url, restInfo)
				.then(async res => {
					const httpCode = res.status;
					let state: FetchState<D>;

					if ([200, 201, 203, 206].includes(httpCode)) {
						try {
							const data = await res.text();

							if (data !== '' && data !== null) {
								const deserializedData = JSON.parse(data);

								state = createFinishedFetchState<D>(deserializedData, null, httpCode);
							} else {
								state = createFinishedFetchState<D>(null, null, httpCode);
							}
						} catch (error) {
							state = createFinishedFetchState<D>(null, error, httpCode);
						}
					} else {
						state = createFinishedFetchState<D>(null, null, httpCode);
					}

					return state;
				})
				.catch(error => {
					return createFinishedFetchState<D>(null, error, -1);
				})
				.then(state => {
					if (onFinished) {
						onFinished(state);
					}

					setFetchState(state);
				});
		},
		[createFetchInfo]
	);
	const resetCallback = useCallback(() => setFetchState(createInitialFetchState<D>()), []);

	return useMemo(() => {
		return { ...fetchState, fetch: apiFetchCallback, reset: resetCallback };
	}, [fetchState, apiFetchCallback, resetCallback]);
};

export default useFetch;
