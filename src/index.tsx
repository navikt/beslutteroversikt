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

if (env.isLocal) {
	// require('./mock');
	const { worker } = require('./mock');
	worker.start().then(() => renderApp());
} else {
	renderApp();
}
