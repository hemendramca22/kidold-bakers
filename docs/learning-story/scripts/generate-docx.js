const fs = require("fs");
const path = require("path");
const {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  BorderStyle,
} = require("docx");

async function generateStoryDocx() {
  console.log("Generating KidOld Bakers Learning Story (.docx)...");

  const exportDir = path.join(__dirname, "../exports");
  if (!fs.existsSync(exportDir)) {
    fs.mkdirSync(exportDir, { recursive: true });
  }

  const doc = new Document({
    title: "KidOld Bakers - Software Engineering Learning Story",
    description: "Phase 1 Foundation & Architecture Learning Journey",
    creator: "Antigravity Senior Product Team",
    styles: {
      default: {
        document: {
          run: {
            font: "Calibri",
            size: 22, // 11pt
            color: "2C1810",
          },
        },
      },
    },
    sections: [
      {
        properties: {},
        children: [
          // Title Page / Header
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 200, after: 100 },
            children: [
              new TextRun({
                text: "KIDOLD BAKERS",
                bold: true,
                size: 48,
                color: "8B1528",
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 300 },
            children: [
              new TextRun({
                text: "Immersive Bakery Website — Software Engineering Learning Story",
                italics: true,
                size: 28,
                color: "C89D3C",
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 400 },
            children: [
              new TextRun({
                text: "Track B: Beginner-Friendly Software Engineering in Hindi / Hinglish\nPhase 1 Foundation, Stabilization & Tactile Polish",
                size: 22,
                color: "5C473E",
              }),
            ],
          }),

          // Divider
          new Paragraph({
            spacing: { before: 200, after: 300 },
            border: {
              bottom: {
                color: "C89D3C",
                space: 1,
                value: BorderStyle.SINGLE,
                size: 12,
              },
            },
          }),

          // Chapter 1
          new Paragraph({
            text: "Chapter 1: Ek Local Bakery Aur Ek Digital Sapna",
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 300, after: 150 },
          }),
          new Paragraph({
            spacing: { after: 150 },
            children: [
              new TextRun({
                text: "Imagine karo ek shehar — Jaunpur, Uttar Pradesh. Wahan ek bakery hai jiska naam hai KidOld Bakers. Is bakery ka ek emotional message hai: 'Little moments to big smiles' aur wada hai: 'You Imagine. We Bake.'",
              }),
            ],
          }),
          new Paragraph({
            spacing: { after: 150 },
            children: [
              new TextRun({
                text: "Software Engineering Ka Pehla Niyam: ",
                bold: true,
                color: "8B1528",
              }),
              new TextRun({
                text: "Technology tab tak be-asar hai jab tak wo brand ke asli emotion ko connect na kare. Generic WordPress theme download karne se dukaan ki identity mar jaati hai. Isliye humne ground zero se modular Next.js architecture banaya.",
              }),
            ],
          }),

          // Chapter 2
          new Paragraph({
            text: "Chapter 2: Logo Se Code Tak Ka Safar (Design Tokens & Header Fix)",
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 300, after: 150 },
          }),
          new Paragraph({
            spacing: { after: 150 },
            children: [
              new TextRun({
                text: "Ek professional frontend engineer sabse pehle brand logo inspect karta hai. Humare master emblem (kidold Logo.jpeg) me ek bachha aur dadaji cake pakde hue hain, jiske chaaro taraf crimson scalloped border (#8B1528), gold rings (#C89D3C), aur chocolate banner (#2C1810) hai.",
              }),
            ],
          }),
          new Paragraph({
            spacing: { after: 150 },
            children: [
              new TextRun({
                text: "Header Logo Double-Circle Fix: ",
                bold: true,
                color: "8B1528",
              }),
              new TextRun({
                text: "Original JPEG me 100px ka outer white margin tha, aur container me bhi ek gold border laga hua tha, jiski wajah se awkward double-circle dikh raha tha. Humne sharp library se background transparent karke kidold-logo-clean.png banaya aur container ke redundant borders hataye. Ab logo clean, crisp aur brand identity ke roop me float karta hai.",
              }),
            ],
          }),

          // Chapter 3
          new Paragraph({
            text: "Chapter 3: Kitchen Ka Naksha (Folder Architecture & HeroVisual)",
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 300, after: 150 },
          }),
          new Paragraph({
            spacing: { after: 150 },
            children: [
              new TextRun({
                text: "Giant Logo Hataya Aur HeroVisual Banaya: Hero section me logo ko dobara bada karke dikhana ek amateur design tha. Humne ek reusable HeroVisual component banaya jo authentic bakery photography ke liye ready frame hai. Jab tak client genuine photos nahi deta, tab tak ek tasteful local confectioner art aur tactile badges showcase hote hain, aur real photo aane par 1-line config change se drop-in ho jayega!",
              }),
            ],
          }),

          // Chapter 4
          new Paragraph({
            text: "Chapter 4: Tactile Depth & Information Architecture",
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 300, after: 150 },
          }),
          new Paragraph({
            spacing: { after: 150 },
            children: [
              new TextRun({
                text: "Visual Polish & Engagement: Humne buttons me tactile gradients aur physical press states (active:scale-98, inset highlights) diye. Navbar ko ek modern floating glass island banaya. Signature section me Occasion-Based Filter Pills (Birthdays, Anniversaries, Kids, Teatime) lagaye, aur Custom Cake section me interactive 3-step builder banaya jo customized WhatsApp message generate karta hai!",
              }),
            ],
          }),

          // Chapter 5: Debugging Diary
          new Paragraph({
            text: "Chapter 5: Debugging Diary (Real Bugs & ChunkLoadError Resolution)",
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 300, after: 150 },
          }),
          new Paragraph({
            spacing: { after: 100 },
            children: [
              new TextRun({
                text: "Bug 1 (PowerShell Execution Policy): ",
                bold: true,
                color: "8B1528",
              }),
              new TextRun({
                text: "npm.ps1 blocked on Windows. Solution: Invoked npm.cmd batch wrapper directly.",
              }),
            ],
          }),
          new Paragraph({
            spacing: { after: 100 },
            children: [
              new TextRun({
                text: "Bug 2 (ChunkLoadError on app/layout.js Timeout): ",
                bold: true,
                color: "8B1528",
              }),
              new TextRun({
                text: "Dev tab idle rehne par layout chunk timeout error deta tha. Root cause: Production build artifacts aur dev cache takra rahe the, aur on-demand entries idle chunks ko jaldi dispose kar raha tha. Fix: next.config.mjs me onDemandEntries buffer badhaya, global-error.tsx me auto-recovery reload mechanism banaya, layout.tsx me proactive chunk listener lagaya, aur npm run clean script banaya.",
              }),
            ],
          }),
          new Paragraph({
            spacing: { after: 150 },
            children: [
              new TextRun({
                text: "Bug 3 (Value Cards Text Overflow & Clipping): ",
                bold: true,
                color: "8B1528",
              }),
              new TextRun({
                text: "Story section me rigid padding aur height ki wajah se value cards ka content chhote viewports par cut ho raha tha. Fix: Cards ko flexible min-h, flex-col vertical distribution, aur generous p-5 padding dekar 100% responsive banaya.",
              }),
            ],
          }),

          // Chapter 6: Verified Local Business Data
          new Paragraph({
            text: "Chapter 6: Verified Business Details (Single Source of Truth)",
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 300, after: 150 },
          }),
          new Paragraph({
            spacing: { after: 150 },
            children: [
              new TextRun({
                text: "Software Engineering me credibility sabse badi cheez hoti hai. Humne live Google Site (sites.google.com/view/kidoldbakers) ko verified single source of truth banaya. Sabhi fake reviews, unverified 24/7 hours, aur imaginary delivery radius ko completely remove kiya. Store ka exact address: Dev Palace, 2, Line Bazaar Rd, beside S.P Aawas / Front Police Line Gate, Husainabad, Jaunpur 222002, phone: 093109 71535, aur email: kidoldbakers@gmail.com integrate kiya.",
              }),
            ],
          }),

          // Chapter 7: 8 Verified Products & Local Photography
          new Paragraph({
            text: "Chapter 7: 8 Verified Products & Zero Fabricated Pricing",
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 300, after: 150 },
          }),
          new Paragraph({
            spacing: { after: 150 },
            children: [
              new TextRun({
                text: "Client ke live catalog ke 8 authentic products ko configure kiya: Blueberry Cake, Chocolate Cake, Butter Scotch, Red Velvet, PineApple Cake, Vanilla Cake, Heavenly Chocolate Shots, aur Chocolate Cream Donuts. Har product ke liye high-resolution local editorial photography generate karke deploy ki. Fake price tags ki jagah 'Enquire on WhatsApp' aur 'Ask Availability' action badges lagaye jo direct live counter rate se connect karte hain.",
              }),
            ],
          }),

          // Chapter 8: 4-Step Progressive Cake Studio Wizard
          new Paragraph({
            text: "Chapter 8: The 4-Step Progressive Cake Studio Wizard",
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 300, after: 150 },
          }),
          new Paragraph({
            spacing: { after: 150 },
            children: [
              new TextRun({
                text: "Custom cake section ko ek true 4-step progressive wizard me transform kiya: Step 1 (Sponge Base) -> Step 2 (Luscious Filling) -> Step 3 (Occasion Theme & Decor) -> Step 4 (Blueprint Review & Order Brief). Step 4 me customer weight/serving chun sakta hai, customized cake message likh sakta hai, aur 1 click me chef ko WhatsApp par well-structured blueprint brief bhej sakta hai.",
              }),
            ],
          }),

          // Chapter 9: Flagship 3D Hero Interaction & Scroll Choreography
          new Paragraph({
            text: "Chapter 9: Flagship 3D Hero Interaction & Meaningful Scroll Choreography",
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 300, after: 150 },
          }),
          new Paragraph({
            spacing: { after: 150 },
            children: [
              new TextRun({
                text: "Hero section ko ek genuine interactive product showcase me elevate kiya using Three.js, React Three Fiber, Drei, aur GSAP ScrollTrigger. Random mouse-follow wobble ki jagah ek meaningful 6-state scroll-scrubbed progression banayi: State 1 (Front view) -> State 2 (Turntable rotation ~37°) -> State 3 (Macro camera dolly zoom) -> State 4 (Artisan product callouts for Flavour, Filling, Decoration) -> State 5 (Exploded cake layer separation) -> State 6 (Reassembly & Design My Cake CTA spotlight reveal). Ref-driven GPU animation loop se zero React re-renders achieve kiye at 60fps/120fps, desktop par controlled 1200px pinning di gayi aur mobile par fluid native scroll maintain kiya gaya, with 100% zero-shift photographic fallback.",
              }),
            ],
          }),

          // Checkpoint
          new Paragraph({
            text: "Checkpoint & Phase 2 Flagship Showcase Status",
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 300, after: 150 },
          }),
          new Paragraph({
            spacing: { after: 200 },
            children: [
              new TextRun({
                text: "The flagship 3D hero interaction is now fully live, resilient, and performant. The approved glass navbar remains untouched, Design My Cake logic is fully preserved, and the bakery centerpiece delivers an authentic, high-craft digital experience.",
              }),
            ],
          }),
        ],
      },
    ],
  });

  const outputPath = path.join(
    exportDir,
    "KidOld_Bakers_Software_Engineering_Story_Phase1.docx"
  );
  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync(outputPath, buffer);

  console.log(`Successfully generated DOCX file at: ${outputPath}`);
}

generateStoryDocx().catch((err) => {
  console.error("Error generating docx:", err);
  process.exit(1);
});
