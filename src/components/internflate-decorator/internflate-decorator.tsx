import React from 'react';
import NAVSPA from '@navikt/navspa';
import { DecoratorConfig } from './internflate-decorator-config';
import { erGCP } from '../../rest/utils';
import { DecoratorPropsV3, Enhet, Environment } from './internflate-decorator-v3-config';

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
		onFnrChanged: () => {}
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

export const getEnv = (): EnvConfig => {
	const { hostname } = window.location;
	if (hostname.includes('intern.dev.nav.no')) return Env.dev;
	if (hostname.includes('ansatt.dev.nav.no')) return Env.ansattDev;
	if (hostname.includes('intern.nav.no')) return Env.prod;
	return Env.local;
};

interface EnvConfig {
	ingressType: 'ansatt' | 'intern';
	type: EnvType;
}

export enum EnvType {
	prod = 'prod',
	dev = 'dev',
	local = 'local'
}

const Env = {
	ansattDev: { ingressType: 'ansatt', type: EnvType.dev },
	dev: { ingressType: 'intern', type: EnvType.dev },
	prod: { ingressType: 'intern', type: EnvType.prod },
	local: { ingressType: 'intern', type: EnvType.local }
} as const;
