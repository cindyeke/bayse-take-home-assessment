type RelatedMarket = {
  id: string;
  image: string;
  title: string;
  chance: number;
  label?: string;
};

const markets: RelatedMarket[] = [
  {
    id: "1",
    image: "/marketimage.png",
    title: "Will Rema Relese HEIS Delux by January?",
    chance: 18,
  },
  {
    id: "2",
    image: "/marketimage.png",
    title: "Best African Act Grammy Award Winner?",
    chance: 40,
    label: "Wizkid",
  },
  {
    id: "3",
    image: "/marketimage.png",
    title: "Wizkid's Morayo to Chart on Billboard Hot 100?",
    chance: 20,
  },
];

const RelatedMarkets = () => {
  return (
    <div>
      <h2 className="text-dark-blue-30 text-[20px] font-semibold mb-8">
        Related Markets
      </h2>

      <div className="flex flex-col gap-y-8">
        {markets.map((market) => (
          <div key={market.id} className="flex items-center gap-x-[18px]">
            <img
              src={market.image}
              alt={market.title}
              className="w-[50px] h-[50px] rounded-full object-cover shrink-0"
            />

            <div>
              <p className="text-dark-blue-80 font-semibold mb-1 text-[14px]">
                {market.title}
              </p>

              <div className="flex items-center gap-2">
                <span className="bg-azure-blue/6 text-azure-blue text-[11.61px] font-medium px-3 py-1 rounded-full">
                  {market.chance}% Chance
                </span>

                {market.label && (
                  <span className="flex items-center gap-2 text-dark-blue-70 text-xs">
                    <span className="w-1 h-1 rounded-full bg-dark-blue-70"></span>
                    {market.label}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedMarkets;
