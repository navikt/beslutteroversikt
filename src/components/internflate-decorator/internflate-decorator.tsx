import * as React from 'react';
import NAVSPA from '@navikt/navspa';
import { DecoratorConfig, lagDecoratorConfig } from './internflate-decorator-utils';
import env from '../../utils/environment';

const Decorator: React.ComponentType<DecoratorConfig> = NAVSPA.importer<DecoratorConfig>('internarbeidsflatefs');

export function InternflateDecorator() {
    const config = lagDecoratorConfig();

    if (env.isDevelopment) {
        return null;
    }

    return (
        <nav>
            <Decorator {...config} />
        </nav>
    );
}
