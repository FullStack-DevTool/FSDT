import { Any, LogLevel } from '@fullstack-devtool/core';
import { BaseLogger } from './BaseLogger';

export class FsdtLogger extends BaseLogger {
  log(content: Any, tag?: string) {
    this.displayLog(LogLevel.LOG, content);
    this.sendLog(LogLevel.LOG, content, tag);
  }
  info(content: Any, tag?: string) {
    this.displayLog(LogLevel.INFO, content);
    this.sendLog(LogLevel.INFO, content, tag);
  }

  debug(content: Any, tag?: string) {
    this.displayLog(LogLevel.DEBUG, content);
    this.sendLog(LogLevel.DEBUG, content, tag);
  }

  warn(content: Any, tag?: string) {
    this.displayLog(LogLevel.WARN, content);
    this.sendLog(LogLevel.WARN, content, tag);
  }

  error(content: Any, tag?: string) {
    this.displayLog(LogLevel.ERROR, content);
    this.sendLog(LogLevel.ERROR, content, tag);
  }
}
