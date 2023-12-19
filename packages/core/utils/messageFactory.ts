import {
  Any,
  EventType,
  FsdtErrorMessageContent,
  FsdtLogMessageContent,
  FsdtMessage,
  FsdtServerMessage,
  LogLevel,
} from '../types'

export function createSourceLog(level: LogLevel, content: Any, tag?: string): FsdtMessage<FsdtLogMessageContent> {
  return {
    type: EventType.LOG,
    data: {
      content,
      timestamp: new Date().toISOString(),
      level,
      tag,
    },
  }
}

export function createServerLog(source: string, data: Any, id: number): FsdtServerMessage {
  return {
    type: EventType.SHARED_LOG,
    source: source,
    data,
    id,
  }
}

export function createErrorMessage(error: string): FsdtMessage<FsdtErrorMessageContent> {
  return {
    type: EventType.ERROR,
    data: {
      error,
      timestamp: new Date().toUTCString(),
    },
  }
}
