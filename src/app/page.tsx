import Footer from "@/components/Footer";
import MarketDetailGrid from "@/components/MarketDetailGrid";

export default function MarketPage() {
  return (
    <div className="max-w-7xl mx-auto">
      <nav></nav>
      <main>
        <MarketDetailGrid />
      </main>
      <Footer />
    </div>
  );
}
