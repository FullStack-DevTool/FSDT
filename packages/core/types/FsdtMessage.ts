import { EventType } from "./EventType";
import { LogLevel } from "./LogLevel";

export type FsdtMessage<T = any> = {
  type: EventType;
  data: T;
}

export type FsdtServerMessage = FsdtMessage & {
  source: string
}

export type FsdtLogMessage = {
  content: string;
  timestamp: number;
  level: LogLevel;
  tag?: string;
}

export type FsdtErrorMessage = {
  error: string;
  timestamp: number;
}