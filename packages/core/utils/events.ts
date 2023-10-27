import {
  EventType,
  FsdtErrorMessageContent,
  FsdtLogMessageContent,
  FsdtServerMessage,
  FsdtSourceMessage,
} from '../types'

export function isErrorEvent(event: FsdtSourceMessage): event is FsdtServerMessage<FsdtErrorMessageContent> {
  return event.type === EventType.ERROR
}

export function isSharedLogEvent(event: FsdtSourceMessage): event is FsdtServerMessage<FsdtLogMessageContent> {
  return event.type === EventType.SHARED_LOG
}
