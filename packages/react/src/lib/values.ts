// Test if a valye is numeric
export function isNumeric(value: any): Boolean {
  if (!value) return false;
  return !!String(value).match(/^\d+$/);
}
