export function isJsonParseable(value: any) {
  try {
    JSON.parse(value);
    return true;
  } catch (error) {
    return false;
  }
}
