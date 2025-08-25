import StoreProvider from './stores/store-provider';
import { InternflateDecorator } from './components/internflate-decorator/internflate-decorator';
import { Hovedside } from './hovedside/hovedside';
import { DataFetcher } from './components/datafetcher';

function App() {
	return (
		<StoreProvider>
			<InternflateDecorator />
			<DataFetcher>
				<Hovedside />
			</DataFetcher>
		</StoreProvider>
	);
}
export default App;
