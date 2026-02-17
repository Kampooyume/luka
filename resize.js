const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const inputFolder = "/Users/Thapanapong/valentine/luka/images/thumbs";
const outputFolder = "/Users/Thapanapong/valentine/luka/images/full";
const MAX_WIDTH = 1200;
const QUALITY = 75;

if (!fs.existsSync(outputFolder)) {
  fs.mkdirSync(outputFolder);
}

fs.readdirSync(inputFolder).forEach((file) => {
  const ext = path.extname(file).toLowerCase();

  if ([".jpg", ".jpeg", ".png"].includes(ext)) {
    const inputPath = path.join(inputFolder, file);
    const outputPath = path.join(
      outputFolder,
      path.basename(file, ext) + ".webp",
    );

    sharp(inputPath)
      .rotate()
      .resize({
        width: MAX_WIDTH,
        withoutEnlargement: true,
      })
      .webp({ quality: QUALITY })
      .toFile(outputPath)
      .then(() => console.log(`✅ Converted: ${file}`))
      .catch((err) => console.error(`❌ Error: ${file}`, err));
  }
});
