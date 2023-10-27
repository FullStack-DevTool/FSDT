import { Any, LogLevel } from '@fullstack-devtool/core';
import { BaseLogger } from './BaseLogger';

export class FsdtLogger extends BaseLogger {
  log(content: Any) {
    this.displayLog(LogLevel.LOG, content);
    this.sendLog(LogLevel.LOG, content);
  }
  info(content: Any) {
    this.displayLog(LogLevel.INFO, content);
    this.sendLog(LogLevel.INFO, content);
  }

  debug(content: Any) {
    this.displayLog(LogLevel.DEBUG, content);
    this.sendLog(LogLevel.DEBUG, content);
  }

  warn(content: Any) {
    this.displayLog(LogLevel.WARN, content);
    this.sendLog(LogLevel.WARN, content);
  }

  error(content: Any) {
    this.displayLog(LogLevel.ERROR, content);
    this.sendLog(LogLevel.ERROR, content);
  }
}
