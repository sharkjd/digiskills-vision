import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TopVision",
};

export default function TopVisionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
