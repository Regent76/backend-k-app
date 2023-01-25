import { Model } from 'objection';
import Knex from 'knex';
import dotenv from 'dotenv';

dotenv.config({
  path: './.env'
});

export const knex = Knex({
  client: 'pg',
  connection: {
    host : process.env.DATABASE_HOST,
    port : process.env.DATABASE_PORT,
    database : process.env.DATABASE_NAME,
    user : process.env.DATABASE_USER,
    password : process.env.DATABASE_PASSWORD
  }
});

Model.knex(knex);
