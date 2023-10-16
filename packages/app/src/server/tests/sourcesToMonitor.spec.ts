import {
  ConnectionType,
  EventType,
  FsdtLogMessage,
  FsdtMessage,
  LogLevel,
} from "@fullstack-devtool/core";
import { initServer } from "..";
import WebSocket from "ws";
import { Server } from "http";

describe("Communication between the sources and the monitor through the server", () => {
  let port: number;
  let server: Server;
  let monitor: WebSocket;
  let source1: WebSocket;
  let source2: WebSocket;

  function setupWsClient(type: ConnectionType, name: string) {
    return new WebSocket(`ws://localhost:${port}/`, {
      protocol: "echo-protocol",
      headers: {
        "fsdt-connection-type": type,
        "fsdt-connection-name": name,
      },
    });
  }

  beforeAll(async () => {
    const res = await initServer();
    port = res.port;
    server = res.server;
    monitor = setupWsClient(ConnectionType.MONITOR, "monitor");
    source1 = setupWsClient(ConnectionType.SOURCE, "source1");
    source2 = setupWsClient(ConnectionType.SOURCE, "source2");

    // Wait for the monitor to be connected
    await Promise.all([
      new Promise((res) => monitor.on("open", res)),
      new Promise((res) => source1.on("open", res)),
      new Promise((res) => source2.on("open", res)),
    ]);
  });

  afterAll(() => {
    server.close();
    source1.close();
    source2.close();
    monitor.close();
  });

  afterEach(() => {
    monitor.removeAllListeners();
    source1.removeAllListeners();
    source2.removeAllListeners();
  });

  it("should send logs from the sources to the monitor", (done) => {
    let counter = 0;
    const log1: FsdtMessage<FsdtLogMessage> = {
      type: EventType.LOG,
      data: {
        timestamp: new Date().toUTCString(),
        level: LogLevel.INFO,
        content: "test",
      },
    };
    const expectedLog1Received = {
      ...log1,
      source: "source1",
      type: EventType.SHARED_LOG,
    };
    const log2: FsdtMessage<FsdtLogMessage> = {
      type: EventType.LOG,
      data: {
        timestamp: new Date().toUTCString(),
        level: LogLevel.INFO,
        content: "test2",
      },
    };
    const expectedLog2Received = {
      ...log2,
      source: "source2",
      type: EventType.SHARED_LOG,
    };

    // Setup the listeners

    monitor.on("message", (event) => {
      const data = JSON.parse(event.toString());

      if (data.data.content === "test") {
        expect(JSON.parse(event.toString())).toEqual(expectedLog1Received);
        counter++;
      }

      if (data.data.content === "test2") {
        expect(JSON.parse(event.toString())).toEqual(expectedLog2Received);
        counter++;
      }

      if (counter === 2) done();
    });

    // Send the logs

    source1.send(JSON.stringify(log1));

    source2.send(JSON.stringify(log2));
  });

  it("should send an error message to the source if the message doesn't contain the expected fields", (done) => {
    const invalidMessage = {
      type: EventType.LOG,
      data: {
        level: LogLevel.INFO,
        log: "test",
      },
    };

    source1.on("message", (event) => {
      const data = JSON.parse(event.toString());
      expect(data.type).toEqual(EventType.ERROR);
      expect(data.data.error).toEqual(
        "The message should have a type, a data.content and a data.timestamp"
      );
      done();
    });

    source1.send(JSON.stringify(invalidMessage));
  });

  it("should send an error message to the source if the message type is not supported", (done) => {
    const invalidMessage = {
      type: "invalid",
      data: {
        timestamp: new Date().toUTCString(),
        level: LogLevel.INFO,
        content: "test",
      },
    };

    source1.on("message", (event) => {
      const data = JSON.parse(event.toString());
      expect(data.type).toEqual(EventType.ERROR);
      expect(data.data.error).toEqual(
        `The message type should be one of ${Object.values(EventType).join(
          ", "
        )}`
      );
      done();
    });

    source1.send(JSON.stringify(invalidMessage));
  });
});

describe("Connection between the source and the server", () => {
  throw new Error("Not implemented yet");
});
