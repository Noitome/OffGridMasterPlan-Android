
const fs = require('fs');

// Mock baseProducts from products.ts (just the relevant categories part)
// I'll assume the content I read earlier is accurate.
// But to be precise, I should probably read products.ts and parse it, but that's hard because it's TS.
// Instead, I'll rely on the fact that I know "Heating" is in baseProducts.

// Let's load the generated data
const generatedData = JSON.parse(fs.readFileSync('src/data/products.generated.json', 'utf8'));
const generated = generatedData.products || [];

// Mock baseProducts with the categories I saw in the file read
const baseProducts = [
    { id: 'diesel-heater-5kw', category: 'Heating' },
    { id: 'vevor-diesel-heater-8kw', category: 'Heating' },
    { id: 'mr-heater-buddy', category: 'Heating' },
    { id: 'pure-sine-inverter-48v-1500w', category: 'Inverters' },
    { id: 'victron-phoenix-inverter-12-800', category: 'Inverters' },
    { id: 'victron-multiplus-24-3000', category: 'Inverters' },
    // Add one that might be problematic
    { id: 'vevor-wind-turbine-500w', category: 'Wind Turbines' },
];

const baseIds = new Set(baseProducts.map(p => p.id));
const additional = generated.filter(p => p && p.id && !baseIds.has(p.id));
const products = [...baseProducts, ...additional];

const categories = new Set(products.map(p => p.category));
const sortedCategories = Array.from(categories).sort();

console.log('--- Categories and Counts ---');
sortedCategories.forEach(cat => {
    const count = products.filter(p => p.category === cat).length;
    console.log(`"${cat}": ${count} products`);
});

console.log('\n--- Checking for potential duplicates (case/whitespace) ---');
const normalized = new Map();
sortedCategories.forEach(cat => {
    const norm = cat.trim().toLowerCase();
    if (normalized.has(norm)) {
        console.log(`WARNING: Potential duplicate category: "${cat}" conflicts with "${normalized.get(norm)}"`);
    } else {
        normalized.set(norm, cat);
    }
});
