export const tags = [
  "all",
  "purposeful",
  "necessary",
  "distracting",
  "unnecessary",
] as const;

export function isRealTag(tag: string): boolean {
  return tags.includes(tag as any);
}
