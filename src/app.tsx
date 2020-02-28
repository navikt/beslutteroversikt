import React from 'react';
import { DataFetcher } from './components/datafetcher';
import StoreProvider from './stores/store-provider';
import './app.less';

function App() {
	return (
		<main>
			<StoreProvider>
				<DataFetcher>
					<p>Hello world</p>
				</DataFetcher>
			</StoreProvider>
		</main>
	);
}

export default App;
