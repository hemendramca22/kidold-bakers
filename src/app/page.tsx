import { HeroSection } from "@/components/sections/HeroSection";
import { TrustBadges } from "@/components/sections/TrustBadges";
import { CategorySection } from "@/components/sections/CategorySection";
import { SignatureSection } from "@/components/sections/SignatureSection";
import { CustomCakeTeaser } from "@/components/sections/CustomCakeTeaser";
import { StorySection } from "@/components/sections/StorySection";
import { LocalBusinessSection } from "@/components/sections/LocalBusinessSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustBadges />
      <CategorySection />
      <SignatureSection />
      <CustomCakeTeaser />
      <StorySection />
      <LocalBusinessSection />
    </>
  );
}
