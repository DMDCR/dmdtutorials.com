const fs = require('fs');
const path = require('path');

const postsDir = './posts';
const imagesDir = path.join(postsDir, 'images');

function findImage(basename) {
  const exts = ['.png', '.jpg', '.jpeg', '.webp'];
  for (const ext of exts) {
    const imgPath = path.join(imagesDir, basename + ext);
    if (fs.existsSync(imgPath)) {
      // return the web-accessible path (adjust if your deploy uses a different base)
      return `posts/images/${basename + ext}`;
    }
  }
  return null;
}

const files = fs.readdirSync(postsDir)
  .filter(f => f.endsWith('.html') && f.toLowerCase() !== 'index.html');

const data = files.map(file => {
  const basename = file.replace('.html', '');
  const image = findImage(basename);

  return {
    title: basename.replace(/-/g, ' '),
    file: file,
    date: new Date(fs.statSync(path.join(postsDir, file)).mtime)
             .toISOString().split('T')[0],
    ...(image && { image })    // only include if an image was found
  };
});

fs.writeFileSync(
  path.join(postsDir, 'posts.json'),
  JSON.stringify(data, null, 2)
);

console.log('✅ posts.json generated with images where available');
