// Renamed to CommonJS module
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const inputDir = path.join(__dirname, 'public', 'assets');
const outputDir = path.join(__dirname, 'public', 'assets');

const images = [
  'screenshot_list.webp',
  'screenshot_detail2.webp'
];

images.forEach((image) => {
  const inputPath = path.join(inputDir, image);
  const outputPath = path.join(outputDir, image.replace('.webp', '_low.webp'));

  sharp(inputPath)
    .resize({ width: Math.round(1920 / 2) }) // Resize to half the width
    .toFile(outputPath)
    .then(() => {
      console.log(`Generated lower-resolution image: ${outputPath}`);
    })
    .catch((err) => {
      console.error(`Error processing ${image}:`, err);
    });
});