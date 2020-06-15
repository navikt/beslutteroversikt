import React from 'react';
import StoreProvider from './stores/store-provider';
import { Header } from './components/header/header';
import { InternflateDecorator } from './components/internflate-decorator/internflate-decorator';
import { Hovedside } from './hovedside/hovedside';
import { DataFetcher } from './components/datafetcher';
import { useDataFetcherStore } from './stores/data-fetcher-store';
import { PTO_VEDTAKSSTOTTE_PILOT } from './rest/feature';
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
	const { featuresFetcher } = useDataFetcherStore();
	const erPilotTogglePa = featuresFetcher.data[PTO_VEDTAKSSTOTTE_PILOT];

	return !erPilotTogglePa ? (
		<PrelanseringInfoSide />
	) : (
		<>
			<Header />
			<Hovedside />
		</>
	);
}

export default App;
