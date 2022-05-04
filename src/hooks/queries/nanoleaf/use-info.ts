import { Info } from "../../../utils/api/NanoleafTypes";
import useApi, { PATHS } from "../../use-api";

export default function useInfo() {
	const [response] = useApi<Info>(PATHS.nanoleaf.info, "NANOLEAF", { method: "GET" });
	if (response == null) {
		return null;
	}
	return response;
}
