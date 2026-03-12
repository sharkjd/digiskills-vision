/** Vrátí absolutní cestu k assetu z public/ bez basePath prefixu. */
export function asset(path: string): string {
  return path.startsWith("/") ? path : `/${path}`;
}
