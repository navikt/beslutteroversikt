import React from 'react';
import NAVSPA from '@navikt/navspa';
import { DecoratorPropsV3, Environment } from './internflate-decorator-v3-config';
import { EnvType, getEnv } from './internflate-decorator-env';

const Decorator: React.ComponentType<DecoratorPropsV3> = NAVSPA.importer<DecoratorPropsV3>(
	'internarbeidsflate-decorator-v3'
);

export function InternflateDecorator() {
	return (
		<nav>
			<Decorator {...lagDecoratorConfig()} />
		</nav>
	);
}

function lagDecoratorConfig(): DecoratorPropsV3 {
	return {
		appName: 'Arbeidsrettet oppfølging',
		proxy: '/modiacontextholder',
		environment: getDecoratorEnv(),
		showEnheter: false,
		showHotkeys: false,
		showSearchArea: false,
		urlFormat: getEnv().ingressType === 'ansatt' ? 'ANSATT' : 'NAV_NO',
		onEnhetChanged: () => {},
		onFnrChanged: () => {},
		enhetSyncMode: 'ignore',
		fnrSyncMode: 'writeOnly'
	};
}

function getDecoratorEnv(): Environment {
	const env = getEnv();
	if (env.type === EnvType.prod) {
		return 'prod';
	} else {
		return 'q2';
	}
}
