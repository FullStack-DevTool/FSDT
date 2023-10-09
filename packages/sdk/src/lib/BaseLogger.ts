import {
  EventType,
  FsdtLogMessage,
  FsdtMessage,
  LogLevel,
} from '@fullstack-devtool/core';
import {
  client as WebSocketClient,
  connection as WsConnection,
} from 'websocket';
import { FsdtServerConfig, OnLogReceived } from '../types';

const DEFAULT_CONNECTION_TYPE = 'source';
const DEFAULT_DOMAIN_NAME = 'localhost';

export abstract class BaseLogger {
  private _client: WebSocketClient;
  private _connection: WsConnection | null = null;
  private _isConnected = false;
  private _waitingQueue: FsdtMessage<FsdtLogMessage>[] = [];
  private _name: string;
  private _config: FsdtServerConfig;

  private _onLogReceived: OnLogReceived | null = null;

  private _reconnectionDelay = 1000;

  constructor(name: string, config: FsdtServerConfig) {
    this._config = config;
    this._name = name;
    this._client = new WebSocketClient();

    this._client.on('connect', this.onConnect.bind(this));

    this._client.on('connectFailed', (error) => {
      console.error(error);
      // Try to reconnect
      this.tryReconnection();
    });

    this.connect();
  }
  /**
   *
   * Add a callback to be called when a log is received from the server (only available for monitor)
   */
  onLogReceived(callback: (message: FsdtMessage<FsdtLogMessage>) => void) {
    if (this._config.connectionType !== 'monitor') {
      throw new Error('onLogReceived is only available for monitor');
    }
    this._onLogReceived = callback;
  }

  private onConnect(connection: WsConnection) {
    this._isConnected = true;
    this._connection = connection;

    this.processWaitingQueue();

    this._connection.on('message', (message) => {
      if (message.type !== 'utf8') {
        return;
      }

      const data = JSON.parse(message.utf8Data!);

      if (data.type === EventType.SHARED_LOG && this._onLogReceived) {
        this._onLogReceived(data);
      }
    });

    this._connection.on('close', () => {
      this._isConnected = false;
      this.tryReconnection();
    });
  }

  protected displayLog(level: LogLevel, log: any) {
    if (this._config.useConsole === false) {
      return;
    }

    const handlers = {
      [LogLevel.LOG]: console.log,
      [LogLevel.DEBUG]: console.debug,
      [LogLevel.ERROR]: console.error,
      [LogLevel.INFO]: console.info,
      [LogLevel.WARN]: console.warn,
    };
    const handler = handlers[level];

    if (!handler) {
      throw new Error(`Unknown log level: ${level}`);
    }

    handler(log);
  }

  protected sendLog(level: LogLevel, log: any) {
    const logData: FsdtMessage<FsdtLogMessage> = {
      type: EventType.LOG,
      data: {
        timestamp: new Date().toUTCString(),
        level,
        content: log,
      },
    };

    // If we are not connected, we push the log to the waiting queue
    if (!this._isConnected || !this._connection) {
      this._waitingQueue.push(logData);
      return;
    }

    this._connection.sendUTF(JSON.stringify(logData));
  }

  private connect() {
    this._client.connect(
      `ws://${this._config.domainName || DEFAULT_DOMAIN_NAME}:${
        this._config.port
      }/`,
      'echo-protocol',
      '',
      {
        'fsdt-connection-type':
          this._config.connectionType || DEFAULT_CONNECTION_TYPE,
        'fsdt-connection-name': this._name,
      }
    );
  }

  private tryReconnection() {
    // Try to reconnect
    setTimeout(() => {
      this.connect();
    }, this._reconnectionDelay);
  }

  private processWaitingQueue() {
    this._waitingQueue.forEach((logData) => {
      this._connection!.sendUTF(JSON.stringify(logData));
    });

    this._waitingQueue = [];
  }
}
