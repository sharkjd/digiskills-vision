import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jipka",
  description: "Jipka moje jazykovka – kurzy angličtiny",
};

export default function JipkaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
