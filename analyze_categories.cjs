
const fs = require('fs');

try {
  const data = fs.readFileSync('src/data/products.generated.json', 'utf8');
  const json = JSON.parse(data);
  const products = json.products || [];
  
  const categories = new Set();
  products.forEach(p => {
    if (p.category) categories.add(p.category);
  });

  console.log('Unique categories in generated data (with lengths):');
  Array.from(categories).sort().forEach(c => {
    console.log(`- "${c}" (length: ${c.length})`);
    if (c !== c.trim()) {
        console.log(`  WARNING: Contains whitespace! Trimmed: "${c.trim()}"`);
    }
  });
} catch (err) {
  console.error('Error:', err);
}
