// Keep dist as the canonical source while serving GitHub Pages at the repo root.
const fs = require('node:fs');
const path = require('node:path');
const root = __dirname;
const source = fs.readFileSync(path.join(root, 'dist/index.html'), 'utf8');
const assets = ['icon.svg', 'style.css', 'research.js', 'cases.js', 'app.js'];
let output = source;
for (const asset of assets) {
  if (!fs.existsSync(path.join(root, 'dist', asset))) throw new Error(`Missing asset: ${asset}`);
  const attribute = asset.endsWith('.js') ? 'src' : 'href';
  const original = `${attribute}="${asset}"`;
  if (!output.includes(original)) throw new Error(`Missing reference: ${asset}`);
  output = output.replaceAll(original, `${attribute}="dist/${asset}"`);
}
fs.writeFileSync(path.join(root, 'index.html'), output);
fs.writeFileSync(path.join(root, '.nojekyll'), '');
console.log('GitHub Pages homepage generated; all five asset paths verified.');
