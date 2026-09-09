import { businessData } from "@/data/business";

export interface CustomCakeBrief {
  sponge: string;
  filling: string;
  theme: string;
  weight?: string;
  dietary?: string;
  customNote?: string;
  hasReferenceImage?: boolean;
  referenceImageName?: string;
  aiConceptPrompt?: string;
  aiConceptUrl?: string;
}

/**
 * Generate a pre-filled WhatsApp link for direct customer ordering & inquiries.
 * Routes directly to verified KidOld Bakers number: +91 93109 71535
 */
export function getWhatsAppInquiryUrl(params?: {
  productName?: string;
  categoryName?: string;
  isCustomCake?: boolean;
  customCake?: CustomCakeBrief;
}): string {
  const number = businessData.whatsappNumber;
  let text = `Hello KidOld Bakers! 👋\n\n`;

  if (params?.customCake) {
    const {
      sponge,
      filling,
      theme,
      weight,
      customNote,
      hasReferenceImage,
      referenceImageName,
      aiConceptPrompt,
      aiConceptUrl,
    } = params.customCake;

    text += `*Custom Cake Enquiry*\n\n`;
    text += `*Sponge/Base:*\n${sponge}\n\n`;
    text += `*Filling:*\n${filling}\n\n`;
    text += `*Theme/Decoration:*\n${theme}\n\n`;
    text += `*Preferred Weight/Portions:*\n${weight || "500g (Approx 4–6 servings)"}\n\n`;
    text += `*Cake Message:*\n${customNote && customNote.trim() ? `"${customNote.trim()}"` : "None specified"}\n\n`;

    if (hasReferenceImage) {
      text += `*Reference Image:*\nCustomer has selected a reference image${referenceImageName ? ` (${referenceImageName})` : ""}. (I will attach the image to this chat)\n\n`;
    } else {
      text += `*Reference Image:*\nNo reference image\n\n`;
    }

    if (aiConceptPrompt || aiConceptUrl) {
      text += `*AI Concept:*\n${aiConceptUrl ? aiConceptUrl : `Prompt: "${aiConceptPrompt}"`}\n\n`;
    }

    text += `Please confirm availability, feasibility and final details. 🎂`;
  } else if (params?.isCustomCake) {
    text += `I would like to inquire about designing a *Custom Celebration Cake* for an upcoming occasion in Jaunpur.\n\nPlease confirm availability, feasibility and final details. 🎂`;
  } else if (params?.productName) {
    text += `I would like to check availability and place an order for:\n*${params.productName}* (${params.categoryName || "KidOld Special"}).\n\nPlease confirm counter availability and pickup details.`;
  } else {
    text += `I would like to inquire about today's fresh bakery bakes and place an order at your Jaunpur bakery counter.`;
  }

  const encoded = encodeURIComponent(text);
  return `https://wa.me/${number}?text=${encoded}`;
}


