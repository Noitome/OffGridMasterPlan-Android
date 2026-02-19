import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, ShoppingCart, ImageOff } from 'lucide-react';
import { formatPrice } from '@/lib/formatters';

interface AffiliateProductCardProps {
  id?: string;
  name: string;
  price: string;
  rating: number;
  image: string;
  asin?: string; // Amazon Standard Identification Number
  customLink?: string; // If not using ASIN
  category?: string;
  description?: string;
  bestSeller?: boolean;
}

// TODO: User should replace this with their actual Amazon Associate Tag
const AMAZON_TAG = 'offgridmaster-22'; 

export function AffiliateProductCard({
  id,
  name,
  price,
  rating,
  image,
  asin,
  customLink,
  category,
  description,
  bestSeller
}: AffiliateProductCardProps) {
  const [imageError, setImageError] = useState(false);
  
  // Construct the affiliate link
  // If ASIN is provided, link directly to product page
  // If customLink is provided, use that
  // Fallback to a search query
  const getAmazonLink = () => {
    if (customLink) {
      if (!customLink.includes('amazon.') || customLink.includes('tag=')) return customLink;
      const joiner = customLink.includes('?') ? '&' : '?';
      return `${customLink}${joiner}tag=${AMAZON_TAG}`;
    }
    if (asin) return `https://www.amazon.com.au/dp/${asin}?tag=${AMAZON_TAG}`;
    return `https://www.amazon.com.au/s?k=${encodeURIComponent(name)}&tag=${AMAZON_TAG}`;
  };

  const CardWrapper = ({ children }: { children: React.ReactNode }) => {
    // Removed wrapping Link to avoid nested <a> tags. 
    // Navigation is handled by specific elements (Image, Title) or "Buy Now".
    return <div className="h-full">{children}</div>;
  };

  // If image fails to load, we show a placeholder instead of removing the card
  
  return (
    <CardWrapper>
      <Card className="h-full flex flex-col hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden group">
        <div className="relative pt-4 px-4 bg-white dark:bg-gray-900">
          {bestSeller && rating > 0 && (
            <Badge className="absolute top-2 left-2 z-10 bg-orange-500 hover:bg-orange-600">
              Best Seller
            </Badge>
          )}
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-white">
             {id ? (
               <Link to={`/product/${id}`} className="block w-full h-full">
                 {!imageError ? (
                   <img 
                    src={image} 
                    alt={name}
                    className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-500"
                    onError={() => setImageError(true)}
                  />
                 ) : (
                   <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-400">
                     <ImageOff className="h-12 w-12" />
                   </div>
                 )}
               </Link>
             ) : (
               !imageError ? (
                 <img 
                  src={image} 
                  alt={name}
                  className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-500"
                  onError={() => setImageError(true)}
                />
               ) : (
                 <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-400">
                   <ImageOff className="h-12 w-12" />
                 </div>
               )
             )}
          </div>
        </div>
        
        <CardContent className="p-4 flex-grow">
          {category && (
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wider font-semibold">
              {category}
            </div>
          )}
          <h3 className="font-bold text-lg leading-tight mb-2 group-hover:text-green-600 transition-colors">
            {id ? (
              <Link to={`/product/${id}`}>
                {name}
              </Link>
            ) : (
              name
            )}
          </h3>
          {description && (
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
              {description}
            </p>
          )}
          
          <div className="flex items-center space-x-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`h-4 w-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
              />
            ))}
            <span className="text-sm text-gray-500 ml-1">({rating})</span>
          </div>
        </CardContent>
        
        <CardFooter className="p-4 pt-0 mt-auto border-t bg-gray-50 dark:bg-gray-800/50">
          <div className="w-full flex items-center justify-between pt-3">
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              {formatPrice(price)}
            </span>
            {/* If we are on the card wrapper mode (id exists), clicking button should probably still go to Amazon? 
                Or maybe we want the button to also go to product page? 
                Usually 'Buy Now' goes to cart/external. 
                Let's make 'Buy Now' go to Amazon directly even if the card goes to detail page.
                To do this, we need to stop propagation if wrapped in Link. 
            */}
            <a 
              href={getAmazonLink()} 
              target="_blank" 
              rel="noopener noreferrer sponsored"
              className="inline-block"
              onClick={(e) => e.stopPropagation()} 
            >
              <Button size="sm" className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Buy Now
              </Button>
            </a>
          </div>
        </CardFooter>
      </Card>
    </CardWrapper>
  );
}
