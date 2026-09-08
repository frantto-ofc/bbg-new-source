import fs from 'node:fs';
import path from 'node:path';

const sourcePath = path.resolve('index.html');
const html = fs.readFileSync(sourcePath, 'utf8');
const leadershipSections = html.match(/<section class="fernando-section/g) || [];

if (leadershipSections.length !== 3) {
  throw new Error(`Expected 3 leadership sections, found ${leadershipSections.length}.`);
}

const outputPath = path.resolve('dist');
fs.mkdirSync(outputPath, { recursive: true });
fs.writeFileSync(path.join(outputPath, 'index.html'), html);

const mediaSource = path.resolve('media');
if (fs.existsSync(mediaSource)) {
  fs.cpSync(mediaSource, path.join(outputPath, 'media'), {
    recursive: true,
    force: true,
  });
}

console.log('Built dist with index.html, leadership sections, and local media.');
