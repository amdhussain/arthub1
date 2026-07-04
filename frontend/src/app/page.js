import HeroSection from "@/components/home/HeroSection";
import FeaturedArtworks from "@/components/home/FeaturedArtworks";
import TopArtists from "@/components/home/TopArtists";
import ArtCategories from "@/components/home/ArtCategories";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedArtworks />
      <ArtCategories />
      <TopArtists />
    </>
  );
}
