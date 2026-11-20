import { describe, expect, it } from "bun:test";
import { formatCents } from "@/lib/cents";

describe("formatCents", () => {
  it("formats whole, fractional and negative amounts", () => {
    expect(formatCents(1234)).toBe("12.34");
    expect(formatCents(5)).toBe("0.05");
    expect(formatCents(-250)).toBe("-2.50");
  });

  it("rejects fractions of a cent", () => {
    expect(() => formatCents(1.5)).toThrow(RangeError);
  });
});
