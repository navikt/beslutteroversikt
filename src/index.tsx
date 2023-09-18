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

if (env.isLocal) {
	require('./mock');
}

ReactDOM.render(<App />, document.getElementById('root'));
