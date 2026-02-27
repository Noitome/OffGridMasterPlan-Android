import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Battery, CheckCircle, AlertTriangle, Recycle, Zap, Wind, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AffiliateProductCard } from '@/components/AffiliateProductCard';
import { products } from '@/data/products';

export function EnergyStorageGuide() {
  const featuredBatteryIds = [
    'renogy-48v-50ah-lifepo4',
    'victron-smartshunt-500a',
    'pure-sine-inverter-48v-1500w',
  ];

  const batteryVideos = [
    {
      id: 'vid_grassfed_battleborn',
      title: 'Off-Grid Solar Battery Bank and Water Storage',
      url: 'https://www.youtube.com/watch?v=fvA-84fhQuA',
      summary: 'System tour with Battle Born LiFePO4; shows measuring loads to size storage using a plug-in meter approach.',
    },
    {
      id: 'vid_prowse_32kwh_lifepo4',
      title: 'HUGE 32kWh LiFePO4 DIY Battery',
      url: 'https://www.youtube.com/watch?v=vU7saFzCTA8',
      summary: 'Massive 16S 48V pack with very large cells; highlights mechanical handling and safety due to weight/energy.',
    },
    {
      id: 'vid_ray_builds_lifepo4',
      title: "Let's Build a Battery!!! DIY Lifepo4",
      url: 'https://www.youtube.com/watch?v=0jAXjoC97dk',
      summary: '280Ah LiFePO4 pack assembly; top-balancing, BMS wiring, torque discipline.',
    },
    {
      id: 'vid_leaf_best_battery_p1',
      title: 'Why the Nissan Leaf is the best battery for off-grid solar (Part 1)',
      url: 'https://www.youtube.com/watch?v=J68NojZ8j-E',
      summary: 'Why Leaf modules are flexible (voltage config), BMS-friendly, and comparatively abuse-tolerant; discusses series/parallel strategy.',
    },
    {
      id: 'vid_benjamin_leaf_48v_build',
      title: 'DIY 48V Lithium Battery (Nissan Leaf modules)',
      url: 'https://www.youtube.com/watch?v=juk39pA7E-E',
      summary: 'Step-by-step 48V pack build from Leaf modules with compression, busbar mods, and BMS installation.',
    },
    {
      id: 'vid_prowse_bigbattery_leaf',
      title: '48V Nissan Leaf Used-Cell Solar Battery Pack (Review)',
      url: 'https://www.youtube.com/watch?v=rbkE4jxk3u8',
      summary: 'Reviews a prebuilt used-Leaf-cell pack; notes typical capacity fade and safety/placement considerations.',
    },
    {
      id: 'vid_dala_leaf_to_fronius',
      title: 'Connect used EV packs to an inverter (CAN → Modbus)',
      url: 'https://www.youtube.com/watch?v=XHZWGLzT7gg',
      summary: 'Connect whole Leaf pack to hybrid inverter via CAN→Modbus translation using microcontroller; avoids disassembly.',
    },
  ];

  return (
    <div className="pt-16">
      <section className="bg-emerald-50 dark:bg-gray-900 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Battery className="h-16 w-16 text-emerald-600 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Battery Storage for Off-Grid (DIY-First)
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Pick the right chemistry, size it for real life, and build it safely so you’re not babysitting the system.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose dark:prose-invert max-w-none">
            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 not-prose">
              <CardHeader>
                <CardTitle>Staged plan (no overwhelm)</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                    <div className="font-semibold mb-1">Stage 1</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Define your battery job and daily load.</div>
                  </div>
                  <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                    <div className="font-semibold mb-1">Stage 2</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Choose chemistry and pack format.</div>
                  </div>
                  <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                    <div className="font-semibold mb-1">Stage 3</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Protection, wiring, commissioning, monitoring.</div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button asChild variant="outline">
                    <Link to="/resources/energy">Back to Energy Guide</Link>
                  </Button>
                  <Button asChild>
                    <Link to="/#calculator">Size my system</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Separator className="my-12" />

            <h2>Stage 1: What do you want the batteries to do?</h2>
            <p>
              Batteries aren’t for “being off-grid”. They’re for specific jobs: covering nights, covering cloudy days, handling surge loads,
              and smoothing weird loads like pumps.
            </p>
            <ul>
              <li><strong>Overnight-only</strong>: smaller battery, bigger reliance on sun/generator.</li>
              <li><strong>2–3 days autonomy</strong>: more comfort, fewer “start the genny” mornings.</li>
              <li><strong>Surge handling</strong>: motors and compressors; sometimes inverter spec is the real limiter.</li>
            </ul>
            <p>
              Rough sizing: <strong>usable kWh ≈</strong> (daily load Wh × days) / 1000. Then add headroom so the system isn’t running at its limits.
            </p>

            <h2>Stage 2: Chemistry choices (practical view)</h2>
            <div className="grid gap-6 mb-10">
              <div className="flex items-start">
                <div className="bg-emerald-100 p-3 rounded-lg mr-4">
                  <CheckCircle className="h-6 w-6 text-emerald-700" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">LiFePO4 (the default winner)</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    High usable capacity, good cycle life, and predictable behaviour. Still needs correct fusing, disconnects, and a real BMS.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-purple-100 p-3 rounded-lg mr-4">
                  <Zap className="h-6 w-6 text-purple-700" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Redox Flow (The "Forever" Battery)</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Uses liquid electrolytes (like Iron or Vanadium) in tanks. 
                    <strong>Pros:</strong> 100% depth of discharge, fire-safe, lasts 20+ years. 
                    <strong>Cons:</strong> Bulky, complex pumps/plumbing, lower efficiency (70%), hard to DIY.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-cyan-100 p-3 rounded-lg mr-4">
                  <Wind className="h-6 w-6 text-cyan-700" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Hydrogen / "Power Paste"</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    <strong>The Frontier:</strong> Store excess solar by electrolyzing water into Hydrogen, stored in tanks or magnesium-hydride "paste". 
                    Incredible energy density for seasonal storage, but currently very expensive and complex for residential use.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-indigo-100 p-3 rounded-lg mr-4">
                  <ArrowRight className="h-6 w-6 text-indigo-700" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Gravity Storage (Hillside Hydro)</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    <strong>The "Low Tech" Giant:</strong> Pump water uphill to a tank/pond when sunny. Run it down through a turbine at night.
                    Requires significant elevation change (head) and water volume. 1m³ of water falling 100m = ~0.27 kWh.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-yellow-100 p-3 rounded-lg mr-4">
                  <AlertTriangle className="h-6 w-6 text-yellow-700" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Lead-acid (cheap upfront, costs you later)</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Works and is simple, but heavy and punishing if you deep-cycle daily. You often end up buying twice.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-blue-100 p-3 rounded-lg mr-4">
                  <Recycle className="h-6 w-6 text-blue-700" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Second-life EV modules (ripper value if you do it safely)</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Great $/kWh and very modular, but you’re signing up for testing, packaging, safe busbar work, and proper BMS discipline.
                  </p>
                </div>
              </div>
            </div>

            <h2>Stage 3: Safety and protection that stops disasters</h2>
            <ul>
              <li><strong>Main battery fuse</strong> close to the battery, sized for the cable.</li>
              <li><strong>Battery disconnect</strong> you can reach fast.</li>
              <li><strong>BMS integration</strong>: know what actually disconnects on fault (inverter, contactor, or both).</li>
              <li><strong>Compression + enclosure</strong> for DIY packs; avoid exposed live busbars.</li>
              <li><strong>Monitoring</strong>: shunt, cell voltages (if DIY), and temperature.</li>
            </ul>

            <Separator className="my-12" />

            <h2>Recommended Battery Gear</h2>
            <p className="mb-8 text-lg text-gray-600 dark:text-gray-300">
              Curated picks to buy instead of overthinking the shopping list.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-12 not-prose">
              {products
                .filter((p) => featuredBatteryIds.includes(p.id))
                .map((product) => (
                  <AffiliateProductCard key={product.id} {...product} />
                ))}
            </div>

            <h2>Video guides (battery-focused)</h2>
            <div className="grid md:grid-cols-2 gap-4 not-prose my-6">
              {batteryVideos.map((video) => (
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

            <Card className="not-prose mt-10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-emerald-600" />Next step
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                <div className="text-sm text-gray-600 dark:text-gray-300 flex-1">
                  If you’re building a full system, pair this with the DIY Solar Installs guide and size the whole chain end-to-end.
                </div>
                <div className="flex gap-3">
                  <Button asChild variant="outline"><Link to="/resources/energy/diy-installs">DIY Solar Installs</Link></Button>
                  <Button asChild><Link to="/#calculator">Calculator</Link></Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
