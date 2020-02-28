import React from 'react';
import { DataFetcher } from './components/datafetcher';
import StoreProvider from './stores/store-provider';
import { Header } from './components/header/header';
import { InternflateDecorator } from './components/internflate-decorator/internflate-decorator';

function App() {
	return (
		<StoreProvider>
			<InternflateDecorator />
			<Header />
			<main>
				<DataFetcher>
					<div>Content goes here</div>
				</DataFetcher>
			</main>
		</StoreProvider>
	);
}

export default App;
