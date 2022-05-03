import { PATHS } from "../../use-api";
import useApi from "../../use-api";
import { Room } from "../../../utils/api/PhilipsTypes";

export default function useInfo() {
	const response = useApi(PATHS.philips.devices, "PHILIPS", { method: "GET" });
	console.log(response)
	return [response];
}
