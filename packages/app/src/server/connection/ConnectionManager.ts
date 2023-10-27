import { ConnectionType } from "@fullstack-devtool/core";
import { FsdtConnection } from "./FsdtConnection";

class ConnectionManager {
  private _monitor: FsdtConnection | null = null;
  private _sources: FsdtConnection[] = [];

  register(connection: FsdtConnection) {
    const type = connection.type;
    if (type === ConnectionType.MONITOR) {
      if (this._monitor) {
        this._monitor.connection.close();
      }
      this._monitor = connection;
    } else if (type === ConnectionType.SOURCE) {
      this._sources.push(connection);
    }
  }

  unregister(connection: FsdtConnection) {
    connection.connection.close();

    if (this._monitor === connection) {
      this._monitor = null;
    } else {
      const sourceToRemove = this._sources.find(
        (source) => source === connection
      );
      if (!sourceToRemove) throw new Error("Source not found");

      this._sources = this._sources.filter((source) => source !== connection);
    }
  }

  getAll() {
    return {
      monitor: this._monitor,
      sources: this._sources,
    };
  }

  get monitor() {
    return this._monitor;
  }

  get sources() {
    return this._sources;
  }
}

export default new ConnectionManager();
