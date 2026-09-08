import fs from 'node:fs';
import path from 'node:path';

const sourcePath = path.resolve('index.html');
const html = fs.readFileSync(sourcePath, 'utf8');

const leadershipSections = html.match(/<section class="fernando-section/g) ?? [];
const requiredProfiles = ['id="fernando"', 'id="diogo"', 'id="carlos"'];

if (leadershipSections.length !== 3 || requiredProfiles.some((profile) => !html.includes(profile))) {
  throw new Error('Expected only the Fernando Braff, Diogo and Carlos leadership sections.');
}

fs.mkdirSync('dist', { recursive: true });
fs.writeFileSync('dist/index.html', html);
console.log('Built dist/index.html with Fernando Braff, Diogo and Carlos.');
