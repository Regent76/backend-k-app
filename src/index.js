import dotenv from 'dotenv';
import container from './container';

dotenv.config({
    debug: true,
    path: `./.env`,
});

container.resolve("httpServer").start();
container.resolve("apiController").attach();
