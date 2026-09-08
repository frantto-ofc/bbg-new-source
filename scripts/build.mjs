import fs from 'node:fs';
import path from 'node:path';

const sourcePath = path.resolve('index.html');
const html = fs.readFileSync(sourcePath, 'utf8');

if (!html.includes('<div class="prime-site">')) {
  throw new Error('Post-model sections not found.');
}

fs.mkdirSync('dist', { recursive: true });
fs.writeFileSync('dist/index.html', html);
console.log('Built dist/index.html with the reference post-model sections.');
