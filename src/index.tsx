import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import env from './utils/environment';
import * as dayjs from 'dayjs';
import 'dayjs/locale/nb';

dayjs.locale('nb');

if (env.isDevelopment) {
	require('./mock');
}

ReactDOM.render(<App />, document.getElementById('root'));
