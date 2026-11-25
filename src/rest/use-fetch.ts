import { useCallback, useMemo, useState } from 'react';
import { FetchInfo, FetchState, FetchStatus } from './utils';

export interface Fetch<Data = unknown, FetchParams = unknown> extends FetchState<Data> {
	fetch: (fetchParams: FetchParams, onFinished?: (fetchState: FetchState<Data>) => void) => void;
	reset: () => void;
}

const createInitialFetchState = <Data>(): FetchState<Data> => ({
	status: FetchStatus.NOT_STARTED,
	error: null,
	data: null as unknown as Data,
	httpCode: -1
});

const createPendingFetchState = <Data>(): FetchState<Data> => ({
	status: FetchStatus.PENDING,
	error: null,
	data: null as unknown as Data,
	httpCode: -1
});

const createFinishedFetchState = <Data = {}>(
	data: Data | null,
	error: unknown,
	httpCode: number
): FetchState<Data> => ({
	status: FetchStatus.FINISHED,
	error,
	data: data as Data,
	httpCode
});

const useFetch = <Data = {}, FetchParams = unknown>(
	createFetchInfo: (fetchParams: FetchParams) => FetchInfo
): Fetch<Data, FetchParams> => {
	const [fetchState, setFetchState] = useState<FetchState<Data>>(createInitialFetchState<Data>());

	const apiFetchCallback = useCallback(
		(fetchParams: FetchParams, onFinished?: (fetchState: FetchState<Data>) => void) => {
			const fetchInfo = createFetchInfo(fetchParams);
			const { url, ...restInfo } = fetchInfo;

			setFetchState(createPendingFetchState<Data>());

			fetch(url, restInfo)
				.then(async res => {
					const httpCode = res.status;
					let state: FetchState<Data>;

					if ([200, 201, 203, 206].includes(httpCode)) {
						try {
							const data = await res.text();

							if (data !== '' && data !== null) {
								const deserializedData = JSON.parse(data);

								state = createFinishedFetchState<Data>(deserializedData, null, httpCode);
							} else {
								state = createFinishedFetchState<Data>(null, null, httpCode);
							}
						} catch (error) {
							state = createFinishedFetchState<Data>(null, error, httpCode);
						}
					} else {
						state = createFinishedFetchState<Data>(null, null, httpCode);
					}

					return state;
				})
				.catch(error => {
					return createFinishedFetchState<Data>(null, error, -1);
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
	const resetCallback = useCallback(() => setFetchState(createInitialFetchState<Data>()), []);

	return useMemo(() => {
		return { ...fetchState, fetch: apiFetchCallback, reset: resetCallback };
	}, [fetchState, apiFetchCallback, resetCallback]);
};

export default useFetch;
