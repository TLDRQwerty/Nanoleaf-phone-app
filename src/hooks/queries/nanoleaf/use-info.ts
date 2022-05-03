import { Info } from "../../../utils/api/NanoleafTypes";
import { PATHS } from "../../../utils/api/api";
import useApi from "../../use-api";

export default function useInfo() {
	const [response] = useApi<Info>(PATHS.nanoleaf.info, "NANOLEAF", { method: "GET" });
	if (response == null) {
		return null;
	}
	return response;
}
