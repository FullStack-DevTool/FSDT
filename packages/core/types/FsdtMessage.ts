import { EventType } from "./EventType";

export type FsdtMessage<T = any> = {
  type: EventType;
  data: T;
}

export type FsdtServerMessage = FsdtMessage & {
  source: string
}

export type FsdtLogMessage = {
  log: string;
  timestamp: number;
  tag?: string;
}

export type FsdtErrorMessage = {
  error: string;
  timestamp: number;
}