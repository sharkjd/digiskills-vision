"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import TopVisionHeader from "@/components/layout/TopVisionHeader";
import TopVisionFooter from "@/components/layout/TopVisionFooter";
import JipkaHeader from "@/components/layout/JipkaHeader";
import JipkaFooter from "@/components/layout/JipkaFooter";

export default function LayoutSwitcher({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isTopVision = pathname?.startsWith("/topvision");
  const isJipka = pathname?.startsWith("/jipka");

  if (isTopVision) {
    return (
      <>
        <TopVisionHeader />
        <main style={{ flex: 1 }}>{children}</main>
        <TopVisionFooter />
      </>
    );
  }

  if (isJipka) {
    return (
      <>
        <JipkaHeader />
        <main style={{ flex: 1 }}>{children}</main>
        <JipkaFooter />
      </>
    );
  }

  return (
    <>
      <Header />
      <main style={{ flex: 1 }}>{children}</main>
      <Footer />
    </>
  );
}
