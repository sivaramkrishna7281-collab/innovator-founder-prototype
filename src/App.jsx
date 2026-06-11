import React, { useState, useEffect } from 'react';
import mockData from './data/mockData.json';

export default function App() {
  // Track selected property and current checked status state arrays
  const [selectedPropertyId, setSelectedPropertyId] = useState(mockData.properties[0].id);
  const [propertyMetrics, setPropertyMetrics] = useState([]);
  const [readinessScore, setReadinessScore] = useState(0);

  // Sync state whenever the user switches between property addresses
  useEffect(() => {
    const currentProp = mockData.properties.find(p => p.id === selectedPropertyId);
    if (currentProp) {
      setPropertyMetrics(currentProp.metrics);
    }
  }, [selectedPropertyId]);

  // Recalculate dynamic pie chart score data metrics
  useEffect(() => {
    let totalWeight = 0;
    let earnedWeight = 0;

    propertyMetrics.forEach(metric => {
      totalWeight += metric.weight;
      if (metric.checked) {
        earnedWeight += metric.weight;
      }
    });

    const calculated = totalWeight > 0 ? Math.round((earnedWeight / totalWeight) * 100) : 0;
    setReadinessScore(calculated);
  }, [propertyMetrics]);

  const toggleMetric = (id) => {
    setPropertyMetrics(prev =>
      prev.map(item => item.id === id ? { ...item, checked: !item.checked } : item)
    );
  };

  const activeProperty = mockData.properties.find(p => p.id === selectedPropertyId);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased bg-gradient-to-b from-sky-950 via-slate-950 to-slate-950">

      {/* Ocean Blue Dashboard Header Canvas */}
      <header className="bg-gradient-to-r from-cyan-900 via-blue-900 to-indigo-900 border-b border-cyan-800/40 py-6 px-8 sticky top-0 z-50 shadow-xl">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
              PropVerify <span className="font-light text-slate-300 text-lg">Intelligence</span>
            </h1>
            <p className="text-xs text-cyan-300 font-semibold tracking-widest uppercase mt-0.5">UK Home Office Endorsement Prototype</p>
          </div>
          
          {/* Real Estate Address Selector Buttons */}
          <div className="flex flex-wrap gap-2 bg-slate-950/60 p-1.5 rounded-xl border border-cyan-800/30">
            {mockData.properties.map(p => (
              <button
                key={p.id}
                onClick={() => setSelectedPropertyId(p.id)}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all duration-200 ${
                  selectedPropertyId === p.id 
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20 scale-105' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                📍 {p.address.split(',')[0]}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Structured Dashboard Grid */}
      
      <main className="max-w-7xl mx-auto my-8 px-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
<section className="lg:col-span-2 space-y-6">
          <div className="bg-slate-850 bg-gradient-to-b from-slate-800 to-slate-900 p-6 rounded-2xl border border-cyan-900/40 shadow-xl">
            <div className="mb-6 border-b border-slate-700/50 pb-4">
              <span className="text-[10px] bg-cyan-950 text-cyan-400 border border-cyan-800 px-2.5 py-1 rounded font-bold uppercase tracking-wider">
                {activeProperty?.type}
              </span>
              <h2 className="text-xl font-bold mt-2 text-white">{activeProperty?.address}</h2>
              <p className="text-sm text-slate-400 mt-1">Select transaction files to calculate pre-sale compliance risks.</p>
            </div>

            {/* Checklist Loop Container */}
            <div className="space-y-3">
              {propertyMetrics.map((metric) => (
                <div 
                  key={metric.id}
                  onClick={() => toggleMetric(metric.id)}
                  className={`p-4 rounded-xl border transition-all duration-200 cursor-pointer flex items-start gap-4 ${
                    metric.checked 
                      ? 'border-cyan-500 bg-cyan-950/20 shadow-md shadow-cyan-950/50' 
                      : 'border-slate-700/60 bg-slate-800/40 hover:border-slate-600'
                  }`}
                >
                  <input 
                    type="checkbox"
                    checked={metric.checked}
                    onChange={() => {}} // Handled by outer div onClick
                    className="h-5 w-5 rounded text-cyan-500 border-slate-600 bg-slate-900 mt-0.5 cursor-pointer accent-cyan-500"
                  />
                  <div className="flex-1">
                    <span className="text-sm font-bold text-slate-200 block leading-snug">{metric.label}</span>
                    <div className="flex gap-3 mt-1.5 text-[11px] font-semibold text-slate-400">
                      <span className="text-cyan-400 uppercase tracking-wider">{metric.category}</span>
                      <span>•</span>
                      <span>Weight Impact: +{metric.weight}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Right Side: Advanced Pie Chart Metrics Box */}
        <section className="lg:col-span-1">
          <div className="bg-slate-850 bg-gradient-to-b from-slate-800 to-slate-900 p-6 rounded-2xl border border-cyan-900/40 shadow-xl text-center sticky top-28">
            <h3 className="text-xs uppercase font-extrabold tracking-widest text-slate-400 mb-6">Market Readiness Index</h3>
            
            {/* SVG Pie/Donut Chart Construction */}
            <div className="relative w-48 h-48 mx-auto flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                {/* Background Empty Circle Track */}
                <circle 
                  cx="50" cy="50" r="40" 
                  stroke="#1e293b" strokeWidth="10" fill="transparent" 
                />
                {/* Dynamic Score Slice */}
                <circle 
                  cx="50" cy="50" r="40" 
                  stroke="url(#oceanGrad)" strokeWidth="10" fill="transparent" 
                  strokeDasharray="251.3"
                  strokeDashoffset={251.3 - (251.3 * readinessScore) / 100}
                  strokeLinecap="round"
                  className="transition-all duration-500 ease-out"
                />
                {/* Color Gradients Defs */}
                <defs>
                  <linearGradient id="oceanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#06b6d4" />
                    <stop offset="100%" stopColor="#10b981" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Centered Absolute Label Data */}
              <div className="absolute flex flex-col items-center">
                <span className="text-4xl font-black text-white tracking-tight">{readinessScore}%</span>
                <span className="text-[10px] tracking-wider uppercase text-cyan-400 font-bold mt-0.5">Verified</span>
              </div>
            </div>

            {/* Strategic Diagnostic Output States */}
            <div className="mt-8">
              {readinessScore === 100 ? (
                <div className="bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 p-4 rounded-xl text-xs font-bold leading-normal">
                  🏆 BUYER READY STATUS APPROVED
                  <span className="block font-normal text-slate-400 mt-1 text-[11px]">Transaction parameters validated. Listed on asset network data feeds safely.</span>
                </div>
              ) : readinessScore >= 50 ? (
                <div className="bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 p-4 rounded-xl text-xs font-bold leading-normal">
                  ⚡ LIQUIDITY ANALYSIS ACTIVE
                  <span className="block font-normal text-slate-400 mt-1 text-[11px]">Data registry files processing. Structural listing hold applied.</span>
                </div>
              ) : (
                <div className="bg-slate-900/80 border border-slate-700/50 text-slate-400 p-4 rounded-xl text-xs font-medium">
                  ⏳ AWAITING DATA INPUT
                  <span className="block text-[11px] text-slate-500 mt-1 font-normal">Activate compliance checklist entries to run diagnostic matrix.</span>
                </div>
              )}
            </div>

            <div className="mt-6 border-t border-slate-700/50 pt-4 text-[10px] text-slate-500 font-bold uppercase tracking-wider">
              PropVerify Global Database Engine
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
