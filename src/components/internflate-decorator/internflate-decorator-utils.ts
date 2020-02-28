import { OrNothing } from '../../utils/types/ornothing';

export interface Toggles {
	visVeilder: boolean;
	visSokefelt: boolean;
	visEnhetVelger: boolean;
	visEnhet: boolean;
}
export interface Contextholder {
	url: string;
	promptBeforeEnhetChange?: boolean;
}

export interface DecoratorConfig {
	appname: string;
	fnr: OrNothing<string>;
	enhet: OrNothing<string>;
	toggles: Toggles;

	contextholder?: true | Contextholder;
	autoSubmitOnMount?: boolean;
}

export function lagDecoratorConfig(): DecoratorConfig {
	return {
		appname: 'Arbeidsrettet oppfølging',
		fnr: null,
		enhet: null,
		contextholder: true,
		toggles: {
			visEnhet: false,
			visEnhetVelger: false,
			visSokefelt: false,
			visVeilder: true
		}
	};
}