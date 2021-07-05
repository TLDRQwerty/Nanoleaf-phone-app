class Logger {
	static checkForDev() {
		if (!__DEV__) return
	}

	static error(out: any, ...optionalParams: any[]) {
		this.checkForDev()
		console.error()
		console.log(out, ...optionalParams)
	}

	static log(out: any, ...optionalParams: any[]) {
		this.checkForDev()
		console.log(out, ...optionalParams)
	}

	static info(out: any, ...optionalParams: any[]) {
		this.checkForDev()
		console.info(out, ...optionalParams)
	}

	static group(label: string, callback: () => void) {
		this.checkForDev()
		console.group(...label)
		callback();
		console.groupEnd()
	}
}

export default Logger
