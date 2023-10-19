import { EventType } from "./EventType";
import { LogLevel } from "./LogLevel";

export type FsdtSourceMessage<T = any> = {
  type: EventType;
  data: T;
};

export type FsdtServerMessage<T = any> = FsdtSourceMessage<T> & {
  source: string;
};

export type FsdtLogMessageContent = {
  content: string;
  timestamp: string;
  level: LogLevel;
  tag?: string;
};

export type FsdtErrorMessageContent = {
  error: string;
  timestamp: number;
};
