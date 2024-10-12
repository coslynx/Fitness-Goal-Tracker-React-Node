import { LogLevel } from '../../../domain/common/LogLevel'; // import: src/core/domain/common/LogLevel.ts
import { LoggerConfig } from '../../../infrastructure/database/config'; // import: src/core/infrastructure/database/config.ts

export class Logger {
  private logLevel: LogLevel;

  constructor(config: LoggerConfig) {
    this.logLevel = config.logLevel;
  }

  log(level: LogLevel, message: string, ...args: any[]): void {
    if (level >= this.logLevel) {
      const timestamp = new Date().toISOString();
      const formattedMessage = `[${timestamp}] [${level}] ${message}`;
      console.log(formattedMessage, ...args);
    }
  }

  debug(message: string, ...args: any[]): void {
    this.log(LogLevel.Debug, message, ...args);
  }

  info(message: string, ...args: any[]): void {
    this.log(LogLevel.Info, message, ...args);
  }

  warn(message: string, ...args: any[]): void {
    this.log(LogLevel.Warn, message, ...args);
  }

  error(message: string, ...args: any[]): void {
    this.log(LogLevel.Error, message, ...args);
  }
}