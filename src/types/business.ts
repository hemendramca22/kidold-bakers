export interface BusinessProfile {
  name: string;
  legalName: string;
  tagline: string;
  secondaryTagline: string;
  motto: string;
  addressLine: string;
  landmark: string;
  area: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  phoneDisplay: string;
  phoneRaw: string;
  whatsappNumber: string;
  email: string;
  openingHoursDisplay: string;
  serviceOverview: string;
  googleMapsUrl: string;
  socials: {
    instagram: string;
    facebook: string;
    googleBusiness: string;
    googleMaps: string;
    googleReviews: string;
    whatsapp: string;
  };
  promises: Array<{
    id: string;
    title: string;
    description: string;
    icon: "fresh" | "eggless" | "handcrafted" | "local";
  }>;
}
