class Environment {
	hostname: string;

	constructor() {
		this.hostname = window.location.hostname;
	}

	get isLocal() {
		return import.meta.env.MODE === 'lokal';
	}

	get isDevelopment() {
		return import.meta.env.MODE === 'development';
	}

	get isProduction() {
		return import.meta.env.MODE === 'production';
	}
}

const env = new Environment();

export default env;
