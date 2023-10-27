import { EventType, FsdtErrorMessageContent, FsdtLogMessageContent, FsdtMessage, FsdtServerMessage } from '../types'

export function isErrorEvent(event: FsdtMessage): event is FsdtServerMessage<FsdtErrorMessageContent> {
  return event.type === EventType.ERROR
}

export function isSharedLogEvent(event: FsdtMessage): event is FsdtServerMessage<FsdtLogMessageContent> {
  return event.type === EventType.SHARED_LOG
}
