import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Sun, Battery, ArrowRight, CheckCircle, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AffiliateProductCard } from '@/components/AffiliateProductCard';
import { products } from '@/data/products';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';

export function SolarGuide() {
  const panelTypeRows = [
    {
      type: 'Monocrystalline (rigid)',
      efficiency: '19–23%',
      shade: 'Good',
      heat: 'Good',
      bestFor: 'Most rooftops + ground mounts',
      notes: 'Highest efficiency per m².',
    },
    {
      type: 'Polycrystalline (rigid)',
      efficiency: '15–18%',
      shade: 'OK',
      heat: 'OK',
      bestFor: 'Budget builds with space',
      notes: 'Cheaper; needs more area for same watts.',
    },
    {
      type: 'Thin-film (rigid)',
      efficiency: '10–13%',
      shade: 'Better',
      heat: 'Better',
      bestFor: 'Hot sites + diffuse light',
      notes: 'Lower efficiency; sometimes better in heat.',
    },
    {
      type: 'Flexible (ETFE)',
      efficiency: '10–18%',
      shade: 'OK',
      heat: 'OK',
      bestFor: 'Vans, boats, curved surfaces',
      notes: 'Lightweight; shorter lifespan vs rigid.',
    },
    {
      type: 'Active-cooled panels (fan/duct)',
      efficiency: 'Depends',
      shade: 'Depends',
      heat: 'Best',
      bestFor: 'Niche: extreme heat + constrained area',
      notes: 'More complexity; helps when heat derates output.',
    },
  ] as const;

  const panelEfficiencyChartData = [
    { type: 'Mono', efficiency: 21 },
    { type: 'Poly', efficiency: 16.5 },
    { type: 'Thin-film', efficiency: 11.5 },
    { type: 'Flexible', efficiency: 15 },
  ];

  const featuredVideos = [
    {
      id: 'vid_prowse_crash_course_10kw',
      title: 'Offgrid Solar Beginner Crash Course',
      url: 'https://www.youtube.com/watch?v=rRqV8BHE8lY',
      summary: 'Fast overview of modern off-grid systems and why protection + cable sizing matters.',
    },
    {
      id: 'pl_explorist_victron_install',
      title: 'Complete Off-Grid Solar Install (Playlist)',
      url: 'https://www.youtube.com/playlist?list=PLmvhcyi4n0TU6HlMaQiCUwC20DBlyv6s_',
      summary: 'High quality installs and wiring practices; great for avoiding beginner mistakes.',
    },
    {
      id: 'vid_solar_12v_prowse_100w',
      title: 'Build Your First Solar Power System (12V basics)',
      url: 'https://www.youtube.com/watch?v=uobUwjCLfok',
      summary: 'Beginner wiring order and basic components: PV → controller → battery → inverter.',
    },
    {
      id: 'vid_regrets_walkthrough',
      title: 'Off-Grid Solar 1 Year | Regrets & Walk-through',
      url: 'https://www.youtube.com/watch?v=GkFRcz0gVCM',
      summary: 'Reality check: storage sizing, cloudy-week planning, and what people wish they did first.',
    },
  ];

  return (
    <div className="pt-16">
      {/* Header */}
      <section className="bg-green-50 dark:bg-gray-900 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Sun className="h-16 w-16 text-yellow-500 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Complete Solar Panel Guide 2024
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Everything you need to know about designing, sizing, and installing a solar power system for off-grid living.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose dark:prose-invert max-w-none">
            <h2>Why Solar?</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Solar energy is the most popular choice for off-grid living due to its reliability, scalability, and decreasing costs. 
              With a properly sized system, you can power everything from lights to heavy appliances.
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
                    <li>Silent operation</li>
                    <li>Low maintenance</li>
                    <li>Long lifespan (25+ years)</li>
                    <li>Modular and scalable</li>
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
                    <li>Dependent on weather</li>
                    <li>High upfront cost</li>
                    <li>Requires battery storage for night</li>
                    <li>Space requirements</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <h2>System Components</h2>
            <div className="grid gap-6 mb-12">
              <div className="flex items-start">
                <div className="bg-blue-100 p-3 rounded-lg mr-4">
                  <Sun className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Solar Panels</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Capture sunlight and convert it into DC electricity. Monocrystalline panels are most efficient but more expensive, while polycrystalline are cheaper but require more space.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-green-100 p-3 rounded-lg mr-4">
                  <Battery className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Charge Controller</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Regulates the voltage and current coming from the solar panels going to the battery. MPPT controllers are recommended for maximum efficiency.
                  </p>
                </div>
              </div>

               <div className="flex items-start">
                <div className="bg-purple-100 p-3 rounded-lg mr-4">
                  <Battery className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Battery Bank</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Stores energy for use when the sun isn't shining. LiFePO4 (Lithium Iron Phosphate) is the current gold standard for off-grid systems due to longevity and depth of discharge.
                  </p>
                </div>
              </div>
            </div>

            <h2>Compare Solar Options (At a Glance)</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              These are the trade-offs that matter when you want the differences to be instantly visible.
            </p>

            <Card className="not-prose mb-10">
              <CardHeader>
                <CardTitle>Panel types comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Type</TableHead>
                      <TableHead>Typical efficiency</TableHead>
                      <TableHead>Shade tolerance</TableHead>
                      <TableHead>Heat tolerance</TableHead>
                      <TableHead>Best for</TableHead>
                      <TableHead>Notes</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {panelTypeRows.map((row) => (
                      <TableRow key={row.type}>
                        <TableCell className="font-medium">{row.type}</TableCell>
                        <TableCell>{row.efficiency}</TableCell>
                        <TableCell>{row.shade}</TableCell>
                        <TableCell>{row.heat}</TableCell>
                        <TableCell>{row.bestFor}</TableCell>
                        <TableCell className="text-muted-foreground">{row.notes}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card className="not-prose mb-12">
              <CardHeader>
                <CardTitle>Typical efficiency by panel family</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  className="min-h-[260px] w-full"
                  config={{
                    efficiency: {
                      label: 'Efficiency (%)',
                      color: 'hsl(var(--chart-1))',
                    },
                  }}
                >
                  <BarChart data={panelEfficiencyChartData} margin={{ left: 8, right: 8 }}>
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="type" tickLine={false} axisLine={false} />
                    <YAxis tickLine={false} axisLine={false} width={30} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="efficiency" fill="var(--color-efficiency)" radius={6} />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>

            <h2>Sizing Your System</h2>
            <p className="mb-6">
              To size your system correctly, you need to know your daily energy consumption in watt-hours (Wh).
            </p>
            
            <Card className="bg-blue-50 dark:bg-gray-800 border-blue-200 dark:border-blue-900 mb-8">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Need help calculating?</h3>
                <p className="mb-4">Use our advanced off-grid calculator to estimate your exact needs based on your appliances and location.</p>
                <Link to="/#calculator">
                  <Button>
                    Go to Calculator <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-green-50 dark:bg-gray-800 border-green-200 dark:border-green-900 mb-8 not-prose">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">Want the full DIY install playbook?</h3>
                <p className="mb-4 text-gray-600 dark:text-gray-300">
                  Deep dive on system voltage, PV strings, MPPT sizing, battery options (including upcycled EV modules), and the protection/wiring that stops gear from cooking itself.
                </p>
                <Button asChild>
                  <Link to="/resources/energy/diy-installs">
                    Read DIY Solar Installs <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="not-prose mb-12">
              <CardHeader>
                <CardTitle>Videos worth watching</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {featuredVideos.map((video) => (
                    <Card key={video.id} className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                      <CardHeader>
                        <CardTitle className="text-base">{video.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="grid gap-3">
                        <div className="text-sm text-gray-600 dark:text-gray-300">{video.summary}</div>
                        <div className="flex gap-3 flex-wrap">
                          <Button asChild variant="outline" size="sm">
                            <a href={video.url} target="_blank" rel="noopener noreferrer">Watch</a>
                          </Button>
                          <Button asChild variant="ghost" size="sm">
                            <Link to="/resources/energy/diy-installs">More solar build videos</Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Separator className="my-12" />

            <h2>Recommended Solar Gear</h2>
            <p className="mb-8 text-lg text-gray-600 dark:text-gray-300">
              We've curated the best-in-class equipment to get your system running reliably.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-12 not-prose">
              {products
                .filter(p => ['anker-solix-ps100-100w', 'ecoflow-400w-portable-panel', 'victron-smartsolar-mppt-100-30', 'victron-smartshunt-500a', 'renogy-48v-50ah-lifepo4', 'pure-sine-inverter-48v-1500w'].includes(p.id))
                .map((product) => (
                  <AffiliateProductCard key={product.id} {...product} />
              ))}
            </div>

            <Separator className="my-12" />

            <h2>Installation Steps</h2>
            <ol className="list-decimal pl-6 space-y-4 mb-12">
              <li><strong>Site Assessment:</strong> Determine the best location with maximum sun exposure (face North in the Southern Hemisphere; face South in the Northern Hemisphere).</li>
              <li><strong>Mounting:</strong> Install racking system on roof or ground mount.</li>
              <li><strong>Wiring:</strong> Connect panels in series/parallel configuration based on voltage needs.</li>
              <li><strong>Connection:</strong> Connect to charge controller, then battery bank, then inverter.</li>
              <li><strong>Safety:</strong> Install proper fusing and breakers at each connection point.</li>
            </ol>
          </div>
        </div>
      </section>
    </div>
  );
}
