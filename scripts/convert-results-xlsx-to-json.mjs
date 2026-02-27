import fs from 'node:fs';
import path from 'node:path';
import xlsx from 'xlsx';

const excelPath = process.argv[2];
if (!excelPath) {
  console.error('Usage: node scripts/convert-results-xlsx-to-json.mjs <absolute_path_to_results.xlsx>');
  process.exit(1);
}

const wb = xlsx.readFile(excelPath);
const firstSheetName = wb.SheetNames[0];
const ws = wb.Sheets[firstSheetName];
const rows = xlsx.utils.sheet_to_json(ws, { defval: '' });

const outDir = path.resolve(process.cwd(), 'src', 'data');
fs.writeFileSync(path.join(outDir, 'products.raw.json'), JSON.stringify({ sheet: firstSheetName, rows }, null, 2));

const AMAZON_TAG = 'offgridmaster-22';

const extractAsin = (url) => {
  if (!url) return null;
  const match = url.match(/\/(?:dp|gp\/product)\/([A-Z0-9]{10})/);
  return match ? match[1] : null;
};

const normalize = (row) => {
  const get = (keys) => {
    for (const k of keys) {
      const v = row[k];
      if (v !== undefined && v !== null && String(v).trim() !== '') return String(v).trim();
    }
    return '';
  };
  const name = get(['name', 'Name', 'Product', 'Title', 'title']);
  const image = get(['image', 'Image', 'Image URL', 'ImageUrl', 'img', 'main_image_url']);
  const price = get(['price', 'Price', 'Amount']);
  const kw = get(['keyword', 'Keyword']);
  const category = (() => {
    const k = kw.toLowerCase();
    if (k.includes('wind')) return 'Wind Turbines';
    if (k.includes('solar') && k.includes('panel')) return 'Solar Panels';
    if (k.includes('battery')) return 'Battery Storage';
    if (k.includes('mppt') || k.includes('charge controller')) return 'Charge Controllers';
    if (k.includes('inverter')) return 'Inverters';
    if (k.includes('shunt') || k.includes('monitor')) return 'Battery Monitoring';
    if (k.includes('water') && k.includes('tank')) return 'Water Storage';
    if (k.includes('water')) return 'Water';
    return 'Misc';
  })();
  const rawLink = get(['link', 'Link', 'URL', 'Product URL', 'Amazon Link', 'product_url']);
  
  // Extract ASIN and build canonical affiliate link
  let asin = get(['asin', 'ASIN']);
  if (!asin && rawLink) {
    asin = extractAsin(rawLink) || '';
  }
  
  let customLink = rawLink;
  if (asin) {
    customLink = `https://www.amazon.com.au/dp/${asin}?tag=${AMAZON_TAG}`;
  } else if (customLink && customLink.includes('amazon') && !customLink.includes('tag=')) {
     // If it's an amazon link but we couldn't find ASIN, append tag anyway if possible
     const joiner = customLink.includes('?') ? '&' : '?';
     customLink = `${customLink}${joiner}tag=${AMAZON_TAG}`;
  }

  const ratingStr = get(['rating', 'Rating']);
  const rating = ratingStr ? Number(ratingStr) : 0;
  const idBase = get(['id', 'ID', 'Sku', 'SKU']) || name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  return { id: idBase, name, price, rating, image, category, description: get(['description', 'Description', 'Summary']), asin, customLink };
};

const products = rows
  .map(normalize)
  .filter(p => p.name && p.image && p.price);

const outFile = path.join(outDir, 'products.generated.json');
fs.writeFileSync(outFile, JSON.stringify({ products }, null, 2));

console.log(`Wrote ${products.length} products to ${outFile}`);
console.log('Sample:', products.slice(0, 3));
if (rows.length) {
  console.log('Headers in first row:', Object.keys(rows[0]));
}
