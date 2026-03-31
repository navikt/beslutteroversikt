import { createRoot } from 'react-dom/client';
import App from './app';
import env from './utils/environment';
import { logMetrikk } from './utils/logger';
import dayjs from 'dayjs';
import 'dayjs/locale/nb';
import './index.less';

dayjs.locale('nb');

const renderApp = () => createRoot(document.getElementById('root')!).render(<App />);

if (env.isLocal) {
	try {
		const { worker } = await import('./mock/index');
		await worker.start({ serviceWorker: { url: `${import.meta.env.BASE_URL}mockServiceWorker.js` } });
	} catch (e) {
		logMetrikk('msw_failed_to_start', {
			message: e instanceof Error ? e.message : String(e)
		});
	}
}

renderApp();
