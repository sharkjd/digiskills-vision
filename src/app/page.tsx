import { redirect } from "next/navigation";

/**
 * Úvodní stránka – přesměrování na Moje kurzy.
 * Stránka Moje kurzy slouží jako hlavní vstupní bod aplikace.
 */
export default function Home() {
  redirect("/moje-kurzy");
}
