import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Battery, CheckCircle, Sun, Wrench } from 'lucide-react';
import { Link } from 'react-router-dom';

export function SolarDIYInstalls() {
  const buildVideos = [
    {
      id: 'vid_prowse_crash_course_10kw',
      title: 'Offgrid Solar Beginner Crash Course',
      url: 'https://www.youtube.com/watch?v=rRqV8BHE8lY',
      summary:
        'Crash course on modern high-output all-in-one systems: PV → inverter, battery → inverter, AC → breaker panel; stresses wire gauge and torque.',
    },
    {
      id: 'pl_explorist_victron_install',
      title: 'Complete Off-Grid Solar Install (Playlist)',
      url: 'https://www.youtube.com/playlist?list=PLmvhcyi4n0TU6HlMaQiCUwC20DBlyv6s_',
      summary:
        'Pro-grade installs; detailed sizing, Victron-centric wiring, cable management and vibration-safe practice.',
    },
    {
      id: 'vid_solar_12v_prowse_100w',
      title: 'Build Your First Solar Power System (12V basics)',
      url: 'https://www.youtube.com/watch?v=uobUwjCLfok',
      summary:
        'Beginner 12V solar demo: 100W panel → controller → lead-acid → inverter; stresses correct connection order (battery to controller first).',
    },
    {
      id: 'vid_solar_3kw_30min_prowse',
      title: 'Build a 3,000W Off-Grid Solar System in 30 Min',
      url: 'https://www.youtube.com/watch?v=Pd5IqeBq42k',
      summary:
        'Fast build using all-in-one inverter + 48V server-rack battery; compares well to power stations; shows high-voltage PV input capability.',
    },
    {
      id: 'vid_tinyshiny_simple',
      title: 'Off-Grid Solar Made SIMPLE',
      url: 'https://www.youtube.com/watch?v=VpG0jaiXedk',
      summary:
        'Shipping-container install with used panels, server rack battery, Victron inverter + Cerbo monitoring; covers grounding/lightning ideas.',
    },
    {
      id: 'vid_regrets_walkthrough',
      title: 'Off-Grid Solar 1 Year | Regrets & Walk-through',
      url: 'https://www.youtube.com/watch?v=GkFRcz0gVCM',
      summary:
        'One-year review; key regret is insufficient battery for cloudy stretches; shows DIY ground mount surviving high winds.',
    },
    {
      id: 'vid_sungold_6_5kw_install',
      title: 'SungoldPower 6.5kW Inverter Install',
      url: 'https://www.youtube.com/watch?v=rP8dgdEjfWQ',
      summary:
        'Mounting + wiring a 48V split-phase all-in-one inverter; demonstrates monitoring and load testing (A/C).',
    },
    {
      id: 'vid_power_plant_upgrade',
      title: 'Couple Builds A Solar POWER PLANT',
      url: 'https://www.youtube.com/watch?v=436kcVOaEGk',
      summary:
        'Residential scale-up to >13kW PV with multiple MPPTs and sizable battery bank; shows running heavy loads under cloudy conditions.',
    },
    {
      id: 'vid_nz_800w_10yrs',
      title: '10 Years Off-Grid on Just 800W (Efficiency first)',
      url: 'https://www.youtube.com/watch?v=TK6nFUQgozo',
      summary:
        'Efficiency-first off-grid living: tiny PV + small battery + gas/wood; highlights appliance choices and lifestyle levers.',
    },
  ];

  return (
    <div className="pt-16">
      <section className="bg-green-50 dark:bg-gray-900 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Wrench className="h-16 w-16 text-green-600 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Off-Grid Solar Systems &amp; DIY Installs
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            A practical, DIY-first guide to sizing, selecting gear, and wiring a reliable solar + battery system without paying overs.
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
                    <div className="text-sm text-gray-600 dark:text-gray-300">List loads, pick voltage, rough size PV + battery.</div>
                  </div>
                  <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                    <div className="font-semibold mb-1">Stage 2</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Lock in components, protection, cable runs, and switching.</div>
                  </div>
                  <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                    <div className="font-semibold mb-1">Stage 3</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Install, commission, load-test, then add upgrades.</div>
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

            <h2>What an off-grid solar system actually is</h2>
            <ul>
              <li><strong>PV array</strong> (panels wired series/parallel)</li>
              <li><strong>Charge controller</strong> (usually MPPT) to charge the battery</li>
              <li><strong>Battery</strong> to run night + cloudy days</li>
              <li><strong>Inverter</strong> for AC loads (optional)</li>
              <li><strong>Protection + switching</strong> (fuses/breakers, isolation, busbars, earthing)</li>
            </ul>

            <h2>Stage 1: Size it so it doesn’t annoy you</h2>
            <h3>1) List loads in watt-hours per day</h3>
            <p>
              For each appliance: <strong>Wh/day = watts × hours/day</strong>. For cycling loads (fridges, pumps), measure with a plug-in meter if you can.
            </p>

            <h3>2) Choose system voltage</h3>
            <div className="grid md:grid-cols-3 gap-4 not-prose my-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Battery className="h-5 w-5" />12V</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-gray-600 dark:text-gray-300">Small setups and short cable runs.</CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Battery className="h-5 w-5" />24V</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-gray-600 dark:text-gray-300">Good for cabins/sheds; easier wiring than 12V.</CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Battery className="h-5 w-5" />48V</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-gray-600 dark:text-gray-300">Best for bigger systems; lower current and losses.</CardContent>
              </Card>
            </div>
            <p>
              Higher voltage = lower amps for the same power, which usually means cheaper cable and fewer hot joints.
            </p>

            <h3>3) Battery capacity (usable kWh)</h3>
            <p>
              Pick your autonomy (days of storage). One day is fine with generator backup; two to three days is comfier.
            </p>
            <ul>
              <li><strong>Usable kWh ≈</strong> (daily load Wh × days) / 1000</li>
              <li>Lead-acid hates deep daily discharge; lithium needs a proper BMS and protection.</li>
            </ul>

            <h3>4) Solar array size (W)</h3>
            <ul>
              <li><strong>PV watts ≈</strong> daily load Wh ÷ (peak sun hours × 0.7)</li>
              <li>Winter can be brutal: size for your worst month if you want fewer genny days.</li>
            </ul>

            <Separator className="my-12" />

            <h2>Stage 2: Gear that doesn’t suck</h2>

            <h3 className="flex items-center gap-2"><Sun className="h-5 w-5 text-yellow-500" />Panels</h3>
            <ul>
              <li>Used panels can be a ripper deal if you test them (Voc/Isc) before building strings.</li>
              <li>Minimise shading and give panels airflow underneath.</li>
            </ul>

            <h3>MPPT charge controller</h3>
            <ul>
              <li>MPPT lets you run higher-voltage PV strings, reducing cable size and improving low-light charging.</li>
              <li>Size it for battery voltage and PV input limits (especially cold morning Voc rise).</li>
            </ul>

            <h3>Battery options (DIY reality check)</h3>
            <ul>
              <li><strong>LiFePO4</strong>: common off-grid choice, still needs correct fusing and a solid BMS.</li>
              <li><strong>Upcycled EV modules (e.g. Nissan Leaf)</strong>: great $/kWh, but design properly (balancing, contactors, pre-charge, monitoring).</li>
              <li><strong>Lead-acid</strong>: cheap upfront, heavy, short life if you deep-cycle it hard.</li>
            </ul>

            <h3>Protection + wiring (this is where DIY systems win or lose)</h3>
            <ul>
              <li>Use DC-rated breakers/isolators, correct fuses, busbars, proper lugs and crimping.</li>
              <li>Plan cable runs to minimise voltage drop; higher system voltage helps a lot.</li>
              <li>Earthing and surge protection matter, especially rural sites.</li>
            </ul>

            <Separator className="my-12" />

            <h2>Stage 3: Install and commission</h2>
            <ol>
              <li>Mount panels to avoid shade and heat build-up.</li>
              <li>Build PV strings that stay under controller max PV input even in cold weather.</li>
              <li>Install protection and isolation on PV, controller-to-battery, battery main, and inverter feeds.</li>
              <li>Connect battery to controller first, then PV, then loads.</li>
              <li>Load-test and check cable temps, connectors, and inverter alarms.</li>
            </ol>

            <h2>Build videos worth watching</h2>
            <p>
              These are the quickest way to sanity-check your plan (especially protection, cable sizing, and commissioning).
            </p>
            <div className="grid md:grid-cols-2 gap-4 not-prose my-6">
              {buildVideos.map((video) => (
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

            <h2>DIY upgrades + symbiotic links</h2>
            <ul>
              <li><strong>Solar pumping</strong>: pump when the sun’s up and store water high (water becomes “storage”).</li>
              <li><strong>Trackers</strong>: old motors can boost morning/afternoon yield.</li>
              <li><strong>Water-from-air</strong>: dehumidifier hacks can make water and dry a space (energy permitting).</li>
            </ul>

            <Card className="not-prose mt-10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-green-600" />Next step</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                <div className="text-sm text-gray-600 dark:text-gray-300 flex-1">
                  If you’re ready, jump back to the Solar Guide and use the calculator to size a first-pass system.
                </div>
                <div className="flex gap-3">
                  <Button asChild variant="outline"><Link to="/resources/energy">Solar Guide</Link></Button>
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
