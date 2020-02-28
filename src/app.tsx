import React from 'react';
import { DataFetcher } from './components/datafetcher';
import StoreProvider from './stores/store-provider';
import { Header } from './components/header/header';

function App() {
	return (
		<StoreProvider>
			<Header />
			<main>
				<DataFetcher>
					<p />
				</DataFetcher>
			</main>
		</StoreProvider>
	);
}

export default App;
