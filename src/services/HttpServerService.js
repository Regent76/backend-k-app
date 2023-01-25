import http from 'http';

import 'express-async-errors';
import express from 'express';

const routerV1 = express.Router();

class HttpServerService {
  constructor({ logger }) {
    this.logger = logger;
    this.httpServer = undefined;

    this.on = this.on.bind(this);
    this.errorHandler = this.errorHandler.bind(this);
    this.start = this.start.bind(this);
  }

  on(event, handler) {
    return this.httpServer.on(event, handler);
  }

  errorHandler(error, request, response, next) {
    response.status(500).send({
      error: 'Internal server error',
      details: error.toString()
    });
    this.logger.error(error.toString());
    return next(error);
  }

  start() {
    this.logger.log("Starting HttpServerService.");
    const application = express();

    this.httpServer = http.createServer(application);

    application.use('/api/v1', routerV1);
    application.use(this.errorHandler);

    this.logger.log(`Starting listening on ${process.env.PORT} port.`);
    this.httpServer.listen(process.env.PORT);
  }
}

export {
  HttpServerService,
  routerV1
};
