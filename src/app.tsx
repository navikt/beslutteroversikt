import React from 'react';
import StoreProvider from './stores/store-provider';

import { InternflateDecorator } from './components/internflate-decorator/internflate-decorator';
import { Hovedside } from './hovedside/hovedside';
import { DataFetcher } from './components/datafetcher';
import { useDataFetcherStore } from './stores/data-fetcher-store';
import { PrelanseringInfoSide } from './prelansering-side/prelansering-side';

function App() {
	return (
		<StoreProvider>
			<InternflateDecorator />
			<DataFetcher>
				<Innhold />
			</DataFetcher>
		</StoreProvider>
	);
}

function Innhold() {
	const { tilhorerVeilederUtrulletKontorFetcher } = useDataFetcherStore();
	const harTilgang = tilhorerVeilederUtrulletKontorFetcher.data;

	return harTilgang ? (
		<>
			<Hovedside />
		</>
	) : (
		<PrelanseringInfoSide />
	);
}

export default App;
