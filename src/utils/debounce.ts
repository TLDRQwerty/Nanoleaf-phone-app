export default function debounce<F extends Function>(func: F, timeout = 300) {
	let timer: null | NodeJS.Timeout = null;
	return (...args: any[]) => {
		if (timer != null) {
			clearTimeout(timer);
		}
		timer = setTimeout(() => {
			func.apply(this, args);
		}, timeout);
	};
}
