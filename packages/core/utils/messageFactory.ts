import {
  Any,
  EventType,
  FsdtErrorMessageContent,
  FsdtLogMessageContent,
  FsdtMessage,
  FsdtServerMessage,
  LogLevel,
} from '../types'

export function createSourceLog(level: LogLevel, content: Any): FsdtMessage<FsdtLogMessageContent> {
  return {
    type: EventType.LOG,
    data: {
      content,
      timestamp: new Date().toUTCString(),
      level,
    },
  }
}

export function createServerLog(source: string, data: Any): FsdtServerMessage {
  return {
    type: EventType.SHARED_LOG,
    source: source,
    data,
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
