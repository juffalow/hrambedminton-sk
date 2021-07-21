import { GraphQLResolveInfo } from 'graphql';

export function formatDate(date: Date, format = 'yyyy-MM-dd hh:mm:ss'): string {
  const dd = `0${date.getDate() + 1}`.slice(-2);
  const MM = `0${date.getMonth() + 1}`.slice(-2);
  const yy = date.getFullYear().toString().substring(2, 4);
  const yyyy = date.getFullYear().toString();
  const hh = `0${date.getHours()}`.slice(-2);
  const mm = `0${date.getMinutes()}`.slice(-2);
  const ss = `0${date.getSeconds()}`.slice(-2);
  const SSS = `00${date.getMilliseconds()}`.slice(-3);

  return format.replace(/dd/g, dd)
    .replace(/MM/g, MM)
    .replace(/yy/g, yy)
    .replace(/yyyy/g, yyyy)
    .replace(/hh/g, hh)
    .replace(/mm/g, mm)
    .replace(/ss/g, ss)
    .replace(/SSS/g, SSS);
}

export function getDateFormat(info: GraphQLResolveInfo, defaultFormat = 'yyyy-MM-dd hh:mm:ss'): string {
  const directive = info.fieldNodes[0].directives.find(directive => directive.name.value ==='formatDate');

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

export function shouldFilterBy(variable: any): boolean {
  return typeof variable !== 'undefined' && variable !== null;
}
