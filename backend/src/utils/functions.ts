import { GraphQLResolveInfo } from 'graphql';
import jwt from 'jsonwebtoken';
import config from '../config';

export function formatDate(date: Date, format = 'YYYY-MM-dd HH:mm:ss'): string {
  const year: string = date.getFullYear().toString();
  const month: string = (date.getMonth() + 1).toString();
  const day: string = date.getDate().toString();
  const hours: string = date.getHours().toString();
  const minutes: string = date.getMinutes().toString();
  const seconds: string = date.getSeconds().toString();

  format = format.replace('YYYY', year);
  format = format.replace('MM', ('0' + month).slice(-2));
  format = format.replace('dd', ('0' + day).slice(-2));
  format = format.replace('HH', ('0' + hours).slice(-2));
  format = format.replace('mm', ('0' + minutes).slice(-2));
  format = format.replace('ss', ('0' + seconds).slice(-2));

  return format;
}

export function getDateFormat(info: GraphQLResolveInfo, defaultFormat = 'YYYY-MM-dd HH:mm:ss'): string {
  const directive = info.fieldNodes[0].directives.find(directive => directive.name.value === 'formatDate');

  if (typeof directive === 'undefined') {
    return defaultFormat;
  }

  return (directive.arguments[0].value as any).value;
}

export function getStringId(value: string, name: string): string | null {
  if (typeof value === 'undefined' || value === null) {
    return null;
  }

  const decoded = Buffer.from(value, 'base64').toString();

  if (decoded.startsWith(name)) {
    return decoded.replace(`${name}-`, '');
  }

  return value;
}

export function shouldFilterBy(variable: unknown): boolean {
  return typeof variable !== 'undefined' && variable !== null;
}

export const generateToken = (data: Record<string, unknown>): string => {
  return jwt.sign(data, config.jwt.secret, { algorithm: 'HS512' });
}
