import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Leaf, Sprout, ArrowRight, CheckCircle, AlertTriangle, Apple } from 'lucide-react';
import { Link } from 'react-router-dom';

export function FoodGuide() {
  return (
    <div className="pt-16">
      {/* Header */}
      <section className="bg-green-50 dark:bg-gray-900 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Leaf className="h-16 w-16 text-green-500 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Sustainable Food Production Guide
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            From permaculture design to food preservation, learn how to feed yourself and your family.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose dark:prose-invert max-w-none">
            <h2>Why Grow Your Own Food?</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Food sovereignty is a cornerstone of the off-grid lifestyle. 
              Reducing reliance on the industrial food chain leads to better health, lower costs, and true independence.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    Pros
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li>Superior nutritional value</li>
                    <li>No pesticides or GMOs</li>
                    <li>Food security</li>
                    <li>Connection to nature</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2" />
                    Cons
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li>Time and labor intensive</li>
                    <li>Learning curve</li>
                    <li>Weather dependent</li>
                    <li>Requires planning (preservation)</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <h2>Production Methods</h2>
            <div className="grid gap-6 mb-12">
              <div className="flex items-start">
                <div className="bg-green-100 p-3 rounded-lg mr-4">
                  <Sprout className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Permaculture</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    A design philosophy working with nature rather than against it. Includes food forests, swales for water retention, and companion planting.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-blue-100 p-3 rounded-lg mr-4">
                  <Apple className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Greenhouses & Aquaponics</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Extend your growing season with a greenhouse. Aquaponics combines fish farming with hydroponics for a closed-loop protein and vegetable system.
                  </p>
                </div>
              </div>

               <div className="flex items-start">
                <div className="bg-yellow-100 p-3 rounded-lg mr-4">
                  <Leaf className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Food Preservation</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Growing is only half the battle. Canning, dehydrating, fermenting, and root cellaring allow you to eat your harvest all winter long.
                  </p>
                </div>
              </div>
            </div>

            <h2>Planning Your Garden</h2>
            <p className="mb-6">
              Start small. A 100 sq ft raised bed can produce a significant amount of salad greens and tomatoes. 
              Focus on calorie-dense crops like potatoes, squash, and beans for true subsistence.
            </p>
            
            <Card className="bg-green-50 dark:bg-gray-800 border-green-200 dark:border-green-900 mb-8">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Climate Matters</h3>
                <p className="mb-4">Check your growing zone and rainfall data to choose the right crops.</p>
                <Link to="/#calculator">
                  <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white">
                    Check Climate Data <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Separator className="my-12" />

            <h2>Steps to Start</h2>
            <ol className="list-decimal pl-6 space-y-4 mb-12">
              <li><strong>Observe:</strong> Watch your land for a year. Where does the sun hit? Where does water flow?</li>
              <li><strong>Soil Building:</strong> Start composting immediately. Healthy soil is the key.</li>
              <li><strong>Infrastructure:</strong> Build fences (deer proof!), raised beds, or a chicken coop.</li>
              <li><strong>Plant:</strong> Start with easy crops like radishes, lettuce, and zucchini.</li>
              <li><strong>Expand:</strong> Add fruit trees and perennials for long-term yields.</li>
            </ol>
          </div>
        </div>
      </section>
    </div>
  );
}
