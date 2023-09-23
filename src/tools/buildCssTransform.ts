export function buildCssTransform(obj: Record<string, string | number>) {
  return Object.entries(obj)
    .map(([key, value]) => `${key}(${value})`)
    .join(' ');
}
