import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, ShoppingCart, ArrowLeft, CheckCircle, Truck, Shield, ImageOff } from 'lucide-react';
import { products } from '@/data/products';
import { AffiliateProductCard } from '@/components/AffiliateProductCard';
import { formatPrice } from '@/lib/formatters';

export function ProductDetail() {
  const { slug } = useParams();
  const product = products.find(p => p.id === slug);
  const [imageError, setImageError] = useState(false);

  if (!product) {
    return (
      <div className="pt-24 pb-16 px-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <Link to="/">
          <Button>Return Home</Button>
        </Link>
      </div>
    );
  }

  // Helper to get Amazon link
  const getAmazonLink = () => {
    const AMAZON_TAG = 'offgridmaster-20';
    if (product.customLink) {
      if (!product.customLink.includes('amazon.') || product.customLink.includes('tag=')) return product.customLink;
      const joiner = product.customLink.includes('?') ? '&' : '?';
      return `${product.customLink}${joiner}tag=${AMAZON_TAG}`;
    }
    if (product.asin) return `https://www.amazon.com.au/dp/${product.asin}?tag=${AMAZON_TAG}`;
    return `https://www.amazon.com.au/s?k=${encodeURIComponent(product.name)}&tag=${AMAZON_TAG}`;
  };

  const relatedProducts = React.useMemo(() => {
    // Find current product index
    const currentIndex = products.findIndex(p => p.id === product?.id);
    if (currentIndex === -1) return [];

    // Get suggestions starting from the next item, wrapping around if needed
    // We want 3 items preferably in the same category, but if not enough, fill with others
    const suggestions: typeof products = [];
    const needed = 3;
    let i = (currentIndex + 1) % products.length;
    
    // First pass: look for same category
    let attempts = 0;
    while (suggestions.length < needed && attempts < products.length) {
      const p = products[i];
      if (p.category === product?.category && p.id !== product?.id && p.rating > 0) {
        suggestions.push(p);
      }
      i = (i + 1) % products.length;
      attempts++;
    }

    // Second pass: fill with any high-rated products if we still need more
    if (suggestions.length < needed) {
      i = (currentIndex + 1) % products.length;
      attempts = 0;
      while (suggestions.length < needed && attempts < products.length) {
        const p = products[i];
        if (!suggestions.find(s => s.id === p.id) && p.id !== product?.id && p.rating > 0) {
          suggestions.push(p);
        }
        i = (i + 1) % products.length;
        attempts++;
      }
    }

    return suggestions;
  }, [product]);

  return (
    <div className="pt-24 pb-16 min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/" className="inline-flex items-center text-gray-600 dark:text-gray-400 mb-8 hover:text-green-600 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Shop
        </Link>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Product Image */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm flex items-center justify-center h-[500px]">
             {!imageError ? (
               <img 
                 src={product.image} 
                 alt={product.name}
                 className="max-h-full w-auto object-contain"
                 onError={() => setImageError(true)}
               />
             ) : (
               <div className="flex flex-col items-center justify-center text-gray-400">
                 <ImageOff className="h-24 w-24 mb-4" />
                 <p className="text-sm">Image not available</p>
               </div>
             )}
          </div>

          {/* Product Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Badge variant="outline" className="text-green-600 border-green-600">
                {product.category}
              </Badge>
              {product.bestSeller && product.rating > 0 && (
                <Badge className="bg-orange-500 hover:bg-orange-600">
                  Best Seller
                </Badge>
              )}
            </div>

            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {product.name}
            </h1>

            <div className="flex items-center space-x-4 mb-6">
              <div className="flex items-center text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-300'}`} 
                  />
                ))}
              </div>
              <span className="text-gray-600 dark:text-gray-400">
                ({product.rating} rating)
              </span>
            </div>

            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
              {formatPrice(product.price)}
            </div>

            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              {product.longDescription || product.description}
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {product.features?.map((feature, index) => (
                <div key={index} className="flex items-center text-gray-700 dark:text-gray-300">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span>{feature}</span>
                </div>
              )) || (
                <>
                  <div className="flex items-center text-gray-700 dark:text-gray-300">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>High Efficiency</span>
                  </div>
                  <div className="flex items-center text-gray-700 dark:text-gray-300">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>Durable Construction</span>
                  </div>
                  <div className="flex items-center text-gray-700 dark:text-gray-300">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>Easy Installation</span>
                  </div>
                  <div className="flex items-center text-gray-700 dark:text-gray-300">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>Manufacturer Warranty</span>
                  </div>
                </>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <a 
                href={getAmazonLink()} 
                target="_blank" 
                rel="noopener noreferrer sponsored"
                className="flex-1"
              >
                <Button size="lg" className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold h-14 text-lg">
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Buy on Amazon
                </Button>
              </a>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center justify-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                <Truck className="h-5 w-5 mr-2" />
                <span>Fast Shipping</span>
              </div>
              <div className="flex items-center justify-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                <Shield className="h-5 w-5 mr-2" />
                <span>Secure Transaction</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
              Related Products
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedProducts.map((p) => (
                <AffiliateProductCard key={p.id} {...p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
