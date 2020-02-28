import React from 'react';
import StoreProvider from './stores/store-provider';
import { Header } from './components/header/header';
import { InternflateDecorator } from './components/internflate-decorator/internflate-decorator';
import { Hovedside } from './hovedside/hovedside';
import { FilterSync } from './components/filter-sync';

function App() {
	return (
		<StoreProvider>
			<InternflateDecorator />
			<Header />
			<Hovedside />
			<FilterSync />
		</StoreProvider>
	);
}

export default App;
