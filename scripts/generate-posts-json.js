const fs = require('fs');
const path = require('path');

const dir = './posts';
const files = fs.readdirSync(dir)
  .filter(f => f.endsWith('.html') && f.toLowerCase() !== 'index.html'); // filter out index.html

const data = files.map(file => {
  const name = file.replace('.html', '');
  return {
    title: name.replace(/-/g, ' '),
    file: file,
    date: new Date(fs.statSync(path.join(dir, file)).mtime).toISOString().split('T')[0]
  };
});

fs.writeFileSync('./posts/posts.json', JSON.stringify(data, null, 2));
console.log('✅ posts.json generated');
