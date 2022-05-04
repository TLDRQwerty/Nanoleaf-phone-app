import { PATHS } from "../../use-api";
import useApi from "../../use-api";
import { Light } from "../../../utils/api/PhilipsTypes";

export default function useInfo() {
	const response = useApi<[{ lights: { [key: string]: Light } }]>(PATHS.philips.devices, "PHILIPS", { method: "GET" });
	console.log('philips')
	console.log({ response })
	return response.pop();
}
