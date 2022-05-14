type ApiOptions = {
	method: "GET" | "POST" | "PUT";
	body?: Object;
};

async function api<R, E>(
	url: string,
	options: RequestInit
): Promise<{ json: R | null; error: E | null | string; response: null | Response }> {
	let response = null;
	try {
		response = await fetch(url, options);
		return { json: await response.json(), error: null, response };
	} catch (e) {
		return {
			json: null,
			error: `URL: ${url} \n\n Error: ${String(e)} \n\n Options: ${JSON.stringify(options)}`,
			response: null,
		};
	}
}

export default api;
