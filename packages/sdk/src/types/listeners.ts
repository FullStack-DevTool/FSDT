import {
  FsdtLogMessageContent,
  FsdtServerMessage,
} from '@fullstack-devtool/core';

export type OnLogReceived = (
  message: FsdtServerMessage<FsdtLogMessageContent>
) => void;

export type OnBatchLogsReceived = (
  messages: FsdtServerMessage<FsdtLogMessageContent>[]
) => void;
