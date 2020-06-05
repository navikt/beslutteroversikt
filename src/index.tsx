import React from 'react';
import ReactDOM from 'react-dom';
import env from './utils/environment';
import * as dayjs from 'dayjs';
import 'dayjs/locale/nb';
import './index.less';
import { PrelanseringInfoSide } from './prelansering-side/prelansering-side';

dayjs.locale('nb');

if (env.isDevelopment) {
	require('./mock');
}

ReactDOM.render(<PrelanseringInfoSide />, document.getElementById('root'));
