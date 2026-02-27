import { useState, useMemo, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { products } from '@/data/products';
import { AffiliateProductCard } from '@/components/AffiliateProductCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export function Shop() {
  const [searchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const productSectionRef = useRef<HTMLDivElement>(null);

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = new Set(products.map(p => p.category));
    return Array.from(cats).sort();
  }, []);

  const categoryImages = useMemo(() => {
    const images: Record<string, string> = {};
    categories.forEach(category => {
      const product = products.find(p => p.category === category && p.image);
      if (product) {
        images[category] = product.image;
      }
    });
    return images;
  }, [categories]);

  // Filter products
  const filteredProducts = useMemo(() => {
    return products
      .filter(product => {
        const matchesCategory = selectedCategory === 'All' || product.category.toLowerCase() === selectedCategory.toLowerCase();
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              product.description.toLowerCase().includes(searchQuery.toLowerCase());
        
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        // Sort by Category first, then by Rating (descending)
        if (a.category !== b.category) return a.category.localeCompare(b.category);
        return b.rating - a.rating;
      });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Off-Grid Equipment Shop
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Curated selection of top-rated solar panels, wind turbines, batteries, and more for your self-reliant lifestyle.
          </p>
        </div>

        {/* Visual Category Navigation */}
        <div className="mb-12 overflow-x-auto pb-4">
          <div className="flex gap-4 min-w-max px-4">
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
                productSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`relative flex-shrink-0 w-40 h-40 rounded-xl overflow-hidden group transition-all duration-300 ${
                selectedCategory === 'All' ? 'ring-4 ring-green-500 scale-105' : 'hover:scale-105'
              }`}
            >
              <img 
                src="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80" 
                alt="All Categories" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                <span className="text-white font-bold text-lg text-center px-2">All Products</span>
              </div>
            </button>

            {categories.map(category => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setSearchQuery('');
                  productSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`relative flex-shrink-0 w-40 h-40 rounded-xl overflow-hidden group transition-all duration-300 ${
                  selectedCategory === category ? 'ring-4 ring-green-500 scale-105' : 'hover:scale-105'
                }`}
              >
                <img 
                  src={categoryImages[category] || "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?w=800&q=80"} 
                  alt={category} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                  <span className="text-white font-bold text-lg text-center px-2">
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Search Bar */}
        <div ref={productSectionRef} className="flex justify-center mb-8">
          <div className="relative w-full max-w-lg">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search equipment..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <AffiliateProductCard key={product.id} {...product} />
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
