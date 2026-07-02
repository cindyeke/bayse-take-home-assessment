import Footer from "@/components/Footer";
import MarketDetailGrid from "@/components/MarketDetailGrid";
import { BellIcon, BookmarkIcon } from "@heroicons/react/24/outline";

export default function MarketPage() {
  return (
    <div className="max-w-7xl mx-auto pt-3">
      <nav className="flex items-center justify-between py-[14px] pr-[5px]">
        <div className="flex items-center gap-8">
          <img src="/icons/bayse-logo.svg" alt="Bayse" />

          <input
            type="text"
            placeholder="Search bayse..."
            className="w-[400px] font-inter border border-stroke rounded-lg px-4 py-2.5 text-sm text-secondary-gray placeholder:text-secondary-gray"
          />
        </div>

        {/* Right cluster */}
        <div className="flex gap-6 items-center">
          <div className="flex flex-col items-center">
            <p className="text-xs text-secondary-gray mb-0.5 font-medium">
              Portfolio
            </p>
            <p className="text-[16px] font-semibold text-green">₦200k</p>
          </div>

          <div className="flex flex-col items-center">
            <p className="text-xs text-secondary-gray mb-0.5 font-medium">
              Cash
            </p>
            <p className="text-[16px] font-semibold text-green">₦300k</p>
          </div>

          <button className="bg-azure-blue text-white text-[14px] font-semibold leading-5 px-4 py-2 rounded-lg">
            Deposit
          </button>

          <BellIcon className="w-5 h-5 text-slate-500" />
          <BookmarkIcon className="w-5 h-5 text-slate-500" />

          <img
            src="/marketimage.png"
            className="w-9 h-9 rounded-full object-cover"
          />
        </div>
      </nav>
      <main>
        <MarketDetailGrid />
      </main>
      <Footer />
    </div>
  );
}
