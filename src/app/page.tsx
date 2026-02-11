import MuseumHero from "../components/MuseumHero";
import FeaturedEras from "../components/FeaturedEras";
import NewArrivals from "../components/NewArrivals";
import TrendingNow from "../components/TrendingNow";
import Assurance from "../components/Assurance";

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-bg">
      <MuseumHero />
      <div className="py-12 md:py-20">
        <TrendingNow />
      </div>
      <NewArrivals />
      <Assurance />
    </div>
  );
}
