import StoreProvider from './stores/store-provider';
import { InternflateDecorator } from './components/internflate-decorator/internflate-decorator';
import { Hovedside } from './hovedside/hovedside';
import { DataFetcher } from './components/datafetcher';
import { useDataFetcherStore } from './stores/data-fetcher-store';
import { PrelanseringInfoSide } from './prelansering-side/prelansering-side';
import { VIS_VEDTAKSLOSNING_14A } from './rest/obo-unleash';

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
	const { tilhorerVeilederUtrulletKontorFetcher, unleashFeaturetoggleFetcher } = useDataFetcherStore();
	const veilederTilhorerUtrulletKontor = tilhorerVeilederUtrulletKontorFetcher.data;
	const toggleForVisVedtakslosningErPaForVeileder = unleashFeaturetoggleFetcher.data[VIS_VEDTAKSLOSNING_14A];

	const visInnholdForNyVedtakslosning14a =
		veilederTilhorerUtrulletKontor || toggleForVisVedtakslosningErPaForVeileder;

	return visInnholdForNyVedtakslosning14a ? <Hovedside /> : <PrelanseringInfoSide />;
}

export default App;
