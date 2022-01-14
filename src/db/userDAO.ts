import knex from 'knex';
import { config as knexConfig } from './config';
import User from '../models/user';

export async function getUsers() {
  const knexInstance = knex(knexConfig);

  try {
    const users = await knexInstance<User>('user').select();
    return users;
  } catch (e) {
    console.log('Error: ' + e);
  }
}
