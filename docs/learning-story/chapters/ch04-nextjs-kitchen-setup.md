# Chapter 4: Setting Up The Kitchen (Next.js, React, TypeScript, Tailwind)

## 1. Next.js Kyun? Plain React SPA Kyun Nahi?
Bohot se beginners sochte hain: *"Bhai jab Vite + React se website 10 second me ban jaati hai, to Next.js kyun use karein?"*

Iska jawab hai: **Google Bot aur Local Jaunpur Search.**

### Analogy:
- **Plain React SPA (Single Page App):** Imagine karo tumne dukaan kholi, lekin dukaan ke bahar ek band shutter laga diya. Jab koi customer aata hai aur button dabata hai, tab shutter khulta hai aur saman dikhta hai. Agar Google ka robot (crawler) raat ko aayega, to use khali shutter dikhega! Result: Google search me tumhari bakery 10th page par chali jayegi.
- **Next.js (Server-Side / Static Rendering):** Next.js pehle se hi cake, pastry, aur dukaan ki details ko clean HTML banakar plate me serve karta hai. Jab Google bot ya Jaunpur ka koi customer aata hai, to 0.1 second me poori website load ho jaati hai!

## 2. Server Components vs Client Components ("use client")
Next.js 14 App Router me by default sabhi components **Server Components** hote hain.
Yani unka code browser me bhejne ki zaroorat nahi padti, wo server par render hote hain. Isse browser fast rehta hai.

Lekin jab kisi button par click event chahiye, ya scroll detect karna ho (jaise `Navbar.tsx` ya `MobileNav.tsx`), to file ke sabse top par likhte hain:
```tsx
"use client";
```
Iska matlab Next.js ko kehna:
*"Bhai, is component me user click karega ya scroll karega, isliye iska JavaScript browser me bhej do."*

## 3. Image Optimization (`next/image`)
Aam HTML me hum likhte hain `<img src="..." />`.
Lekin Next.js me hum likhte hain:
```tsx
import Image from "next/image";
```
Kyun?
Kyunki `next/image` badi heavy images ko automatically modern WebP/AVIF format me compress kar deta hai, mobile screen ke hisab se resize karta hai, aur page load hone par layout ko hilne nahi deta (CLS = 0).
Ek 2MB ki photo 40KB me load hoti hai bina quality khoye!
