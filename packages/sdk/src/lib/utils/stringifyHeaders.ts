export function stringifyHeaders(headers: Record<string, string>) {
  return Object.entries(headers).reduce((acc, [key, value]) => {
    return `${acc}${key}=${value}&`;
  }, '?');
}
