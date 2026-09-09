# Chapter 3: Architecture Aur Folder Structure (Kitchen Ka Naksha)

## 1. Professional Folder Structure Kyun Zaroori Hai?
Agar kisi 5-star hotel ke kitchen me jao, to wahan aam taur par sabji katne ki alag table hoti hai, oven ka alag section hota hai, utensils ka alag rack hota hai, aur masala rack alag hota hai.

Agar chef sara saman ek hi shelf me phenk de — chaku, cheeni, tel, aate ka dabba sab mix — to pehli dish to ban jayegi, lekin agle 2 ghante me poora kitchen disaster ban jayega!

Software development me bhi wahi hota hai. Beginners aksar sara code `app/page.tsx` me 2,000 lines ka bana kar daal dete hain. Aise code ko company me **"Spaghetti Code"** kehte hain.

## 2. KidOld Bakers Ka Folder Blueprint
Humne apne repository me responsibilities ko saaf-saaf baanta hai:

```
src/
├── app/        -> Routes aur page rendering (Website ke darwaze aur kamre)
├── components/ -> Reusable UI building blocks (Baraf ke tukde, plates, spoons)
│   ├── ui/     -> Primitives (Button, Badge, Card, Heading)
│   ├── layout/ -> Structure (Navbar, MobileNav, Footer)
│   └── sections/-> Home page ke bade hisse (Hero, Categories, Story, Visit Us)
├── features/   -> Future 3D & Customizer domain features (3D Cake Placeholder)
├── data/       -> Bakery ka asli menu aur business information (Pure data, zero HTML)
├── types/      -> TypeScript contracts (Rules ki data kaisa hona chahiye)
└── lib/        -> Utility functions (WhatsApp link generator, class merger)
```

## 3. Har Folder Ka Asli Kaam:
- **Agar `types/` na hota:** To koi bhi developer galti se product price me number ki jagah text likh deta aur runtime par website crash ho sakti thi. TypeScript compiler hume galti karne se pehle hi rok leta hai!
- **Agar `data/` na hota:** To agar kal bakery ka phone number ya cake ka daam badalta, to hume JSX code me jaakar 10 alag jagah text dhoondhna padta. Data alag rakhne se sirf ek file badalni padti hai.
- **Agar `features/3d/` na hota:** To Phase 3 me jab Three.js aayega, to poore Hero Section ko tod-phod kar doobara likhna padta. Boundary placeholder banane se hum future-ready hain!
