import {
  FsdtLogMessageContent,
  FsdtServerMessage,
} from '@fullstack-devtool/core';

export type OnLogReceived = (
  message: FsdtServerMessage<FsdtLogMessageContent>
) => void;
