import { createRealmContext } from "@realm/react";
import { Integration } from "./Integration";

export const config = {
	schema: [Integration],
};

const { RealmProvider, useObject, useQuery, useRealm } = createRealmContext(config);

export { RealmProvider, useObject, useQuery, useRealm, Integration };
