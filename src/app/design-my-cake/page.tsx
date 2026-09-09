import { Metadata } from "next";
import { CustomCakeTeaser } from "@/components/sections/CustomCakeTeaser";

export const metadata: Metadata = {
  title: "Design My Cake | KidOld Bakers Jaunpur",
  description:
    "Design your custom celebration cake in 4 simple steps with KidOld Bakers in Jaunpur. Choose your sponge base, filling, occasion theme, and send your brief directly to our chef.",
};

export default function DesignMyCakePage() {
  return (
    <div className="pt-4 sm:pt-8">
      <CustomCakeTeaser />
    </div>
  );
}
