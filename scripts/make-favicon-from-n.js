const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none">
  <path
    d="M7.2 26.8V12.6c0-4.86 3.94-8.8 8.8-8.8s8.8 3.94 8.8 8.8v14.2"
    stroke="#0f6e6a"
    stroke-width="5.6"
    stroke-linecap="butt"
    stroke-linejoin="round"
  />
</svg>`;

(async () => {
  const app = path.join(__dirname, "..", "src", "app");

  // Render SVG -> PNG at 2x then downscale with hard alpha for apple/legacy
  async function writePng(size, file) {
    const hi = size * 3;
    const rendered = await sharp(Buffer.from(svg))
      .resize(hi, hi, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toBuffer();

    const { data, info } = await sharp(rendered)
      .resize(size, size, { kernel: "lanczos3" })
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    for (let i = 0; i < data.length; i += 4) {
      const a = data[i + 3];
      if (a < 110) {
        data[i] = 0;
        data[i + 1] = 0;
        data[i + 2] = 0;
        data[i + 3] = 0;
      } else {
        // solid brand, opaque — removes foggy fringe
        data[i] = 15;
        data[i + 1] = 110;
        data[i + 2] = 106;
        data[i + 3] = 255;
      }
    }

    await sharp(data, {
      raw: { width: info.width, height: info.height, channels: 4 },
    })
      .png()
      .toFile(path.join(app, file));
  }

  fs.writeFileSync(path.join(app, "icon.svg"), svg);
  await writePng(32, "icon.png");
  await writePng(180, "apple-icon.png");
  console.log("vector-crisp favicons written");
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
