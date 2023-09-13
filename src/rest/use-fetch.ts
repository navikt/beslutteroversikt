import { useCallback, useMemo, useState } from 'react';
import { FetchInfo, FetchState, FetchStatus } from './utils';

export interface Fetch<D = any, FP = any> extends FetchState<D> {
	fetch: (fetchParams: FP, onFinished?: (fetchState: FetchState<D>) => void) => void;
	reset: () => void;
}

const createInitialFetchState = (): FetchState => ({
	status: FetchStatus.NOT_STARTED,
	error: null,
	data: null as any,
	httpCode: -1
});

const createPendingFetchState = (): FetchState => ({
	status: FetchStatus.PENDING,
	error: null,
	data: null as any,
	httpCode: -1
});

const createFinishedFetchState = <D = {}>(data: D | null, error: any | null, httpCode: number): FetchState<D> => ({
	status: FetchStatus.FINISHED,
	error,
	data: data as D,
	httpCode
});

const useFetch = <D = {}, FP = any>(createFetchInfo: (fetchParams: FP) => FetchInfo): Fetch<D, FP> => {
	const [fetchState, setFetchState] = useState<FetchState<D>>(createInitialFetchState());

	const apiFetch = (fetchParams: FP, onFinished?: (fetchState: FetchState<D>) => void) => {
		const fetchInfo = createFetchInfo(fetchParams);
		const { url, ...restInfo } = fetchInfo;

		setFetchState(createPendingFetchState());

		fetch(url, restInfo)
			.then(async res => {
				const httpCode = res.status;
				let state: FetchState<D>;

				if ([200, 201, 203, 206].includes(httpCode)) {
					try {
						const data = await res.text();

						if (data !== '' && data !== null) {
							const deserializedData = await res.json();

							state = createFinishedFetchState(deserializedData, null, httpCode);
						} else {
							state = createFinishedFetchState(null as any, null, httpCode);
						}
					} catch (error) {
						state = createFinishedFetchState(null as any, error, httpCode);
					}
				} else {
					state = createFinishedFetchState(null as any, null, httpCode);
				}

				return state;
			})
			.catch(error => {
				return createFinishedFetchState(null as any, error, -1);
			})
			.then(state => {
				if (onFinished) {
					onFinished(state);
				}

				setFetchState(state);
			});
	};

	const apiFetchCallback = useCallback(apiFetch, [createFetchInfo]);
	const resetCallback = useCallback(() => setFetchState(createInitialFetchState()), []);

	return useMemo(() => {
		return { ...fetchState, fetch: apiFetchCallback, reset: resetCallback };
	}, [fetchState, apiFetchCallback, resetCallback]);
};

export default useFetch;
