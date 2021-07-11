class Logger {
	static checkForDev() {
		return __DEV__;
	}

	static error(out: any, ...optionalParams: any[]) {
		if (this.checkForDev()) {
			console.error(out, ...optionalParams);
		}
	}

	static log(out: any, ...optionalParams: any[]) {
		if (this.checkForDev()) {
			console.log(out, ...optionalParams);
		}
	}

	static info(out: any, ...optionalParams: any[]) {
		if (this.checkForDev()) {
			console.info(out, ...optionalParams);
		}
	}

	static group(label: string, callback: () => void) {
		if (this.checkForDev()) {
			this.checkForDev();
			console.group(...label);
			callback();
			console.groupEnd();
		}
	}
}

export default Logger;
