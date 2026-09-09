import { catalogService } from "@/services/catalogService";
import { businessData } from "@/data/business";

// Factual customizer blueprint options (defined here so server-side route does not import from a "use client" component)
const SPONGE_OPTIONS = [
  { name: "Belgian Dark Chocolate", description: "Rich, moist Dutch cocoa sponge baked with premium melted chocolate.", badge: "Bestseller" },
  { name: "Vanilla Chiffon", description: "Featherlight, airy dairy sponge infused with Madagascar vanilla bean.", badge: "Classic" },
  { name: "Crimson Red Velvet", description: "Velvety cocoa crumb with a tender, moist buttermilk texture.", badge: "Romantic" },
  { name: "Royal Butterscotch", description: "Golden vanilla sponge infused with slow-caramelized brown sugar.", badge: "Kids' Favorite" },
];

const FILLING_OPTIONS = [
  { name: "55% Dark Chocolate Ganache", description: "Velvety Belgian dark fudge made with rich dairy cream.", badge: "Rich & Silky" },
  { name: "Fresh Seasonal Fruit Compote", description: "Handmade fruit reduction with natural sweetness and citrus zing.", badge: "Refreshing" },
  { name: "Salted Caramel & Nut Praline", description: "Buttery caramel layers loaded with crunchy roasted cashews.", badge: "Crunchy" },
  { name: "Philadelphia Cream Cheese Frosting", description: "Fluffy, lightly tangy cream cheese whipped to cloud-like perfection.", badge: "Decadent" },
];

const WEIGHT_OPTIONS = [
  "500g (Approx 4–6 Servings)",
  "1.0kg (Approx 8–12 Servings)",
  "1.5kg (Approx 12–16 Servings)",
  "2.0kg+ (Grand Celebration / Tiered)",
];

/**
 * Generates an up-to-date, factual knowledge context for Baking Buddy.
 * Designed to be async so that when catalogService transitions to a
 * database-backed service (PostgreSQL / Supabase / CMS), this function
 * seamlessly pulls live database records without any caller changes.
 */
export async function getBakeryKnowledgeContext(): Promise<string> {
  // 1. Fetch live catalog products & categories through the catalogService contract
  const [products, categories] = await Promise.all([
    catalogService.getProducts({ activeOnly: true, publishedOnly: true }),
    catalogService.getCategories({ activeOnly: true, publishedOnly: true }),
  ]);

  // 2. Format Category Taxonomy
  const categoriesText = categories
    .map(
      (c) =>
        `- ${c.name} (Slug: ${c.slug}): ${c.tagline}. ${c.description} [${c.itemCountDescription}]${
          c.badge ? ` (Badge: ${c.badge})` : ""
        }`
    )
    .join("\n");

  // 3. Format Signature Products & Treats
  const productsText = products
    .map((p) => {
      const priceInfo = p.priceDisplay || (p.price ? `₹${p.price}` : "Custom Quote / On Request");
      const weights = p.weightOptions?.join(", ") || "500g, 1kg, 2kg+";
      const notes = p.flavorNotes?.join(", ") || "Signature recipe";
      const occasions = p.occasions?.join(", ") || "celebrations";
      const eggless = p.isEgglessAvailable || p.isPureVeg ? "100% Pure Veg / Eggless" : "Standard";
      const bakerNote = p.bakerNote ? ` Note: "${p.bakerNote}"` : "";

      return `* ${p.name} (${p.categoryName || "Cake"}):
  - Description: ${p.shortDescription}
  - Price: ${priceInfo} | Weight options: ${weights}
  - Dietary: ${eggless}
  - Flavor Highlights: ${notes}
  - Ideal for: ${occasions}
  - Stock/Availability: ${p.isAvailable ? "Available to order" : "Pre-order only"}${bakerNote}`;
    })
    .join("\n\n");

  // 4. Format 4-Step Bespoke "Design My Cake" Customizer Knowledge
  const spongeList = SPONGE_OPTIONS.map((s) => `  * ${s.name}: ${s.description} (${s.badge})`).join("\n");
  const fillingList = FILLING_OPTIONS.map((f) => `  * ${f.name}: ${f.description} (${f.badge})`).join("\n");
  const weightList = WEIGHT_OPTIONS.map((w) => `  * ${w}`).join("\n");

  // 5. Assemble Structured Factual Knowledge Context
  return `=== OFFICIAL KIDOLD BAKERS FACTUAL KNOWLEDGE BASE ===
Store Name: ${businessData.name} (${businessData.legalName})
Brand Tagline: "${businessData.tagline}" / "${businessData.secondaryTagline}"
Bakery Motto: "${businessData.motto}"

LOCATION & CONTACT (JAUNPUR, UTTAR PRADESH):
- Physical Address: ${businessData.addressLine}, ${businessData.landmark}, ${businessData.area}, ${businessData.city}, ${businessData.state}, India - PIN ${businessData.pincode}
- Location Landmark: Near Line Bazaar, beside S.P Aawas / Front Police Line Gate, Husainabad, Jaunpur.
- Bakery Counter Phone: ${businessData.phoneDisplay} (Raw: ${businessData.phoneRaw})
- Official WhatsApp Ordering: +${businessData.whatsappNumber}
- Official Email: ${businessData.email}
- Opening Hours: ${businessData.openingHoursDisplay}
- Service Area: Counter pickups at Dev Palace, Line Bazaar. Local Jaunpur celebration delivery inquiries coordinated via WhatsApp.

CORE QUALITY PROMISES & POLICIES:
1. 100% Pure Vegetarian & Eggless: Every single celebration cake, pastry, loaf, and savory bake made at KidOld Bakers is strictly 100% pure vegetarian / eggless. No animal fats, no gelatin, no egg products ever used.
2. Advance Order Notice:
   - For custom, multi-tier, or themed cakes: Recommend booking 24 to 48 hours in advance so chefs can sculpt the design.
   - For daily signature cakes, pastries, and breads: Same-day walk-in counter pickups available at Dev Palace, Line Bazaar, Jaunpur.
3. Order & Payment Process:
   - We do NOT charge credit cards inside this chat.
   - Orders and custom blueprints are finalized directly on WhatsApp (+91 93109 71535) or by calling the bakery counter.
4. Inventory & Sourcing Boundaries:
   - KidOld Bakers crafts fresh cakes using premium Dutch cocoa, Madagascar vanilla, pure dairy cream, seasonal fruits, butterscotch, and pure vegetarian ingredients.
   - KidOld Bakers DOES NOT keep 24K edible gold foil, real metallic foils, or imported exotic nuts in standard stock.
   - Any specialty request for luxury garnishes (such as 24K edible gold foil or exotic nuts) is strictly an unconfirmed bespoke concept that must be verified directly with our master bakers. Never confirm or guarantee availability in chat.

CONFECTIONERY CATEGORIES:
${categoriesText}

SIGNATURE CAKES & PRODUCTS CATALOG:
${productsText}

4-STEP BESPOKE CAKE CUSTOMIZER (DESIGN MY CAKE):
- Step 1 (Occasion): Birthday, Anniversary, Kids Theme, Luxury Milestone, Tea-Time, Corporate Celebration.
- Step 2 (Sponge Bases & Buttercream Fillings):
Sponge Options:
${spongeList}
Filling/Frosting Options:
${fillingList}
- Step 3 (Weight & Dietary):
Weight / Serving Guide:
${weightList}
Tier Options: 1 Tier (Single tier), 2 Tiers (Grand celebration), 3 Tiers (Luxury wedding/milestone).
Custom Inscription: Customers can request custom wording piped on chocolate plaque or cake fondant.
- Step 4 (Blueprint & Reference):
  * Option A: Upload custom design photo or sketch.
  * Option B: Dispatch customizer blueprint directly to WhatsApp without photo.
=== END OF KNOWLEDGE BASE ===`;
}
