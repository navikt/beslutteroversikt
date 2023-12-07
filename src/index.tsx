import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import env from './utils/environment';
import * as dayjs from 'dayjs';
import 'dayjs/locale/nb';
import './index.less';
import './utils.less';
import '@navikt/ds-css';

dayjs.locale('nb');

const renderApp = () => ReactDOM.render(<App />, document.getElementById('root'));

const renderMockedApp = () => {
	if (window.location.pathname === process.env.PUBLIC_URL) {
		window.location.pathname = `${process.env.PUBLIC_URL}/`;
		return;
	}

	const { worker } = require('./mock');
	worker.start({ serviceWorker: { url: process.env.PUBLIC_URL + '/mockServiceWorker.js' } }).then(() => renderApp());
};

if (env.isLocal) {
	renderMockedApp();
} else {
	renderApp();
}
