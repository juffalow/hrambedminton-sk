import { post, getWithCredentials } from './client';
import config from '../config';

interface LoginResponse {
  error: unknown;
  data: {
    id: string;
    email: string;
    expiresAt: string;
    token: string;
  };
}

export async function login(email: string, password: string): Promise<LoginResponse> {
  return post(`${config.api.url}/login`, { email, password });
}

interface RefreshTokenResponse {
  error: unknown;
  data: {
    id: string;
    expiresAt: string;
    token: string;
  };
}

export async function refreshToken(playerId: string): Promise<RefreshTokenResponse> {
  return getWithCredentials(`${config.api.url}/refresh-token/${playerId}`);
}