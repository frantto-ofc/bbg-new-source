import fs from 'node:fs';
import path from 'node:path';

const sourcePath = path.resolve('index.html');
let html = fs.readFileSync(sourcePath, 'utf8');

if (!html.includes('id="fernando-2"')) {
  const start = html.indexOf('<section class="fernando-section" id="fernando"');
  if (start < 0) throw new Error('Fernando section not found');

  const endTag = '</section>';
  const endPos = html.indexOf(endTag, start);
  if (endPos < 0) throw new Error('Fernando section closing tag not found');
  const end = endPos + endTag.length;
  const first = html.slice(start, end);

  const second = first
    .replace('class="fernando-section"', 'class="fernando-section fernando-section--inverse"')
    .replace('id="fernando"', 'id="fernando-2"')
    .replace('aria-labelledby="fernando-title"', 'aria-labelledby="fernando-title-2"')
    .replace('id="fernando-title"', 'id="fernando-title-2"');

  const third = first
    .replace('id="fernando"', 'id="fernando-3"')
    .replace('aria-labelledby="fernando-title"', 'aria-labelledby="fernando-title-3"')
    .replace('id="fernando-title"', 'id="fernando-title-3"');

  html = html.slice(0, start) + first + '\n' + second + '\n' + third + html.slice(end);

  const css = `
/* BBG — três seções Fernando, com alternância de cores e orientação */
.bbg-elementor .fernando-section + .fernando-section{padding-top:0}
.bbg-elementor .fernando-section--inverse{color:#111;background:#fff}
.bbg-elementor .fernando-section--inverse .fernando-shell{background:#f0eee8;color:#111;grid-template-columns:minmax(0,1.08fr) minmax(0,.92fr)}
.bbg-elementor .fernando-section--inverse .fernando-portrait{grid-column:2;grid-row:1}
.bbg-elementor .fernando-section--inverse .fernando-content{grid-column:1;grid-row:1}
.bbg-elementor .fernando-section--inverse .fernando-content .prime-label{color:#777}
.bbg-elementor .fernando-section--inverse .fernando-content h2{color:#111}
.bbg-elementor .fernando-section--inverse .fernando-role{color:#AE9C6E}
.bbg-elementor .fernando-section--inverse .fernando-summary p{color:#555}
.bbg-elementor .fernando-section--inverse .fernando-milestones{border-top-color:#1113}
.bbg-elementor .fernando-section--inverse .fernando-milestones>div{border-right-color:#1113}
.bbg-elementor .fernando-section--inverse .fernando-milestones dt{color:#111}
.bbg-elementor .fernando-section--inverse .fernando-milestones dd{color:#666}
.bbg-elementor .fernando-section--inverse .fernando-link{color:#111;border-bottom-color:#1118}
@media(max-width:1000px){
  .bbg-elementor .fernando-section--inverse .fernando-shell{grid-template-columns:1fr}
  .bbg-elementor .fernando-section--inverse .fernando-portrait{grid-column:1;grid-row:1}
  .bbg-elementor .fernando-section--inverse .fernando-content{grid-column:1;grid-row:2}
}
`;

  const marker = '</style>\n<div class="bbg-elementor">';
  if (!html.includes(marker)) throw new Error('Main style marker not found');
  html = html.replace(marker, css + '\n</style>\n<div class="bbg-elementor">');
}

fs.mkdirSync('dist', { recursive: true });
fs.writeFileSync('dist/index.html', html);
console.log('Built dist/index.html with 3 Fernando sections.');
