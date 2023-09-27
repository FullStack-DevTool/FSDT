export function safeJsonParse<T>(data: any): T | null {
	try {
		return JSON.parse(data);
	} catch (e) {
		return null;
	}
}

export function safeJsonStringify(data: any): string | null {
  try {
    return JSON.stringify(data);
  } catch (e) {
    return null;
  }
}