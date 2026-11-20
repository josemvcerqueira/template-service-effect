/** Money is integer cents. Formats cents as a decimal string, e.g. 1234 → "12.34". */
export function formatCents(cents: number): string {
  if (!Number.isSafeInteger(cents)) {
    throw new RangeError(`Cents must be a safe integer, got ${cents}`);
  }
  const sign = cents < 0 ? "-" : "";
  const abs = Math.abs(cents);
  return `${sign}${Math.trunc(abs / 100)}.${String(abs % 100).padStart(2, "0")}`;
}
