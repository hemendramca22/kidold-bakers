import { BusinessProfile } from "@/types/business";

/**
 * Hero Visual Media Configuration
 * Featuring an original high-res editorial demonstration concept asset
 * until real kitchen photography from the bakery counter is provided.
 */
export const heroMediaConfig = {
  authenticPhotoSrc: "/images/hero/hero-celebration-cake.jpg",
  altText: "Artisanal two-tier celebration cake with chocolate ganache and golden swirls — KidOld Bakers Jaunpur",
  isConceptAsset: true,
};

/**
 * Verified Business Details from live KidOld Bakers source (sites.google.com/view/kidoldbakers)
 */
export const businessData: BusinessProfile = {
  name: "KidOld Bakers",
  legalName: "KidOld Bakers",
  tagline: "Where Legacy Meets Indulgence",
  secondaryTagline: "You Imagine. We Bake.",
  motto: "Crafting Sweet Memories",
  addressLine: "Dev Palace, 2, Line Bazaar Rd",
  landmark: "beside S.P Aawas / Front Police Line Gate",
  area: "Husainabad",
  city: "Jaunpur",
  state: "Uttar Pradesh",
  country: "India",
  pincode: "222002",
  phoneDisplay: "093109 71535",
  phoneRaw: "+919310971535",
  whatsappNumber: "919310971535",
  email: "kidoldbakers@gmail.com",
  openingHoursDisplay: "Counter Pickups & Enquiries Open Daily (Call or WhatsApp to confirm hours)",
  serviceOverview: "Counter Pickups at Dev Palace, Line Bazaar & Local Jaunpur Celebration Delivery Enquiries",
  googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=KidOld+Bakers+Dev+Palace+Line+Bazaar+Rd+Husainabad+Jaunpur+222002",
  socials: {
    instagram: "https://instagram.com/kidoldbakers",
    facebook: "https://facebook.com/kidoldbakers",
  },
  promises: [
    {
      id: "pure-veg",
      title: "100% Vegetarian Bakery",
      description: "Dedicated 100% pure vegetarian cakes, pastries, and treats crafted with pure ingredients.",
      icon: "eggless",
    },
    {
      id: "handcrafted-daily",
      title: "100% Handcrafted Artistry",
      description: "Old-world baking recipes paired with modern celebration designs, baked in small batches.",
      icon: "handcrafted",
    },
    {
      id: "legacy-indulgence",
      title: "Where Legacy Meets Indulgence",
      description: "Intergenerational warmth in every bite, bringing grandparents and kids together.",
      icon: "fresh",
    },
    {
      id: "jaunpur-heart",
      title: "Jaunpur's Sweet Heart",
      description: "Conveniently located at Dev Palace, Line Bazaar Rd, beside S.P Aawas, Husainabad.",
      icon: "local",
    },
  ],
};
