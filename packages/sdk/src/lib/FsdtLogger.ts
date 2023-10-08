import { LogLevel } from "@fullstack-devtool/core";
import { BaseLogger } from "./BaseLogger";

export class FsdtLogger extends BaseLogger {
  log(content: any) {
    this.displayLog(LogLevel.LOG, content);
    this.sendLog(LogLevel.LOG, content);
  }
  info(content: any) {
    this.displayLog(LogLevel.INFO, content);
    this.sendLog(LogLevel.INFO, content);
  }

  debug(content: any) {
    this.displayLog(LogLevel.DEBUG, content);
    this.sendLog(LogLevel.DEBUG, content);
  }

  warn(content: any) {
    this.displayLog(LogLevel.WARN, content);
    this.sendLog(LogLevel.WARN, content);
  }

  error(content: any) {
    this.displayLog(LogLevel.ERROR, content);
    this.sendLog(LogLevel.ERROR, content);
  }
}