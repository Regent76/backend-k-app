class ConsoleLoggerService {
  assert(assert, message) {
    if (!assert) {
      this.trace(message);
    }
  }

  trace(message) {
    console.trace(`[${new Date().toString()}] [INFO] ${message}`);
  }

  log(message) {
    console.log(`[${new Date().toString()}] [INFO] ${message}`);
  }

  warn(message) {
    console.warn(`[${new Date().toString()}] [WARN] ${message}`);
  }

  error(message) {
    console.error(`[${new Date().toString()}] [ERROR] ${message}`);
  }
}

export default ConsoleLoggerService;
