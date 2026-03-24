import { createRoot } from 'react-dom/client';
import App from './app';
import env from './utils/environment';
import dayjs from 'dayjs';
import 'dayjs/locale/nb';
import './index.less';

dayjs.locale('nb');

const renderApp = () => createRoot(document.getElementById('root')!).render(<App />);

if (env.isLocal) {
	import('./mock/index').then(({ worker }) =>
		worker
			.start({ serviceWorker: { url: `${import.meta.env.BASE_URL}mockServiceWorker.js` } })
			.then(() => renderApp())
	);
} else {
	renderApp();
}
