class Environment {
	hostname: string;

	constructor() {
		this.hostname = window.location.hostname;
	}

	get isLocal() {
		return this.hostname.includes('localhost');
	}

	get isDevelopment() {
		return this.hostname.includes('intern.dev.nav.no');
	}

	get isProduction() {
		return this.hostname.includes('intern.nav.no');
	}
}

const env = new Environment();

export default env;
