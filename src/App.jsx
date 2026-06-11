import React, { useState, useEffect } from 'react';
import mockData from './data/mockData.json';

export default function App() {
  const [selections, setSelections] = useState({});
  const [readinessScore, setReadinessScore] = useState(0);

  useEffect(() => {
    const initialSelections = {};
    mockData.complianceMetrics.forEach(item => {
      initialSelections[item.id] = false;
    });
    setSelections(initialSelections);
  }, []);

  useEffect(() => {
    const metrics = mockData.complianceMetrics;
    let totalWeight = 0;
    let earnedWeight = 0;

    metrics.forEach(item => {
      totalWeight += item.weight;
      if (selections[item.id]) {
        earnedWeight += item.weight;
      }
    });

    const calculatedScore = totalWeight > 0 ? Math.round((earnedWeight / totalWeight) * 100) : 0;
    setReadinessScore(calculatedScore);
  }, [selections]);

  const handleCheckboxChange = (id) => {
    setSelections(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased">
      {/* Premium PropTech Navigation Header */}
      <header className="bg-white border-b border-slate-200 py-5 px-8 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 bg-emerald-600 rounded-full animate-pulse"></span>
              <h1 className="text-xl font-bold tracking-tight text-slate-800">
                PropVerify <span className="text-emerald-600 font-medium text-base">UK</span>
              </h1>
            </div>
            <p className="text-xs text-slate-400 font-medium mt-0.5 tracking-wide uppercase">Pre-Listing Market Audit Environment</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="bg-slate-100 text-slate-600 border border-slate-200 text-xs font-semibold px-3 py-1 rounded-md">
              Data Sandbox Active
            </span>
          </div>
        </div>
      </header>

      {/* Main Workspace Split Layout */}
      <main className="max-w-7xl mx-auto my-8 px-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Side: Interactive Data Ingestion Rows */}
        <section className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-lg font-bold text-slate-800 mb-1">Property Documentation & Legal Datasets</h2>
            <p className="text-sm text-slate-500 mb-6">Aggregate and verify distributed legal frameworks to build the digital pre-sale file.</p>
            
            <div className="space-y-3">
              {mockData.complianceMetrics.map((item) => (
                <div 
                  key={item.id} 
                  className={`p-4 rounded-xl border transition-all duration-200 flex items-start gap-4 ${
                    selections[item.id] 
                      ? 'border-emerald-200 bg-emerald-50/30 shadow-sm' 
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm'
                  }`}
                >
                  <div className="flex items-center h-5 mt-0.5">
                    <input 
                      type="checkbox" 
                      id={item.id}
                      checked={selections[item.id] || false}
                      onChange={() => handleCheckboxChange(item.id)}
                      className="h-5 w-5 text-emerald-600 border-slate-300 rounded focus:ring-emerald-500 focus:ring-offset-0 cursor-pointer accent-emerald-600"
                    />
                  </div>
                  <div className="flex-1">
                    <label htmlFor={item.id} className="font-semibold text-slate-800 cursor-pointer block text-sm leading-tight">
                      {item.label}
                    </label>
                    <div className="flex gap-3 mt-2 text-xs font-medium text-slate-400">
                      <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded uppercase tracking-wider text-[10px]">{item.category}</span>
                      <span className="flex items-center">Impact: <strong className="text-slate-600 ml-1">+{item.weight}%</strong></span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Right Side: Sticky Scoring Summary Widget */}
        <section className="lg:col-span-1">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm sticky top-28 flex flex-col items-center">
            <div className="w-full border-b border-slate-100 pb-4 mb-6 text-center">
              <h2 className="text-md font-bold text-slate-800 tracking-wide uppercase text-xs">Pre-Listing Diagnostics</h2>
              <p className="text-sm font-semibold text-slate-700 mt-2 bg-slate-50 py-1.5 rounded-lg border border-slate-100">
                📍 Mock Asset: 14 Belgrave Sq, London
              </p>
            </div>

            {/* Dynamic Circular Graph Asset */}
            <div className="relative w-48 h-48 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle 
                  cx="50" cy="50" r="42" 
                  stroke="#f1f5f9" strokeWidth="7" fill="transparent" 
                />
                <circle 
                  cx="50" cy="50" r="42" 
                  stroke={readinessScore === 100 ? "#059669" : "#10b981"} strokeWidth="7" fill="transparent" 
                  strokeDasharray="263.89"
                  strokeDashoffset={263.89 - (263.89 * readinessScore) / 100}
                  className="transition-all duration-500 ease-in-out"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-4xl font-black tracking-tight text-slate-800">{readinessScore}%</span>
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mt-1">Audit Score</span>
              </div>
            </div>

            {/* Real Estate Actionable Status Output Box */}
            <div className="w-full mt-8">
              {readinessScore === 100 ? (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs p-3.5 rounded-xl font-semibold text-center shadow-sm">
                  🟢 <strong>BUYER READY</strong><br />
                  <span className="font-normal text-emerald-600 block mt-1 text-[11px]">All transaction risks mitigated. Asset structurally cleared for rapid listing.</span>
                </div>
              ) : readinessScore >= 50 ? (
                <div className="bg-amber-50 border border-amber-200 text-amber-800 text-xs p-3.5 rounded-xl font-semibold text-center shadow-sm">
                  🟡 <strong>CONDITIONAL REVIEWS OPEN</strong><br />
                  <span className="font-normal text-amber-600 block mt-1 text-[11px]">Legal dataset incomplete. Conveyancing pipeline delays likely.</span>
                </div>
              ) : (
                <div className="bg-slate-50 border border-slate-200 text-slate-500 text-xs p-3.5 rounded-xl font-medium text-center">
                  ⚪ <strong>AWAITING TRANSACTION INPUT</strong><br />
                  <span className="font-normal text-slate-400 block mt-1 text-[11px]">Select active property variables to trigger algorithmic scoring logic.</span>
                </div>
              )}
            </div>
            
            {/* Regulatory Proof Footnote */}
            <p className="text-[10px] text-slate-400 text-center mt-6 uppercase tracking-wider leading-relaxed border-t border-slate-100 pt-4 w-full">
              Aligned with UK Law Society & National Trading Standards Frameworks
            </p>
          </div>
        </section>

      </main>
    </div>
  );
}
