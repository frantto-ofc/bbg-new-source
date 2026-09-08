import fs from 'node:fs';
import path from 'node:path';

const sourcePath = path.resolve('index.html');
const html = fs.readFileSync(sourcePath, 'utf8');
const leadershipSections = html.match(/<section class="fernando-section/g) || [];

if (leadershipSections.length !== 3) {
  throw new Error(`Expected 3 leadership sections, found ${leadershipSections.length}.`);
}

fs.mkdirSync('dist', { recursive: true });
fs.writeFileSync('dist/index.html', html);
console.log('Built dist/index.html with 3 leadership sections.');
