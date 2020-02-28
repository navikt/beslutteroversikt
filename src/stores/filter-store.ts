import createUseContext from 'constate';
import { useState } from 'react';

export const useFilterStore = createUseContext(() => {
	const [fnrOrNameFilter, setFnrOrNameFilter] = useState<string>('');
	const [enheterFilter, setEnheterFilter] = useState<string[]>([]);

	return { fnrOrNameFilter, setFnrOrNameFilter, enheterFilter, setEnheterFilter };
});
