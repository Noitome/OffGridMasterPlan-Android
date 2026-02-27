import React from 'react';

export function SystemSchematic() {
  return (
    <div className="w-full overflow-x-auto bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
      <svg viewBox="0 0 800 400" className="w-full min-w-[600px] h-auto">
        {/* Definitions for gradients/markers */}
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#64748b" />
          </marker>
        </defs>

        {/* --- Solar Array --- */}
        <g transform="translate(50, 50)">
          <rect x="0" y="0" width="100" height="120" rx="4" fill="#e0f2fe" stroke="#0ea5e9" strokeWidth="2" />
          <path d="M10 10 L90 10 M10 30 L90 30 M10 50 L90 50 M10 70 L90 70 M10 90 L90 90 M10 110 L90 110" stroke="#bae6fd" strokeWidth="1" />
          <text x="50" y="-10" textAnchor="middle" className="text-sm font-bold fill-gray-700 dark:fill-gray-300">Solar Array</text>
          <text x="50" y="60" textAnchor="middle" className="text-xs fill-blue-600">PV Input</text>
        </g>

        {/* --- Charge Controller --- */}
        <g transform="translate(250, 80)">
          <rect x="0" y="0" width="80" height="60" rx="4" fill="#dcfce7" stroke="#22c55e" strokeWidth="2" />
          <text x="40" y="-10" textAnchor="middle" className="text-sm font-bold fill-gray-700 dark:fill-gray-300">MPPT</text>
          <text x="40" y="35" textAnchor="middle" className="text-xs fill-green-700">Controller</text>
        </g>

        {/* --- Battery Bank --- */}
        <g transform="translate(250, 250)">
          <rect x="0" y="0" width="80" height="80" rx="4" fill="#f3e8ff" stroke="#a855f7" strokeWidth="2" />
          <path d="M20 20 L20 60 M60 20 L60 60 M10 40 L30 40 M50 40 L70 40" stroke="#d8b4fe" strokeWidth="2" />
          <text x="40" y="100" textAnchor="middle" className="text-sm font-bold fill-gray-700 dark:fill-gray-300">Battery Bank</text>
          <text x="40" y="45" textAnchor="middle" className="text-xs fill-purple-700">Storage</text>
        </g>

        {/* --- Inverter --- */}
        <g transform="translate(450, 250)">
          <rect x="0" y="0" width="100" height="80" rx="4" fill="#ffedd5" stroke="#f97316" strokeWidth="2" />
          <path d="M20 40 Q35 20 50 40 T80 40" stroke="#fdba74" strokeWidth="2" fill="none" />
          <text x="50" y="100" textAnchor="middle" className="text-sm font-bold fill-gray-700 dark:fill-gray-300">Inverter</text>
          <text x="50" y="45" textAnchor="middle" className="text-xs fill-orange-700">DC → AC</text>
        </g>

        {/* --- Main Load Panel --- */}
        <g transform="translate(650, 250)">
          <rect x="0" y="0" width="80" height="80" rx="2" fill="#f1f5f9" stroke="#64748b" strokeWidth="2" />
          <rect x="10" y="10" width="60" height="10" rx="1" fill="#cbd5e1" />
          <rect x="10" y="30" width="60" height="10" rx="1" fill="#cbd5e1" />
          <rect x="10" y="50" width="60" height="10" rx="1" fill="#cbd5e1" />
          <text x="40" y="-10" textAnchor="middle" className="text-sm font-bold fill-gray-700 dark:fill-gray-300">Main Panel</text>
          <text x="40" y="45" textAnchor="middle" className="text-xs fill-slate-600">Loads</text>
        </g>

        {/* --- Wiring Connections --- */}
        
        {/* PV to MPPT */}
        <path d="M150 110 L250 110" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrowhead)" strokeDasharray="5,5" />
        <text x="200" y="100" textAnchor="middle" className="text-xs fill-red-500">DC High Voltage</text>

        {/* MPPT to Battery (Busbar simulation) */}
        <path d="M290 140 L290 250" stroke="#eab308" strokeWidth="3" markerEnd="url(#arrowhead)" />
        <text x="300" y="200" textAnchor="middle" className="text-xs fill-yellow-600" transform="rotate(90, 300, 200)">Charging</text>

        {/* Battery to Inverter */}
        <path d="M330 290 L450 290" stroke="#eab308" strokeWidth="4" markerEnd="url(#arrowhead)" />
        <text x="390" y="280" textAnchor="middle" className="text-xs fill-yellow-600">DC Main (48V)</text>

        {/* Inverter to Load Panel */}
        <path d="M550 290 L650 290" stroke="#3b82f6" strokeWidth="3" markerEnd="url(#arrowhead)" />
        <text x="600" y="280" textAnchor="middle" className="text-xs fill-blue-600">AC (120/240V)</text>

        {/* Grounding/Safety Notes */}
        <text x="400" y="380" textAnchor="middle" className="text-xs fill-gray-400 italic">
          * Diagram simplified. Requires fuses, breakers, and grounding per local code.
        </text>

      </svg>
    </div>
  );
}
