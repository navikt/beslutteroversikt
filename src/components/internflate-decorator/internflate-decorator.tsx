import { EnvType, getEnv } from './internflate-decorator-env';

type Environment = 'q0' | 'q1' | 'q2' | 'q3' | 'q4' | 'prod' | 'local' | 'mock';

export function InternflateDecorator() {
	const urlFormat = getEnv().ingressType === 'ansatt' ? 'ANSATT' : 'NAV_NO';

	return (
		<internarbeidsflate-decorator
			app-name="Arbeidsrettet oppfølging"
			enhet-sync-mode="ignore"
			environment={getDecoratorEnv()}
			fnr-sync-mode="writeOnly"
			proxy="/modiacontextholder"
			url-format={urlFormat}
		/>
	);
}

function getDecoratorEnv(): Environment {
	const env = getEnv();
	if (env.type === EnvType.prod) {
		return 'prod';
	} else if (env.type === EnvType.local) {
		return 'local';
	} else {
		return 'q2';
	}
}
