import {
  EventType,
  FsdtLogMessage,
  FsdtMessage,
  LogLevel,
} from '@fullstack-devtool/core';

import Ws from 'ws';
import { FsdtServerConfig, OnLogReceived } from '../types';
import { stringifyHeaders } from './utils/stringifyHeaders';

const DEFAULT_CONNECTION_TYPE = 'source';
const DEFAULT_DOMAIN_NAME = 'localhost';

export abstract class BaseLogger {
  private _client: Ws | WebSocket | null = null;
  private _isConnected = false;
  private _waitingQueue: FsdtMessage<FsdtLogMessage>[] = [];
  private _name: string;
  private _config: FsdtServerConfig;

  private _onLogReceived: OnLogReceived | null = null;

  private _reconnectionDelay = 1000;

  constructor(name: string, config: FsdtServerConfig) {
    this._config = config;
    this._name = name;

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
    if (!this._isConnected || !this._client) {
      this._waitingQueue.push(logData);
      return;
    }

    this._client?.send(JSON.stringify(logData));
  }

  /**
   * Initiate the connection to the server.
   * It uses the WebSocket API if the Logger is used in browser, otherwise it uses the ws package
   */
  private connect() {
    const url = `ws://${this._config.domainName || DEFAULT_DOMAIN_NAME}:${
      this._config.port
    }/`;
    const headers = {
      'fsdt-connection-type':
        this._config.connectionType || DEFAULT_CONNECTION_TYPE,
      'fsdt-connection-name': this._name,
    };

    if (typeof window !== 'undefined') {
      this._client = new window.WebSocket(
        url + stringifyHeaders(headers),
        'echo-protocol'
      );
    } else {
      this._client = new Ws(url, {
        protocol: 'echo-protocol',
        headers,
      });
    }

    this._client.onopen = () => {
      this.onConnect();
    };

    this._client.onmessage = (message: MessageEvent) => {
      const data = JSON.parse(message.toString());

      if (data.type === EventType.SHARED_LOG && this._onLogReceived) {
        this._onLogReceived(data);
      }
    };

    this._client.onclose = () => {
      this._isConnected = false;
      this.tryReconnection();
    };

    this._client.onerror = (error: Event) => {
      console.error(error);
      // Try to reconnect
      this.tryReconnection();
    };
  }
  private onConnect() {
    this._isConnected = true;
    this.processWaitingQueue();
  }

  private tryReconnection() {
    // Try to reconnect
    setTimeout(() => {
      this.connect();
    }, this._reconnectionDelay);
  }

  private processWaitingQueue() {
    this._waitingQueue.forEach((logData) => {
      this._client!.send(JSON.stringify(logData));
    });

    this._waitingQueue = [];
  }
}
