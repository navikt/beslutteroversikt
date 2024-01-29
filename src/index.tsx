import { createRoot } from 'react-dom/client';
import App from './app';
import env from './utils/environment';
import * as dayjs from 'dayjs';
import 'dayjs/locale/nb';
import './index.less';
import '@navikt/ds-css';

dayjs.locale('nb');

const renderApp = () => createRoot(document.getElementById('root')!).render(<App />);

if (env.isLocal) {
	import('./mock/index')
		.then(({ worker }) => {
			worker
				.start({ serviceWorker: { url: `${import.meta.env.BASE_URL}mockServiceWorker.js` } })
				.then(() => {
					renderApp();
				})
				.catch((e: Error) => {
					console.error('MSW - failed to start', e);
				});
		})
		.catch(e => console.log('MSW - failed to import', e));
} else {
	renderApp();
}
