import { EventType } from './EventType'
import { LogLevel } from './LogLevel'
import { Any } from './Utils'

export type FsdtMessage<T = Any> = {
  type: EventType
  data: T
}

export type FsdtServerMessage<T = Any> = FsdtMessage<T> & {
  source: string
}

export type FsdtLogMessageContent = {
  content: Any
  timestamp: string
  level: LogLevel
  tag?: string
}

export type FsdtErrorMessageContent = {
  error: string
  timestamp: string
}
