import { readFile, access } from 'node:fs/promises';
import { constants } from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const root = process.cwd();
const htmlPath = path.join(root, 'index.html');
const cssPath = path.join(root, 'assets/css/urim.css');
const jsPath = path.join(root, 'assets/js/urim.js');

const [html, css, js] = await Promise.all([
  readFile(htmlPath, 'utf8'),
  readFile(cssPath, 'utf8'),
  readFile(jsPath, 'utf8'),
]);

const failures = [];
const requireMatch = (label, pattern, source) => {
  if (!pattern.test(source)) failures.push(label);
};

requireMatch('document language', /<html\s+lang="en">/i, html);
requireMatch('unique main landmark', /<main\s+id="main">/i, html);
requireMatch('skip link', /class="skip-link"\s+href="#main"/i, html);
requireMatch('single primary heading', /<h1\b/i, html);
requireMatch('descriptive title', /<title>URIM — Decision intelligence for complex disputes<\/title>/i, html);
requireMatch('briefing email field', /name="email"[^>]+required/i, html);
requireMatch('confidentiality warning', /not submit confidential or privileged information/i, html);
requireMatch('illustrative product label', /Illustrative product interface/i, html);
requireMatch('hero product workflow', /data-hero-tab="screen"/i, html);
requireMatch('use-case workflow', /data-use-case-tab="screen"/i, html);
requireMatch('FAQ workflow', /data-faq/i, html);
requireMatch('legal-advice disclaimer', /not legal advice/i, html);
requireMatch('canonical production URL', /rel="canonical" href="https:\/\/urim\.ca\/"/i, html);
requireMatch('Open Graph production URL', /property="og:url" content="https:\/\/urim\.ca\/"/i, html);
requireMatch('Open Graph social image', /property="og:image" content="https:\/\/urim\.ca\/assets\/og\.png"/i, html);
requireMatch('standalone SVG favicon', /rel="icon" type="image\/svg\+xml" href="assets\/favicon\.svg"/i, html);
requireMatch('reduced motion styles', /prefers-reduced-motion:\s*reduce/i, css);
requireMatch('responsive phone breakpoint', /@media\s*\(max-width:\s*560px\)/i, css);
requireMatch('hero product interaction', /setupHeroDemo\(\)/, js);
requireMatch('use-case interaction', /setupUseCases\(\)/, js);
requireMatch('FAQ interaction', /setupFaq\(\)/, js);
requireMatch('form endpoint', /fetch\("\/api\/access"/, js);

const h1Count = (html.match(/<h1\b/gi) || []).length;
if (h1Count !== 1) failures.push(`exactly one h1 (found ${h1Count})`);

const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index);
if (duplicateIds.length) failures.push(`duplicate ids: ${[...new Set(duplicateIds)].join(', ')}`);

const localAssets = [...html.matchAll(/(?:src|href)="((?:assets|api)\/[^"#?]+)"/g)]
  .map((match) => match[1])
  .filter((asset) => !asset.startsWith('api/'));

for (const asset of localAssets) {
  try {
    await access(path.join(root, asset), constants.R_OK);
  } catch {
    failures.push(`missing local asset: ${asset}`);
  }
}

try {
  await access(path.join(root, 'assets/og.png'), constants.R_OK);
} catch {
  failures.push('missing local asset: assets/og.png');
}

const forbiddenPublicClaims = [
  /12,?847,?203/i,
  /91\.7%/i,
  /every decided case/i,
  /thinking machines lab/i,
  /responses within five business days/i,
];

for (const claim of forbiddenPublicClaims) {
  if (claim.test(html)) failures.push(`unverified public claim: ${claim}`);
}

if (failures.length) {
  console.error('URIM validation failed:');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`URIM validation passed (${ids.length} ids, ${localAssets.length} local assets).`);
