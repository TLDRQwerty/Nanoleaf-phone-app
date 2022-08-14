import {
	useQuery as useBaseQuery,
	useMutation as useBaseMutation,
	UseQueryOptions,
} from "@tanstack/react-query";
import useConnectionStore, {INTEGRATIONS} from "~/store/use-connection-store";

const pathResolver: {
	[key in INTEGRATIONS]: (
		ipAddress: string,
		authToken: string,
		path: string,
	) => string;
} = {
	nanoleaf: (ipAddress, authToken, path) =>
		`http://${ipAddress}:16021/api/v1/${authToken}/${path}`,
	philips: (ipAddress, authToken, path) =>
		`http://${ipAddress}/api/${authToken}/${path}`,
};

export function useQuery<TResponse>(
	key: string[],
	type: INTEGRATIONS,
	path: string,
	options: UseQueryOptions,
) {
	const [ipAddress, authToken] = useConnectionStore(s => [
		s[type].ip,
		s[type].authToken,
	]);
	return useBaseQuery<TResponse, unknown, TResponse>(
		[key],
		async () => {
			const response = await fetch(
				pathResolver[type](ipAddress, authToken, path),
				{method: "get"},
			);
			return response.json();
		},
		options,
	);
}

export function useMutation(
	type: INTEGRATIONS,
	path: string,
	method: string,
	body: object,
	options,
) {
	const [ipAddress, authToken] = useConnectionStore(s => [
		s[type].ip,
		s[type].authToken,
	]);
	return useBaseMutation(() => {
		return fetch(pathResolver[type](ipAddress, authToken, path), {
			method,
			body: JSON.stringify(body),
		});
	}, options);
}
