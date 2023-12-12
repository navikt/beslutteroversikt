import { createRoot } from 'react-dom/client';
import App from './app';
import env from './utils/environment';
import * as dayjs from 'dayjs';
import 'dayjs/locale/nb';
import './index.less';
import './utils.less';
import '@navikt/ds-css';

dayjs.locale('nb');

const renderApp = () => createRoot(document.getElementById('root')!).render(<App />);

if (env.isLocal) {
	//@ts-ignore
	const { worker } = await import('/src/mock/index');
	worker
		.start({ serviceWorker: { url: `${import.meta.env.BASE_URL}mockServiceWorker.js` } })
		.then(() => {
			renderApp();
		})
		.catch((e: Error) => {
			console.error('Unable to setup mocked API endpoints', e);
		});
} else {
	renderApp();
}
