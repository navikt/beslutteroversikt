import React from 'react';
import NAVSPA from '@navikt/navspa';
import { DecoratorConfig } from './internflate-decorator-config';
import { erGCP } from '../../rest/utils';

const Decorator: React.ComponentType<DecoratorConfig> = NAVSPA.importer<DecoratorConfig>('internarbeidsflatefs');

export function InternflateDecorator() {
	return (
		<nav>
			<Decorator {...lagDecoratorConfig()} />
		</nav>
	);
}

function lagDecoratorConfig(): DecoratorConfig {
	return {
		appname: 'Arbeidsrettet oppfølging',
		toggles: {
			visVeileder: true
		},
		useProxy: erGCP()
	};
}
