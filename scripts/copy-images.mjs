import fs from "fs";
import path from "path";

const srcDir = "C:\\Users\\hemen\\.gemini\\antigravity\\brain\\8c124b47-e84d-4aa8-9b96-1654c98ade67";
const destDir = "g:\\Different KidOld-Bakers\\public\\images\\products";

const mappings = [
  { prefix: "kids_gems_cake", target: "kids-gems-cake.jpg" },
  { prefix: "kids_rainbow_cake", target: "kids-rainbow-cake.jpg" },
  { prefix: "kids_oreo_cake", target: "kids-oreo-cake.jpg" },
  { prefix: "anniversary_rose", target: "anniversary-rose.jpg" },
  { prefix: "belgian_heart_cake", target: "belgian-heart.jpg" },
  { prefix: "lotus_biscoff_cake", target: "lotus-biscoff.jpg" },
  { prefix: "mango_fruit_cake", target: "mango-fruit.jpg" },
  { prefix: "black_forest_cake", target: "black-forest.jpg" },
];

const files = fs.readdirSync(srcDir);
for (const m of mappings) {
  const match = files.find((f) => f.startsWith(m.prefix) && f.endsWith(".jpg"));
  if (match) {
    fs.copyFileSync(path.join(srcDir, match), path.join(destDir, m.target));
    console.log(`Copied: ${match} -> ${m.target}`);
  } else {
    console.warn(`Could not find file with prefix: ${m.prefix}`);
  }
}
