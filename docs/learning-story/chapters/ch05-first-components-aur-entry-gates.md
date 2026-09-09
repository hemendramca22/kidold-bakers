# Chapter 5: Entry Gates — `layout.tsx` Aur `page.tsx` Decoded

## 1. `layout.tsx` (Bakery Ki Chhat Aur Deewarein)
`src/app/layout.tsx` ko tum dukaan ki permanent building samajh sakte ho.

```tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${jakarta.variable}`}>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

### Yahan kya ho raha hai?
1. **`Navbar`**: Dukaan ka sign board aur counter jo har waqt upar dikhega chahe customer kisi bhi section me ho.
2. **`children`**: Ye wo jagah hai jahan alag-alag pages ya sections ka saman badalta rahega.
3. **`Footer`**: Dukaan ke neeche ka floor jisme address aur sitemap hai.
4. **Google Fonts (`Playfair_Display` & `Plus_Jakarta_Sans`)**: Fonts ko `next/font` se load kiya gaya hai jisse font download hone tak page blank na ho.
5. **JSON-LD Schema (`<script type="application/ld+json">`)**: Ye Google ke liye ek digital visiting card hai, jisme likha hai ki ye bakery Jaunpur, Uttar Pradesh me hai aur subah 9 baje se raat 10 baje tak khulti hai.

## 2. `page.tsx` (Dukaan Ka Main Showroom)
`src/app/page.tsx` me humne koi 2000 lines ka messy code nahi likha. Dekho kitna clean hai:

```tsx
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
```
Isse koi naya developer bhi dekhte hi samajh jayega ki homepage par kaunsa section kiske baad aata hai!
Agar kal ko client bole ki *"Story section ko Category ke upar kar do"*, to sirf ek line upar move karni hai. Zero risk of breaking anything!
