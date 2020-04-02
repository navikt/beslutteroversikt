import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import env from './utils/environment';
import * as dayjs from 'dayjs';
import 'dayjs/locale/nb';
import './index.less';

dayjs.locale('nb');

// Bruk mock i testmiljøet til vi har fått backend på plass
if (true || env.isDevelopment) {
	require('./mock');
}

ReactDOM.render(<App />, document.getElementById('root'));
