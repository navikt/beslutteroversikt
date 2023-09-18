class Environment {
	get isLocal() {
		return process.env.REACT_APP_DEPLOYMENT_ENV === 'local';
	}

	get isDevelopment() {
		return process.env.REACT_APP_DEPLOYMENT_ENV === 'development';
	}

	get isProduction() {
		return process.env.REACT_APP_DEPLOYMENT_ENV === 'production';
	}
}

const env = new Environment();

export default env;
