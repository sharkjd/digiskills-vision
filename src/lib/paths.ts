/**
 * Base path pro statický export na FTP (musí odpovídat basePath v next.config).
 * Použij pro všechny cesty k obrázkům a statickým souborům z public/.
 */
export const BASE_PATH = "/vize";

/** Vrátí cestu k assetu s basePath (pro obrázky, favicon, atd.) */
export function asset(path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${BASE_PATH}${p}`;
}
