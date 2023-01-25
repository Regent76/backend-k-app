import { asClass, asValue, createContainer } from 'awilix';

import { knex } from './database';

import ApiController from './controllers/ApiController';
import AuthorRepository from './repositories/AuthorRepository';
import QuoteRepository from './repositories/QuoteRepository';
import TokenRepository from './repositories/TokenRepository';
import UserRepository from './repositories/UserRepository';
import ConsoleLoggerService from './services/infrastructure/ConsoleLoggerService';
import { HttpServerService, routerV1 } from './services/HttpServerService';

const container = createContainer();

container.register('knex', asValue(knex));
container.register('routerV1', asValue(routerV1));

container.register('logger', asClass(ConsoleLoggerService).singleton());
container.register('httpServer', asClass(HttpServerService).singleton());

container.register('authorRepository', asClass(AuthorRepository).singleton());
container.register('quoteRepository', asClass(QuoteRepository).singleton());
container.register('tokenRepository', asClass(TokenRepository).singleton());
container.register('userRepository', asClass(UserRepository).singleton());

container.register('apiController', asClass(ApiController).singleton());

export default container;
