import Footer from "@/components/Footer";
import MarketDetailGrid from "@/components/MarketDetailGrid";
import NavBar from "@/components/NavBar";

export default function MarketPage() {
  return (
    <div className="max-w-7xl mx-auto pt-3">
      <NavBar />
      <MarketDetailGrid />
      <Footer />
    </div>
  );
}
