const quickLinks = [
  "FAQs",
  "Blog",
  "Tutorials",
  "Help Center",
  "Referral Program",
];
const legalLinks = [
  "Privacy Policy",
  "Terms of Service",
  "Prohibition Policies",
  "Dispute Resolution Policy",
];
const companyLinks = ["About Us", "Careers", "Contact Us"];

const Footer = () => {
  return (
    <footer className="w-full h-[500px]">
      <div className="h-[197px] bg-off-white" />
      <div className="bg-azure-blue">
        <div className="relative">
          <img
            src="/eclipsebackground.png"
            alt="eclipse background"
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
          <div className="max-w-[1440px] mx-auto px-[90px] text-white">
            <div className="h-[287.19px]"></div>
            <div className="grid grid-cols-[1.3fr_1fr_1fr_1fr_1fr] gap-x-[60px] pb-10">
              <div className="mr-[87px]">
                <img src="/icons/bayse-logo-white.svg" alt="Bayse" />
                <a
                  href="#"
                  className="text-xs underline underline-offset-2 inline-block mb-[34px]"
                >
                  Formerly Gowagr
                </a>
                <p className="text-xs text-light-blue-20 leading-relaxed mb-6 w-[260px]">
                  The future of prediction markets in Africa. Trade the future,
                  and turn your insights into profit.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-[14px] mb-5 text-white">
                  Quick Links
                </h3>
                <ul className="flex flex-col gap-[18px] text-xs text-light-blue-20">
                  {quickLinks.map((link) => (
                    <li key={link}>
                      <a href="#">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-5">Legal</h3>
                <ul className="flex flex-col gap-y-[18px] text-sm text-light-blue-20">
                  {legalLinks.map((link) => (
                    <li key={link}>
                      <a href="#">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-5">Company</h3>
                <ul className="flex flex-col gap-y-[18px] text-sm text-light-blue-20">
                  {companyLinks.map((link) => (
                    <li key={link}>
                      <a href="#">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-5 text-white">Contact</h3>
                <div className="flex flex-col gap-4 text-xs text-light-blue-20">
                  <a
                    href="mailto:support@growagr.com"
                    className="underline underline-offset-2"
                  >
                    support@growagr.com
                  </a>
                  <p>8 The Green, Ste A, Dover County of Kent, 19901.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-white/20 py-8">
          <div className="max-w-[1440px] mx-auto px-[90px] text-light-blue-10">
            <p className="text-[13px] mb-6">
              Prediction markets involve financial risk—only trade with funds
              you can afford to lose. Bayse Markets does not provide investment
              or financial advice. All market outcomes are resolved
              transparently using publicly verifiable sources. Participation is
              restricted to individuals 18 years and older and may be limited in
              some jurisdictions. Please review our Terms of Service, Privacy
              Policy, and Prohibition Policy before using the platform.
            </p>
            <p className="text-sm font-bold text-white">
              © 2026 Bayse. All Right Reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
