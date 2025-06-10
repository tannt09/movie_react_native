export function isNullOrEmpty(value: any): boolean {
  // Null or undefined
  if (value === null || value === undefined) return true;

  // Empty string
  if (typeof value === 'string' && value.trim() === '') return true;

  // Empty array
  if (Array.isArray(value) && value.length === 0) return true;

  // Empty object
  if (
    typeof value === 'object' &&
    !Array.isArray(value) &&
    Object.keys(value).length === 0
  )
    return true;

  return false;
}
