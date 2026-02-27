import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Wind, ArrowRight, CheckCircle, AlertTriangle, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AffiliateProductCard } from '@/components/AffiliateProductCard';
import { products } from '@/data/products';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';

export function WindGuide() {
  const turbineTypeRows = [
    {
      type: 'HAWT (horizontal-axis)',
      bestFor: 'Most real power output (clean wind + tall tower)',
      pros: 'Best efficiency; proven designs.',
      cons: 'Needs height and good siting; tower cost dominates.',
    },
    {
      type: 'VAWT (vertical-axis)',
      bestFor: 'Demonstrations and niche turbulent sites',
      pros: 'Takes wind from any direction; often simpler yawing.',
      cons: 'Usually lower real-world output per rated watt.',
    },
    {
      type: 'Airborne wind (kite systems)',
      bestFor: 'Experimental / emerging tech',
      pros: 'Access higher-altitude winds.',
      cons: 'Complex control and permitting; not common for DIY.',
    },
    {
      type: 'Hydrokinetic (underwater)',
      bestFor: 'Moving water, not wind',
      pros: 'Runs 24/7 if flow is consistent.',
      cons: 'Different resource; see Micro-Hydro.',
    },
    {
      type: 'Archimedes Spiral (Liam F1)',
      bestFor: 'Urban/Turbulent wind areas',
      pros: 'Silent, captures wind at 60° angles, high efficiency.',
      cons: 'Newer tech, harder to source DIY parts, expensive.',
    },
  ] as const;

  const windPowerChartData = [
    { speed: '3', relativePower: 1 },
    { speed: '4', relativePower: Math.pow(4 / 3, 3) },
    { speed: '5', relativePower: Math.pow(5 / 3, 3) },
    { speed: '6', relativePower: Math.pow(6 / 3, 3) },
    { speed: '7', relativePower: Math.pow(7 / 3, 3) },
  ];

  const windVideos = [
    {
      id: 'vid_scoraig_workshop_2010',
      title: 'Scoraig wind turbine workshop 2010',
      url: 'https://www.youtube.com/watch?v=gsJ7WIpoWks',
      summary: 'Hands-on workshop footage: blades, alternator concepts, and practical build context.',
    },
    {
      id: 'vid_scoraig_workshop_2012',
      title: 'Scoraig wind turbine Workshop 2012',
      url: 'https://www.youtube.com/watch?v=kRGfu342bFY',
      summary: 'More workshop coverage for DIY-scale turbines and real-world constraints.',
    },
    {
      id: 'vid_raise_tower_short',
      title: 'Raising a Wind Turbine Tower (short)',
      url: 'https://www.youtube.com/shorts/9vS3w6n4saw',
      summary: 'Quick visual of tower raising mechanics and why towers are a major part of wind.',
    },
    {
      id: 'ch_scoraig',
      title: 'Hugh Piggott (Scoraig Wind) channel',
      url: 'https://www.youtube.com/@scoraigwind',
      summary: 'A strong library of small wind + micro-hydro content from a long-time practitioner.',
    },
  ];

  return (
    <div className="pt-16">
      {/* Header */}
      <section className="bg-gray-100 dark:bg-gray-900 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Wind className="h-16 w-16 text-blue-500 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Wind Turbine Calculator & Guide
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Harness the power of the wind. Calculate potential, choose the right turbine, and achieve energy independence.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose dark:prose-invert max-w-none">
            <h2>Is Wind Power Right for You?</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Wind energy is a powerful complement to solar, especially in winter or stormy weather. 
              However, it requires specific site conditions—consistent wind speeds of at least 4–5 m/s (9–11 mph).
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
                    <li>Generates power at night</li>
                    <li>Works in storms/cloudy weather</li>
                    <li>High output per square foot</li>
                    <li>Compliments solar perfectly</li>
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
                    <li>Requires consistent wind</li>
                    <li>Moving parts (maintenance)</li>
                    <li>Noise considerations</li>
                    <li>Height requirements (zoning)</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <h2>Calculate Your Wind Potential</h2>
            <p className="mb-6">
              Our advanced calculator uses historical weather data for your exact location to estimate wind energy potential.
            </p>

            <h2>Wind Turbine Types (At a Glance)</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              If you want everything in one place: horizontal-axis vs vertical-axis, plus where “underwater turbines” actually fit.
            </p>

            <Card className="not-prose mb-10">
              <CardHeader>
                <CardTitle>Quick comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Type</TableHead>
                      <TableHead>Best for</TableHead>
                      <TableHead>Pros</TableHead>
                      <TableHead>Cons</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {turbineTypeRows.map((row) => (
                      <TableRow key={row.type}>
                        <TableCell className="font-medium">{row.type}</TableCell>
                        <TableCell>{row.bestFor}</TableCell>
                        <TableCell>{row.pros}</TableCell>
                        <TableCell className="text-muted-foreground">{row.cons}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="mt-4">
                  <Button asChild variant="link" className="p-0 h-auto">
                    <Link to="/resources/water">Micro-hydro guide (underwater turbines)</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="not-prose mb-12">
              <CardHeader>
                <CardTitle>Why wind speed matters so much</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  Power in the wind scales with the cube of wind speed (
                  <span className="font-mono">v³</span>). This chart shows relative power in the wind compared to 3 m/s.
                </div>
                <ChartContainer
                  className="min-h-[260px] w-full"
                  config={{
                    relativePower: {
                      label: 'Relative power',
                      color: 'hsl(var(--chart-2))',
                    },
                  }}
                >
                  <BarChart data={windPowerChartData} margin={{ left: 8, right: 8 }}>
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="speed" tickLine={false} axisLine={false} />
                    <YAxis tickLine={false} axisLine={false} width={30} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="relativePower" fill="var(--color-relativePower)" radius={6} />
                  </BarChart>
                </ChartContainer>
                <div className="mt-2 text-xs text-muted-foreground">
                  Wind speed is in m/s. This is not turbine output; it’s the energy available in the wind.
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-blue-50 dark:bg-gray-800 border-blue-200 dark:border-blue-900 mb-8">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Start Calculation</h3>
                <p className="mb-4">
                  1. Enter your address below to get local wind speed data.<br/>
                  2. We'll check if your average wind speed meets the 14 km/h threshold.<br/>
                  3. Estimate annual power generation based on turbine size.
                </p>
                <Link to="/#calculator">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Go to Wind Calculator <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Separator className="my-12" />

            <Card className="not-prose mb-12">
              <CardHeader>
                <CardTitle>Videos worth watching</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {windVideos.map((video) => (
                    <Card key={video.id} className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                      <CardHeader>
                        <CardTitle className="text-base">{video.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="grid gap-3">
                        <div className="text-sm text-gray-600 dark:text-gray-300">{video.summary}</div>
                        <div>
                          <Button asChild variant="outline" size="sm">
                            <a href={video.url} target="_blank" rel="noopener noreferrer">Watch</a>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Separator className="my-12" />

            <h2>Installation Basics</h2>
            <ol className="list-decimal pl-6 space-y-4 mb-12">
              <li><strong>Siting:</strong> Turbines need clean wind. Rule of thumb: rotor should be ~10 m above any obstacle within ~100 m (30 ft above within 300 ft).</li>
              <li><strong>Tower:</strong> The most expensive part. Guyed towers are cheaper but require more space. Monopoles look cleaner but cost more.</li>
              <li><strong>Wiring:</strong> Run heavy gauge wire to minimize voltage drop from the tower to your battery bank.</li>
              <li><strong>Diversion Load:</strong> Essential safety feature. When batteries are full, excess power must be dumped to a heater or resistor to prevent turbine over-speeding.</li>
            </ol>
          </div>
        </div>
      </section>
    </div>
  );
}
