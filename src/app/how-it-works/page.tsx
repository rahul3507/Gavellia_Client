import type { Metadata } from "next";
import HowItWorksRanderPage from "@/components/HowItWorksPageComponents/HowItWorksRanderPage";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "Learn how Gavellia works. Step-by-step guide for buyers and sellers to participate in live and timed auctions for premium goods.",
};

const HowItWorksPage = () => {
  return (
    <div>
      <HowItWorksRanderPage />
    </div>
  );
};

export default HowItWorksPage;
