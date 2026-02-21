import MuseumHero from "../components/MuseumHero";
import QuickCategories from "../components/QuickCategories";
import NewArrivals from "../components/NewArrivals";
import Assurance from "../components/Assurance";
import ShopByCategory from "../components/ShopByCategory";
import FAQ from "../components/FAQ";

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-bg">
      <QuickCategories />
      <MuseumHero />
      <ShopByCategory />
      <NewArrivals />
      <FAQ />
      <Assurance />
    </div>
  );
}
