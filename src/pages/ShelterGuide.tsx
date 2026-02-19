import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Home, Hammer, ArrowRight, CheckCircle, AlertTriangle, Box } from 'lucide-react';
import { Link } from 'react-router-dom';

export function ShelterGuide() {
  return (
    <div className="pt-16">
      {/* Header */}
      <section className="bg-orange-50 dark:bg-gray-900 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Home className="h-16 w-16 text-orange-500 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Off-Grid Shelter & Construction
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Innovative building methods for energy-efficient, sustainable, and affordable homes.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose dark:prose-invert max-w-none">
            <h2>Rethinking Housing</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Standard construction often fails to address the needs of off-grid living. 
              Alternative building methods focus on thermal performance, local materials, and integration with natural systems.
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
                    <li>High energy efficiency</li>
                    <li>Lower material costs (often)</li>
                    <li>Unique aesthetics</li>
                    <li>Reduced carbon footprint</li>
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
                    <li>Labor intensive</li>
                    <li>Permitting challenges</li>
                    <li>Resale value uncertainty</li>
                    <li>Specialized knowledge required</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <h2>Building Methods</h2>
            <div className="grid gap-6 mb-12">
              <div className="flex items-start">
                <div className="bg-orange-100 p-3 rounded-lg mr-4">
                  <Box className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Tiny Houses</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Small, often mobile homes (under 400 sq ft). They require less energy to heat/cool and force a simplified lifestyle. Perfect for starters.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-stone-100 p-3 rounded-lg mr-4">
                  <Home className="h-6 w-6 text-stone-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Earthships & Earth-Bermed</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Structures built into the ground or using tires packed with earth. They utilize thermal mass to maintain a constant indoor temperature year-round without heating systems.
                  </p>
                </div>
              </div>

               <div className="flex items-start">
                <div className="bg-yellow-100 p-3 rounded-lg mr-4">
                  <Hammer className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Natural Building (Cob, Straw Bale)</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Using clay, sand, straw, and water. Cob is sculptural and fireproof. Straw bale offers incredible insulation values (R-30+).
                  </p>
                </div>
              </div>
            </div>

            <h2>Passive Solar Design</h2>
            <p className="mb-6">
              Regardless of the material, design is key. Orient your home to face South (in the Northern Hemisphere) to capture winter sun while shading it from summer sun.
            </p>
            
            <Card className="bg-orange-50 dark:bg-gray-800 border-orange-200 dark:border-orange-900 mb-8">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Site Orientation</h3>
                <p className="mb-4">Use our calculator to find your exact coordinates for optimal solar orientation.</p>
                <Link to="/#calculator">
                  <Button variant="outline" className="border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white">
                    Get Coordinates <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Separator className="my-12" />

            <h2>Construction Steps</h2>
            <ol className="list-decimal pl-6 space-y-4 mb-12">
              <li><strong>Design & Permits:</strong> Create plans that meet local codes (or find a county with no codes).</li>
              <li><strong>Foundation:</strong> The most critical part. Rubble trench, slab, or pier foundation depending on soil.</li>
              <li><strong>Framing/Walls:</strong> The main structure.</li>
              <li><strong>Roofing:</strong> Dry it in quickly. Design for rainwater catchment.</li>
              <li><strong>Systems:</strong> Install rough electrical and plumbing before finishing walls.</li>
            </ol>
          </div>
        </div>
      </section>
    </div>
  );
}
