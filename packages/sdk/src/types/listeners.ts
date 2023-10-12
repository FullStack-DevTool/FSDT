import { FsdtMessage, FsdtLogMessage } from '@fullstack-devtool/core';

export type OnLogReceived = (message: FsdtMessage<FsdtLogMessage>) => void;
