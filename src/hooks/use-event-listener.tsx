import { useEffect } from 'react';

export function useEventListener<K extends keyof DocumentEventMap>(
	eventName: K,
	handleEvent: (event: DocumentEventMap[K]) => void
) {
	useEffect(() => {
		document.addEventListener(eventName, handleEvent, false);

		return () => {
			document.removeEventListener(eventName, handleEvent, false);
		};
	}, [eventName, handleEvent]);
}
