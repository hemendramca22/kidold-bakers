# Chapter 6: Data Layer Aur Abstraction (Menu Card Ki Separation)

## 1. Data Hardcoding Ka Paap
Kayi developers card banate waqt card ke andar hi likh dete hain:
```tsx
<h3>Classic Belgian Dark Chocolate Truffle</h3>
<p>Starting from ₹550</p>
```
Agar bakery ke paas 50 cakes hain, to kya tum 50 baar same HTML copy-paste karoge?
Aur agar daam ₹550 se badal kar ₹590 ho gaya, to kya tum code me dhoondhte firoge?

## 2. Abstraction: `src/data/products.ts`
Humne product data ko alag array me store kiya:
```typescript
export const productsData: Product[] = [
  {
    id: "belgian-chocolate-truffle",
    name: "Classic Belgian Dark Chocolate Truffle",
    priceDisplay: "Starting from ₹550",
    isEgglessAvailable: true,
    isPureVeg: true,
    flavorNotes: ["Dark Belgian Ganache", "Moist Cocoa Crumb"],
    ...
  }
];
```

Aur UI component (`src/components/sections/SignatureSection.tsx`) me sirf loop chalaya:
```tsx
{productsData.map((product) => (
  <Card key={product.id}>
    {/* Reusable card layout */}
  </Card>
))}
```

### Iska Faayda:
Kal ko jab hum **Phase 6** me Supabase ya Database jodenge, to hume UI ko chhoona bhi nahi padega! Hum sirf `productsData` ko database fetch se replace kar denge, aur poori website automatically chalne lagegi.

## 3. WhatsApp Ordering Magic (`src/lib/whatsapp.ts`)
Humne ek helper banaya jo customer ke click par pre-filled WhatsApp message banata hai:
- Agar customer "Design My Cake" par click karega, to WhatsApp open hoga with:
  *"Hello KidOld Bakers! I would like to inquire about a Custom Cake..."*
- Agar kisi specific cake par click karega, to message banega:
  *"I would like to check availability for: Classic Belgian Dark Chocolate Truffle..."*

Isse customer ko type karne me aalas nahi aata, aur bakery owner ko turant pata chal jata hai ki customer ko exactly kya chahiye!
