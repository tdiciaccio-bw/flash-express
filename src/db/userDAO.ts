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

export async function getUserByEmail(email: string) {
  const knexInstance = knex(knexConfig);

  try {
    const user = await knexInstance<User>('user').select().where('email', email).first();
    return user;
  } catch (e) {
    console.log(e);
  }
}
