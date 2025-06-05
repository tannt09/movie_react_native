export function isNullOrEmpty(value: string): boolean {
  // Null or undefined
  if (value === null || value === undefined) return true;

  // Empty string
  if (value.trim() === '') return true;

  return false;
}
