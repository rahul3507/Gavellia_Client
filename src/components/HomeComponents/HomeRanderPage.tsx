import React from 'react'
import ArtAuctionCard from './ArtAuctionCard';
import WatchCollectionCard from './WatchCollectionCard';
import AutomotiveHeroCard from './AutomotiveHeroCard';
import BottomCTACard from './BottomCTACard';
import HomeProductsSection from './HomeProductsSection';

const HomeRanderPage = () => {
  return (
    <div className="px-2 md:px-4 xl:px-6 mb-12">
      {/* this is top banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-2">
        {/* Art Auction */}
        <ArtAuctionCard />

        {/* Watch Collection */}
        <WatchCollectionCard />
      </div>

      {/* Automotive Hero */}
      <AutomotiveHeroCard />

      {/* Product Section */}
      <div className="min-h-90">
      <HomeProductsSection />
      </div>

      {/* Bottom CTA Section */}
      <BottomCTACard />
    </div>
  )
}

export default HomeRanderPage
