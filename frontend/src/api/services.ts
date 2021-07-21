import { post } from './client';
import config from '../config';

export async function login(email: string, password: string): Promise<any> {
  return post(`${config.api.url}/user/login`, { email, password });
}
