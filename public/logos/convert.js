const fs = require('fs');
const sharp = require('sharp');
const path = require('path');

const folder = './'; // current folder
fs.readdirSync(folder).forEach(file => {
  if (file.endsWith('.webp')) {
    const output = file.replace('.webp', '.webp');
    sharp(file)
      .webp({ quality: 80 })
      .toFile(output)
      .then(() => console.log(`Converted ${file} → ${output}`))
      .catch(err => console.error(`Error converting ${file}:`, err));
  }
});