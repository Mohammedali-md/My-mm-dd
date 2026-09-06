import fs from 'fs';
import zlib from 'zlib';

function createPNG(width, height, r, g, b) {
  // A minimal valid uncompressed/deflated raw PNG generator
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  
  // IHDR chunk
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData.writeUInt8(8, 8); // bit depth
  ihdrData.writeUInt8(2, 9); // color type (truecolor RGB)
  ihdrData.writeUInt8(0, 10); // compression
  ihdrData.writeUInt8(0, 11); // filter
  ihdrData.writeUInt8(0, 12); // interlace
  const ihdrChunk = createChunk('IHDR', ihdrData);

  // Raw image data: for each scanline, 1 filter byte (0) + width * 3 bytes RGB
  const rawData = Buffer.alloc(height * (1 + width * 3));
  let offset = 0;
  for (let y = 0; y < height; y++) {
    rawData[offset++] = 0; // filter None
    for (let x = 0; x < width; x++) {
      // Create a nice gradient with golden ribbon in center
      const isCenterVertical = Math.abs(x - width / 2) < width * 0.08;
      const isCenterHorizontal = Math.abs(y - height / 2) < height * 0.08;
      if (isCenterVertical || isCenterHorizontal) {
        rawData[offset++] = 245; // Gold R
        rawData[offset++] = 158; // Gold G
        rawData[offset++] = 11;  // Gold B
      } else {
        const factor = y / height;
        rawData[offset++] = Math.min(255, Math.floor(r + factor * 20));
        rawData[offset++] = Math.min(255, Math.floor(g - factor * 10));
        rawData[offset++] = Math.min(255, Math.floor(b + factor * 30));
      }
    }
  }

  const compressedData = zlib.deflateSync(rawData);
  const idatChunk = createChunk('IDAT', compressedData);
  const iendChunk = createChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

function crc32(buf) {
  let table = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let j = 0; j < 8; j++) {
      c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
    }
    table[i] = c;
  }
  let crc = 0xFFFFFFFF;
  for (let i = 0; i < buf.length; i++) {
    crc = (crc >>> 8) ^ table[(crc ^ buf[i]) & 0xFF];
  }
  return (crc ^ 0xFFFFFFFF) >>> 0;
}

function createChunk(type, data) {
  const len = data.length;
  const chunk = Buffer.alloc(4 + 4 + len + 4);
  chunk.writeUInt32BE(len, 0);
  chunk.write(type, 4, 4, 'ascii');
  data.copy(chunk, 8);
  const toCrc = Buffer.concat([Buffer.from(type, 'ascii'), data]);
  const checksum = crc32(toCrc);
  chunk.writeUInt32BE(checksum, 8 + len);
  return chunk;
}

if (!fs.existsSync('./public')) {
  fs.mkdirSync('./public', { recursive: true });
}

// Brand Rose: R=190, G=24, B=93 (#be185d)
fs.writeFileSync('./public/pwa-192x192.png', createPNG(192, 192, 190, 24, 93));
fs.writeFileSync('./public/pwa-512x512.png', createPNG(512, 512, 190, 24, 93));
fs.writeFileSync('./public/pwa-maskable-512x512.png', createPNG(512, 512, 190, 24, 93));
fs.writeFileSync('./public/apple-touch-icon.png', createPNG(180, 180, 190, 24, 93));
console.log('Icons generated successfully!');
