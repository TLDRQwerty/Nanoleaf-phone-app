type ApiOptions = {
	method: "GET" | "POST" | "PUT";
	body?: Object;
};

async function api<R extends Object | Array<Object>>(url: string, options: RequestInit): Promise<R | null> {
	console.log({ url, options });
	const response = await fetch(url, options);

	if (response.ok) {
		if (response.status === 200) {
			return response.json();
		} else {
			return null;
		}
	}
	return null;
}

export default api;
