import React from 'react';
import StoreProvider from './stores/store-provider';
import { Header } from './components/header/header';
import { InternflateDecorator } from './components/internflate-decorator/internflate-decorator';
import { Hovedside } from './hovedside/hovedside';
import { PrelanseringSjekk } from './prelansering-side/prelansering-sjekk';

function App() {
	return (
		<StoreProvider>
			<InternflateDecorator />
			<PrelanseringSjekk>
				<Header />
				<Hovedside />
			</PrelanseringSjekk>
		</StoreProvider>
	);
}

export default App;
