import React from 'react';
import StoreProvider from './stores/store-provider';
import { Header } from './components/header/header';
import { InternflateDecorator } from './components/internflate-decorator/internflate-decorator';
import { Hovedside } from './hovedside/hovedside';
import { DataFetcher } from './components/datafetcher';
import { useDataFetcherStore } from './stores/data-fetcher-store';
import { PRELANSERING_INFO_OM_LOSNING_TOGGLE } from './rest/feature';
import { Prelansering } from './prelansering-side/prelansering';

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
	const erPrelanseringPa = featuresFetcher.data[PRELANSERING_INFO_OM_LOSNING_TOGGLE];

	return erPrelanseringPa ? (
		<Prelansering />
	) : (
		<>
			<Header />
			<Hovedside />
		</>
	);
}

export default App;
