import { Any, EventType, FsdtLogMessageContent, FsdtSourceMessage, LogLevel } from '../types'

export function createSourceLog(level: LogLevel, content: Any): FsdtSourceMessage<FsdtLogMessageContent> {
  return {
    type: EventType.LOG,
    data: {
      content,
      timestamp: new Date().toUTCString(),
      level,
    },
  }
}
