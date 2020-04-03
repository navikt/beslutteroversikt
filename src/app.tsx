import React from 'react';
import StoreProvider from './stores/store-provider';
import { Header } from './components/header/header';
import { InternflateDecorator } from './components/internflate-decorator/internflate-decorator';
import { Hovedside } from './hovedside/hovedside';
import { SokSync } from './components/sok-sync';

function App() {
	return (
		<StoreProvider>
			<InternflateDecorator />
			<Header />
			<Hovedside />
			<SokSync />
		</StoreProvider>
	);
}

export default App;
