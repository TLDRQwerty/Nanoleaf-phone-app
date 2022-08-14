import create from "zustand";
import {produce} from "immer";
import type {NanoleafResponse} from "~/components/Nanoleaf";
import type {PhilipsResponse} from "~/components/Philips";

interface Integrations {
	nanoleaf: null | NanoleafResponse;
	philips: null | PhilipsResponse;
}

interface State extends Integrations {
	setNanoleaf: (nanoleaf: (draft: Integrations["nanoleaf"]) => void) => void;
	setPhilips: (philips: (draft: Integrations["philips"]) => void) => void;
}

const useIntegrationStore = create<State>()(set => ({
	nanoleaf: null,
	philips: null,
	setNanoleaf: nanoleaf =>
		set(state => ({
			nanoleaf: produce(state.nanoleaf, (i: NanoleafResponse) => {
				return nanoleaf(i);
			}),
		})),
	setPhilips: philips =>
		set(state => ({
			philips: produce(state.philips, (i: PhilipsResponse) => {
				return philips(i);
			}),
		})),
}));

export default useIntegrationStore;
