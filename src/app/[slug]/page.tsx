"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import CtaBanner from "@/components/CtaBanner";
import Footer from "@/components/Footer";
import MarketDetailGrid from "@/components/MarketDetailGrid";
import NavBar from "@/components/NavBar";

export default function MarketPage() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="relative">
        <div className="max-w-[1440px] mx-auto">
          <div className="pt-3 mb-[99.43px] px-[120px]">
            <NavBar />
            <MarketDetailGrid />
          </div>

          <div className="relative">
            <CtaBanner />
          </div>
        </div>
        <Footer />
      </div>
    </QueryClientProvider>
  );
}
