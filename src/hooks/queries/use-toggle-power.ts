import { PATHS } from "./../../utils/api/api";
import useApi from "../use-api";
import { SUPPORTED_TYPES } from "./../../types";

function endpointResolver(type: SUPPORTED_TYPES) {
	switch (type) {
		case "PHILIPS": {
			return PATHS.philips.change;
		}
		case "NANOLEAF": {
			return PATHS.nanoleaf.state;
		}
	}
}
export default function useTogglePower(type: SUPPORTED_TYPES, options: RequestInit) {
	useApi(endpointResolver(type), type, options);
}
