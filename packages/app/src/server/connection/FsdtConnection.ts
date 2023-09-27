import { ConnectionType } from "@fullstack-devtool/core";
import { connection } from "websocket";

export class FsdtConnection {
	constructor(
		private _connection: connection,
		private _type: ConnectionType,
		private _name: string = ""
	) {}

	get connection() {
		return this._connection;
	}

	get name() {
		return this._name;
	}

  get type() {
    return this._type;
  }
}
