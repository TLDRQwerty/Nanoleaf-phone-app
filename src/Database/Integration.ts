import { StorageKeys } from "./../utils/localStorage";
import { Realm } from "@realm/react";

export class Integration extends Realm.Object {
	_id!: Realm.BSON.ObjectId;
	key!: keyof typeof StorageKeys;
	value!: string;

	static create({ key, value }) {
		return {
			_id: new Realm.BSON.ObjectID(),
			key,
			value,
		};
	}

	static schema = {
		name: "Integration",
		primaryKey: "key",
		properties: {
			_id: "objectId",
			key: "string",
			value: "string",
		},
	};
}
