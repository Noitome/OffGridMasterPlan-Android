import { useEffect, useState } from 'react';
import { Check, AlertTriangle, Wrench, Thermometer, Calendar, Clock, ChevronRight, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function BatteryMaintenanceGuide() {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['visual-inspection', 'voltage-testing', 'sg-check', 'terminal-cleaning', 'temp-monitoring', 'replacement'];

      for (const section of sections) {
        const element = document.getElementById(section);
        if (!element) continue;
        const rect = element.getBoundingClientRect();
        if (rect.top >= 0 && rect.top <= 300) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;
    element.scrollIntoView({ behavior: 'smooth' });
    setActiveSection(id);
  };

  return (
    <div className="min-h-screen bg-stone-50 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="max-w-4xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Wrench className="w-4 h-4" />
            <span>Maintenance Guide</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading text-stone-900 mb-6 leading-tight">
            Battery Maintenance for Off-Grid Systems: Annual Checklist
          </h1>
          <p className="text-lg md:text-xl text-stone-600 leading-relaxed max-w-3xl">
            A comprehensive guide to keeping your power storage safe and reliable. Regular maintenance is the key to longevity.
          </p>

          <div className="flex flex-wrap gap-6 mt-8 text-sm text-stone-500 font-medium">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>Annual Routine</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>45-60 Minutes</span>
            </div>
            <div className="flex items-center gap-2">
              <Wrench className="w-4 h-4" />
              <span>Intermediate Skill</span>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8">
            <div className="mb-12 rounded-2xl overflow-hidden shadow-xl border border-stone-100">
              <img
                src="https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=professional+off+grid+solar+battery+bank+installation+clean+organized+garage+warm+lighting&image_size=landscape_16_9"
                alt="Professional off-grid solar battery bank installation"
                className="w-full h-auto object-cover aspect-video"
              />
              <div className="bg-stone-900/5 px-6 py-3 text-sm text-stone-600 italic border-t border-stone-100">
                Regular maintenance ensures your battery bank lasts for years, not months.
              </div>
            </div>

            <section className="mb-12 rounded-xl overflow-hidden border-l-4 border-red-500 bg-white shadow-sm">
              <div className="bg-red-50/50 p-6 md:p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-3 bg-red-100 rounded-lg text-red-600 shrink-0">
                    <AlertTriangle className="w-8 h-8" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-heading text-red-900 mb-2">Safety First: Non-Negotiable Warnings</h2>
                    <p className="text-red-800 font-medium">
                      Before touching <em>any</em> battery, understand the risks. Negligence can be fatal.
                    </p>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-1">
                  <div className="bg-white p-4 rounded-lg border border-red-100 shadow-sm">
                    <h3 className="font-bold text-red-900 flex items-center gap-2 mb-2">
                      <span className="text-xl">⚠️</span> Hydrogen Gas
                    </h3>
                    <p className="text-stone-700 text-sm">
                      Batteries emit explosive hydrogen during charging. <strong>NEVER</strong> smoke, spark, or use open flames near batteries. Ensure excellent ventilation.
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-red-100 shadow-sm">
                    <h3 className="font-bold text-red-900 flex items-center gap-2 mb-2">
                      <span className="text-xl">⚠️</span> Sulfuric Acid
                    </h3>
                    <p className="text-stone-700 text-sm">
                      Electrolyte is highly corrosive. <strong>ALWAYS</strong> wear chemical-resistant gloves, safety goggles, and long sleeves. Have baking soda and water nearby.
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-red-100 shadow-sm">
                    <h3 className="font-bold text-red-900 flex items-center gap-2 mb-2">
                      <span className="text-xl">⚠️</span> Short Circuits
                    </h3>
                    <p className="text-stone-700 text-sm">Metal tools can cause sparks/fire if they bridge terminals. Remove jewelry and keep tools away from posts.</p>
                  </div>
                </div>

                <div className="mt-6 flex items-start gap-3 text-sm text-red-700 bg-red-100/50 p-4 rounded-lg">
                  <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
                  <p>
                    <strong>Note:</strong> This guide applies ONLY to flooded lead-acid (FLA) batteries. Do NOT check specific gravity on AGM/Gel batteries.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-12 bg-stone-900 text-stone-50 rounded-xl overflow-hidden shadow-lg">
              <div className="p-8">
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 bg-stone-800 rounded-lg text-amber-500">
                    <Wrench className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-heading text-white">Essential Tool List</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-x-12 gap-y-4 mb-8">
                  {[
                    'Safety goggles & chemical-resistant gloves',
                    'Multimeter (digital, 600V+ range)',
                    'Hydrometer (with thermometer)',
                    'Battery terminal brush (nylon/brass)',
                    'Baking soda & water (neutralizer)',
                    'Distilled water (for top-up)',
                    'Non-abrasive rags/paper towels',
                    'Wire brush (for corrosion)',
                    'Torque wrench (10-15 ft-lbs max)',
                  ].map((tool) => (
                    <div key={tool} className="flex items-center gap-3 text-stone-300">
                      <Check className="w-5 h-5 text-primary" />
                      <span>{tool}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-6 border-t border-stone-800">
                  <p className="text-sm font-medium text-stone-400 mb-6 uppercase tracking-wider">Recommended Gear</p>
                  <div className="grid sm:grid-cols-3 gap-6">
                    <a
                      href="https://www.amazon.com.au/s?k=battery+hydrometer&tag=offgridmaster-22"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group bg-stone-800 rounded-lg p-4 transition-all hover:bg-stone-700 hover:-translate-y-1 block"
                    >
                      <div className="aspect-square bg-white rounded-md mb-3 overflow-hidden p-2 flex items-center justify-center">
                        <img
                          src="https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=battery+hydrometer+tool+isolated+white+background+product+photo&image_size=square"
                          alt="Battery Hydrometer"
                          className="object-contain w-full h-full"
                        />
                      </div>
                      <h4 className="font-heading text-white text-lg mb-1 group-hover:text-primary transition-colors">Hydrometer</h4>
                      <p className="text-xs text-stone-400 mb-3">Essential for checking specific gravity in FLA batteries.</p>
                      <span className="text-primary text-xs font-bold uppercase flex items-center gap-1">
                        Shop Now <ExternalLink className="w-3 h-3" />
                      </span>
                    </a>

                    <a
                      href="https://www.amazon.com.au/s?k=digital+multimeter&tag=offgridmaster-22"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group bg-stone-800 rounded-lg p-4 transition-all hover:bg-stone-700 hover:-translate-y-1 block"
                    >
                      <div className="aspect-square bg-white rounded-md mb-3 overflow-hidden p-2 flex items-center justify-center">
                        <img
                          src="https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=digital+multimeter+tool+isolated+white+background+product+photo&image_size=square"
                          alt="Digital Multimeter"
                          className="object-contain w-full h-full"
                        />
                      </div>
                      <h4 className="font-heading text-white text-lg mb-1 group-hover:text-primary transition-colors">Multimeter</h4>
                      <p className="text-xs text-stone-400 mb-3">Accurate voltage readings for state of charge.</p>
                      <span className="text-primary text-xs font-bold uppercase flex items-center gap-1">
                        Shop Now <ExternalLink className="w-3 h-3" />
                      </span>
                    </a>

                    <a
                      href="https://www.amazon.com.au/s?k=battery+terminal+cleaner&tag=offgridmaster-22"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group bg-stone-800 rounded-lg p-4 transition-all hover:bg-stone-700 hover:-translate-y-1 block"
                    >
                      <div className="aspect-square bg-white rounded-md mb-3 overflow-hidden p-2 flex items-center justify-center">
                        <img
                          src="https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=battery+terminal+cleaning+wire+brush+tool+isolated+white+background+product+photo&image_size=square"
                          alt="Terminal Brush"
                          className="object-contain w-full h-full"
                        />
                      </div>
                      <h4 className="font-heading text-white text-lg mb-1 group-hover:text-primary transition-colors">Terminal Brush</h4>
                      <p className="text-xs text-stone-400 mb-3">Remove corrosion for better conductivity.</p>
                      <span className="text-primary text-xs font-bold uppercase flex items-center gap-1">
                        Shop Now <ExternalLink className="w-3 h-3" />
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </section>

            <div className="space-y-16 mb-16">
              <div id="visual-inspection" className="scroll-mt-32 relative pl-4 md:pl-0">
                <div className="absolute -left-3 -top-3 md:-left-8 md:-top-4 w-12 h-12 md:w-16 md:h-16 bg-primary text-white rounded-xl flex items-center justify-center font-bold text-2xl md:text-3xl shadow-lg z-10 font-heading">
                  01
                </div>
                <div className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden">
                  <div className="p-6 md:p-8 pt-12 md:pt-8 md:pl-16">
                    <div className="flex flex-wrap items-baseline justify-between gap-4 mb-4">
                      <h3 className="text-2xl font-heading text-stone-900 m-0">Visual Inspection</h3>
                      <div className="flex items-center gap-2 text-sm text-stone-500 font-medium uppercase tracking-wider">
                        <Clock className="w-4 h-4" /> 5-10 Mins
                      </div>
                    </div>

                    <div className="bg-stone-50 border-l-4 border-primary/50 p-4 mb-6 rounded-r-lg">
                      <p className="m-0 text-stone-700 text-sm md:text-base">
                        <strong>Goal:</strong> Catch physical damage, leaks, or corrosion early.
                      </p>
                    </div>

                    <div className="prose prose-stone max-w-none">
                      <ul>
                        <li>
                          <strong>Examine the case:</strong> Look for cracks, bulges, or leaks (acid pooling). Replace immediately if found.
                        </li>
                        <li>
                          <strong>Check electrolyte level:</strong> Plates must be fully submerged (min. 1/2&quot; above). Top up ONLY with distilled water after full charge.
                        </li>
                        <li>
                          <strong>Inspect terminals & cables:</strong> Look for corrosion (white/green crust), cracks, or loose connections.
                        </li>
                        <li>
                          <strong>Verify mounting:</strong> Ensure battery is secure and doesn&apos;t move.
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div id="voltage-testing" className="scroll-mt-32 relative pl-4 md:pl-0">
                <div className="absolute -left-3 -top-3 md:-left-8 md:-top-4 w-12 h-12 md:w-16 md:h-16 bg-primary text-white rounded-xl flex items-center justify-center font-bold text-2xl md:text-3xl shadow-lg z-10 font-heading">
                  02
                </div>
                <div className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden">
                  <div className="p-6 md:p-8 pt-12 md:pt-8 md:pl-16">
                    <div className="flex flex-wrap items-baseline justify-between gap-4 mb-4">
                      <h3 className="text-2xl font-heading text-stone-900 m-0">Voltage Testing</h3>
                      <div className="flex items-center gap-2 text-sm text-stone-500 font-medium uppercase tracking-wider">
                        <Clock className="w-4 h-4" /> 10 Mins
                      </div>
                    </div>

                    <div className="bg-stone-50 border-l-4 border-primary/50 p-4 mb-6 rounded-r-lg">
                      <p className="m-0 text-stone-700 text-sm md:text-base">
                        <strong>Goal:</strong> Verify state of charge (SoC) and overall health.
                      </p>
                    </div>

                    <div className="prose prose-stone max-w-none">
                      <figure className="my-6 rounded-xl overflow-hidden shadow-md border border-stone-200">
                        <img
                          src="https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=close+up+hands+wearing+safety+gloves+using+digital+multimeter+on+battery+terminal+high+quality+photo&image_size=landscape_16_9"
                          alt="Testing battery voltage with a multimeter safely"
                          className="w-full h-auto object-cover"
                        />
                        <figcaption className="bg-stone-50 p-3 text-center text-sm text-stone-500 italic">
                          Always wear protective gloves when testing voltage.
                        </figcaption>
                      </figure>

                      <ul>
                        <li>Wait 2+ hours after charging (or 12+ hours after discharge) for accurate resting voltage.</li>
                        <li>
                          Measure open-circuit voltage (OCV):
                          <div className="not-prose grid grid-cols-2 md:grid-cols-5 gap-2 my-4 text-sm">
                            <div className="bg-green-50 border border-green-200 p-2 rounded text-center">
                              <div className="font-bold text-green-800">12.6V+</div>
                              <div className="text-green-600">100%</div>
                            </div>
                            <div className="bg-green-50/50 border border-green-100 p-2 rounded text-center">
                              <div className="font-bold text-green-800">12.4V</div>
                              <div className="text-green-600">~75%</div>
                            </div>
                            <div className="bg-yellow-50 border border-yellow-200 p-2 rounded text-center">
                              <div className="font-bold text-yellow-800">12.2V</div>
                              <div className="text-yellow-600">~50%</div>
                            </div>
                            <div className="bg-orange-50 border border-orange-200 p-2 rounded text-center">
                              <div className="font-bold text-orange-800">12.0V</div>
                              <div className="text-orange-600">~25%</div>
                            </div>
                            <div className="bg-red-50 border border-red-200 p-2 rounded text-center">
                              <div className="font-bold text-red-800">&lt;11.8V</div>
                              <div className="text-red-600">Critical</div>
                            </div>
                          </div>
                        </li>
                        <li>Record voltages per battery. &gt;0.2V difference indicates a failing cell.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div id="sg-check" className="scroll-mt-32 relative pl-4 md:pl-0">
                <div className="absolute -left-3 -top-3 md:-left-8 md:-top-4 w-12 h-12 md:w-16 md:h-16 bg-primary text-white rounded-xl flex items-center justify-center font-bold text-2xl md:text-3xl shadow-lg z-10 font-heading">
                  03
                </div>
                <div className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden">
                  <div className="p-6 md:p-8 pt-12 md:pt-8 md:pl-16">
                    <div className="flex flex-wrap items-baseline justify-between gap-4 mb-4">
                      <h3 className="text-2xl font-heading text-stone-900 m-0">Specific Gravity (SG) Check</h3>
                      <div className="flex items-center gap-2 text-sm text-stone-500 font-medium uppercase tracking-wider">
                        <Clock className="w-4 h-4" /> 15 Mins
                      </div>
                    </div>

                    <div className="bg-stone-50 border-l-4 border-primary/50 p-4 mb-6 rounded-r-lg">
                      <p className="m-0 text-stone-700 text-sm md:text-base">
                        <strong>Goal:</strong> Confirm electrolyte density (FLA batteries only).
                      </p>
                    </div>

                    <div className="prose prose-stone max-w-none">
                      <ul>
                        <li>Use a hydrometer after a full charge (voltage ≥12.6V).</li>
                        <li>Take readings from 3 cells per battery.</li>
                        <li>
                          <strong>Ideal SG at 80°F (27°C): 1.265</strong>
                        </li>
                        <li>
                          <strong>Analysis:</strong>
                          <ul>
                            <li>All cells within 0.015 SG = Healthy</li>
                            <li>&gt;0.020 difference = Sulfated/failing cell (needs equalization or replacement)</li>
                          </ul>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div id="terminal-cleaning" className="scroll-mt-32 relative pl-4 md:pl-0">
                <div className="absolute -left-3 -top-3 md:-left-8 md:-top-4 w-12 h-12 md:w-16 md:h-16 bg-primary text-white rounded-xl flex items-center justify-center font-bold text-2xl md:text-3xl shadow-lg z-10 font-heading">
                  04
                </div>
                <div className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden">
                  <div className="p-6 md:p-8 pt-12 md:pt-8 md:pl-16">
                    <div className="flex flex-wrap items-baseline justify-between gap-4 mb-4">
                      <h3 className="text-2xl font-heading text-stone-900 m-0">Terminal Cleaning & Tightening</h3>
                      <div className="flex items-center gap-2 text-sm text-stone-500 font-medium uppercase tracking-wider">
                        <Clock className="w-4 h-4" /> 10 Mins
                      </div>
                    </div>

                    <div className="bg-stone-50 border-l-4 border-primary/50 p-4 mb-6 rounded-r-lg">
                      <p className="m-0 text-stone-700 text-sm md:text-base">
                        <strong>Goal:</strong> Prevent resistance, heat, and power loss.
                      </p>
                    </div>

                    <div className="prose prose-stone max-w-none">
                      <ol>
                        <li>Disconnect negative (-) first, then positive (+).</li>
                        <li>Scrub with wire brush and baking soda paste. Rinse with water.</li>
                        <li>Apply dielectric grease after cleaning.</li>
                        <li>Tighten nuts to 10-15 ft-lbs (do not overtighten).</li>
                        <li>Reconnect positive (+) first, then negative (-).</li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>

              <div id="temp-monitoring" className="scroll-mt-32 relative pl-4 md:pl-0">
                <div className="absolute -left-3 -top-3 md:-left-8 md:-top-4 w-12 h-12 md:w-16 md:h-16 bg-primary text-white rounded-xl flex items-center justify-center font-bold text-2xl md:text-3xl shadow-lg z-10 font-heading">
                  05
                </div>
                <div className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden">
                  <div className="p-6 md:p-8 pt-12 md:pt-8 md:pl-16">
                    <div className="flex flex-wrap items-baseline justify-between gap-4 mb-4">
                      <h3 className="text-2xl font-heading text-stone-900 m-0">Temperature Monitoring</h3>
                    </div>

                    <div className="bg-stone-50 border-l-4 border-primary/50 p-4 mb-6 rounded-r-lg">
                      <p className="m-0 text-stone-700 text-sm md:text-base">
                        <strong>Goal:</strong> Ensure batteries operate within optimal thermal range.
                      </p>
                    </div>

                    <div className="prose prose-stone max-w-none">
                      <div className="flex items-start gap-4 bg-blue-50 p-6 rounded-xl not-prose mb-6 border border-blue-100">
                        <div className="p-2 bg-blue-100 rounded-lg text-blue-600 shrink-0">
                          <Thermometer className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="font-bold text-blue-900 text-lg mb-2">Optimal Range: 70-80°F (21-27°C)</h4>
                          <div className="grid sm:grid-cols-2 gap-4">
                            <div>
                              <p className="text-xs font-bold uppercase text-blue-400 mb-1">High Temp Warning</p>
                              <p className="text-blue-800 text-sm">
                                <strong>Above 85°F (29°C):</strong> Life reduces by ~20% per 10°F. Increase ventilation.
                              </p>
                            </div>
                            <div>
                              <p className="text-xs font-bold uppercase text-blue-400 mb-1">Low Temp Warning</p>
                              <p className="text-blue-800 text-sm">
                                <strong>Below 50°F (10°C):</strong> Capacity drops temporarily.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div id="replacement" className="scroll-mt-32 relative pl-4 md:pl-0">
                <div className="absolute -left-3 -top-3 md:-left-8 md:-top-4 w-12 h-12 md:w-16 md:h-16 bg-stone-800 text-white rounded-xl flex items-center justify-center font-bold text-2xl md:text-3xl shadow-lg z-10 font-heading">
                  06
                </div>
                <div className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden">
                  <div className="p-6 md:p-8 pt-12 md:pt-8 md:pl-16">
                    <div className="flex flex-wrap items-baseline justify-between gap-4 mb-4">
                      <h3 className="text-2xl font-heading text-stone-900 m-0">When to Replace Batteries</h3>
                    </div>

                    <div className="bg-stone-50 border-l-4 border-stone-800 p-4 mb-6 rounded-r-lg">
                      <p className="m-0 text-stone-700 text-sm md:text-base">
                        <strong>Goal:</strong> Identify end-of-life signs before complete system failure.
                      </p>
                    </div>

                    <div className="prose prose-stone max-w-none">
                      <p>Do NOT wait for complete failure. Replace if:</p>
                      <ul className="grid sm:grid-cols-2 gap-4 not-prose pl-0 list-none mb-6">
                        <li className="bg-stone-50 p-4 rounded-lg border border-stone-200 shadow-sm">
                          <strong className="block text-stone-900 mb-1">Capacity &lt; 80%</strong>
                          <span className="text-sm text-stone-600">A 50% discharge on a 100Ah battery now only yields 40Ah usable.</span>
                        </li>
                        <li className="bg-stone-50 p-4 rounded-lg border border-stone-200 shadow-sm">
                          <strong className="block text-stone-900 mb-1">Persistent Low Voltage</strong>
                          <span className="text-sm text-stone-600">Consistently &lt;12.2V at rest after charging.</span>
                        </li>
                        <li className="bg-stone-50 p-4 rounded-lg border border-stone-200 shadow-sm">
                          <strong className="block text-stone-900 mb-1">SG Differences &gt;0.020</strong>
                          <span className="text-sm text-stone-600">Indicates permanent sulfation in cells.</span>
                        </li>
                        <li className="bg-stone-50 p-4 rounded-lg border border-stone-200 shadow-sm">
                          <strong className="block text-stone-900 mb-1">Physical Damage</strong>
                          <span className="text-sm text-stone-600">Cracks, leaks, or bulging cases.</span>
                        </li>
                      </ul>
                      <p className="mt-4 text-stone-500 italic text-sm border-t border-stone-100 pt-4">
                        <strong>Age Factor:</strong> FLA batteries typically last 3-7 years. Consider proactive replacement at year 5.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="prose prose-stone prose-lg max-w-none prose-headings:font-heading prose-headings:text-stone-900 prose-a:text-primary hover:prose-a:text-primary/80">
              <hr className="my-12 border-stone-200" />
              <h3>Conclusion</h3>
              <p>
                Annual battery maintenance is the single most cost-effective way to maximize your off-grid system’s lifespan. By following this checklist—prioritizing safety, using the right tools, and acting on data—you’ll avoid sudden failures and reduce replacement costs.
              </p>
            </div>
          </div>

          <div className="hidden lg:block lg:col-span-4 space-y-8">
            <div className="sticky top-24 space-y-8">
              <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-6">
                <h3 className="font-heading text-lg text-stone-900 mb-4 uppercase tracking-wide">Table of Contents</h3>
                <nav className="space-y-1">
                  {[
                    { id: 'visual-inspection', label: '1. Visual Inspection' },
                    { id: 'voltage-testing', label: '2. Voltage Testing' },
                    { id: 'sg-check', label: '3. Specific Gravity Check' },
                    { id: 'terminal-cleaning', label: '4. Terminal Cleaning' },
                    { id: 'temp-monitoring', label: '5. Temperature Monitoring' },
                    { id: 'replacement', label: '6. When to Replace' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors flex items-center justify-between group ${
                        activeSection === item.id ? 'bg-stone-100 text-primary font-medium' : 'text-stone-600 hover:bg-stone-50 hover:text-stone-900'
                      }`}
                    >
                      {item.label}
                      {activeSection === item.id && <ChevronRight className="w-4 h-4" />}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="bg-stone-900 rounded-xl shadow-lg p-6 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl -mr-10 -mt-10"></div>
                <h3 className="font-heading text-xl mb-3 relative z-10">Need a System Upgrade?</h3>
                <p className="text-stone-300 text-sm mb-6 relative z-10">
                  Is your battery bank showing signs of age? Get a professional consultation for your off-grid upgrade.
                </p>
                <Button className="w-full bg-primary hover:bg-primary/90 text-white border-none relative z-10">Get a Free Quote</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

