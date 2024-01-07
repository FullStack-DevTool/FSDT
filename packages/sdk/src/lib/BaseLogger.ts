import {
  Any,
  createSourceLog,
  FsdtLogMessageContent,
  FsdtMessage,
  FsdtServerMessage,
  isErrorEvent,
  isSharedLogEvent,
  LogLevel,
} from '@fullstack-devtool/core';

import Ws from 'ws';
import { FsdtServerConfig, OnBatchLogsReceived, OnLogReceived } from '../types';
import { stringifyHeaders } from './utils/stringifyHeaders';

const DEFAULT_CONNECTION_TYPE = 'source';
const DEFAULT_DOMAIN_NAME = 'localhost';

export abstract class BaseLogger {
  private _client: Ws | WebSocket | null = null;
  private _isConnected = false;
  private _waitingQueue: FsdtMessage<FsdtLogMessageContent>[] = [];
  private _name: string;
  private _config: FsdtServerConfig;

  private _onLogReceived: OnLogReceived | null = null;

  private _onBatchLogsReceived: OnBatchLogsReceived | null = null;

  private _reconnectionDelay = 1000;

  private _reconnectionTimeout: NodeJS.Timeout | null = null;

  constructor(name: string, config: FsdtServerConfig) {
    this._config = config;
    this._name = name;

    if (!this._config.disable) {
      this.connect();
    }
  }
  /**
   *
   * Add a callback to be called when a log is received from the server (only available for monitor)
   */
  onLogReceived(
    callback: (message: FsdtServerMessage<FsdtLogMessageContent>) => void
  ) {
    if (this._config.connectionType !== 'monitor') {
      throw new Error('onLogReceived is only available for monitor');
    }
    this._onLogReceived = callback;
  }

  /**
   *
   * Add a callback to be called when a batch of logs is received from the server (only available for monitor)
   */
  onBatchLogsReceived(
    callback: (messages: FsdtServerMessage<FsdtLogMessageContent>[]) => void
  ) {
    if (this._config.connectionType !== 'monitor') {
      throw new Error('onBatchLogsReceived is only available for monitor');
    }
    this._onBatchLogsReceived = callback;
  }

  protected displayLog(level: LogLevel, log: Any) {
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

  protected sendLog(level: LogLevel, log: Any, tag?: string) {
    const logData = createSourceLog(level, log, tag);

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
    }`;
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
      // verify if readyStatus is 1 to make sure the connection is open
      if (this._client?.readyState === 1) {
        this.onConnect();
      }
    };

    this._client.onmessage = (message: MessageEvent) => {
      const data = JSON.parse(message.data.toString());

      if (
        Array.isArray(data) &&
        data.every((log) => isSharedLogEvent(log)) &&
        this._onBatchLogsReceived
      ) {
        this._onBatchLogsReceived(data);
      }

      if (isSharedLogEvent(data) && this._onLogReceived) {
        this._onLogReceived(data);
      }

      if (isErrorEvent(data) && this._config.printErrors) {
        console.error(data.data.error);
      }
    };

    this._client.onclose = () => {
      this._isConnected = false;
      this.tryReconnection();
    };

    this._client.onerror = (error: Event) => {
      if (this._config.printErrors) {
        console.error(error);
      }
      // Try to reconnect
      this.tryReconnection();
    };
  }
  private onConnect() {
    this._isConnected = true;
    this.processWaitingQueue();
  }

  private tryReconnection() {
    if (this._reconnectionTimeout) {
      clearTimeout(this._reconnectionTimeout);
    }
    // Try to reconnect
    this._reconnectionTimeout = setTimeout(() => {
      this.connect();
    }, this._reconnectionDelay);
  }

  private processWaitingQueue() {
    // TODO: We should probably send the logs in batch
    this._waitingQueue.forEach((logData) => {
      this._client!.send(JSON.stringify(logData));
    });

    this._waitingQueue = [];
  }
}
