import { Knex } from 'knex';

const port = process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306;

export const config: Knex.Config = { 
  client: 'mysql',
  connection: {
    host: process.env.DB_HOST,
    port: port,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
  }
};
