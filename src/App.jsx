import React, { useState, useEffect } from 'react';
import mockData from './data/mockData.json';
export default function App() {
  // State tracking for checked questionnaire inputs
  const [selections, setSelections] = useState({});
  const [readinessScore, setReadinessScore] = useState(0);

  // Initialize state based on JSON mock database
  useEffect(() => {
    const initialSelections = {};
    mockData.complianceMetrics.forEach(item => {
      initialSelections[item.id] = false;
    });
    setSelections(initialSelections);
  }, []);

  // Recalculate score whenever selections change using the mathematical formula
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
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Investor & Endorsement Header */}
      <header className="bg-white border-b border-gray-200 py-4 px-8 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-indigo-600">Innovator Founder Portal</h1>
          <p className="text-xs text-gray-500">Endorsement Review Environment v1.0</p>
        </div>
        <div className="flex gap-2">
          <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-1 rounded-full">System Active</span>
          <span className="bg-gray-100 text-gray-800 text-xs font-semibold px-2.5 py-1 rounded-full">Sandbox Mode</span>
        </div>
      </header>

      {/* Main Interactive Workspace */}
      <main className="max-w-6xl mx-auto my-8 p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left 2 Columns: Input Controls (Demonstrating Viability) */}
        <section className="md:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold mb-2">Business Viability Checklist</h2>
          <p className="text-sm text-gray-500 mb-6">Toggle the parameters below to simulate live assessment processing.</p>
          
          <div className="space-y-4">
            {mockData.complianceMetrics.map((item) => (
              <div 
                key={item.id} 
                className={`p-4 rounded-lg border transition-all flex items-start gap-4 ${
                  selections[item.id] ? 'border-indigo-200 bg-indigo-50/40' : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input 
                  type="checkbox" 
                  id={item.id}
                  checked={selections[item.id] || false}
                  onChange={() => handleCheckboxChange(item.id)}
                  className="mt-1 h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 cursor-pointer"
                />
                <div className="flex-1">
                  <label htmlFor={item.id} className="font-medium text-gray-800 cursor-pointer block text-sm">
                    {item.label}
                  </label>
                  <div className="flex gap-3 mt-1.5 text-xs text-gray-400">
                    <span>Category: <strong>{item.category}</strong></span>
                    <span>•</span>
                    <span>Impact Weight: <strong>{item.weight}%</strong></span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Right Column: Scoring Engine Visualizations (Demonstrating Innovation) */}
        <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-between">
          <div className="w-full text-center">
            <h2 className="text-lg font-semibold mb-1">Readiness Engine</h2>
            <p className="text-sm text-gray-500 mb-6">Real-time calculations</p>
          </div>

          {/* Dynamic Radial/Donut Display Graphic */}
          <div className="relative w-44 h-44 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle 
                cx="50" cy="50" r="40" 
                stroke="#e2e8f0" strokeWidth="8" fill="transparent" 
              />
              <circle 
                cx="50" cy="50" r="40" 
                stroke="#4f46e5" strokeWidth="8" fill="transparent" 
                strokeDasharray="251.2"
                strokeDashoffset={251.2 - (251.2 * readinessScore) / 100}
                className="transition-all duration-500 ease-out"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-4xl font-extrabold tracking-tight text-gray-800">{readinessScore}%</span>
              <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider mt-0.5">Score</span>
            </div>
          </div>

          {/* Dynamic Status Badges based on calculations */}
          <div className="w-full mt-6 text-center">
            {readinessScore === 100 ? (
              <div className="bg-green-50 border border-green-200 text-green-700 text-xs py-2 px-4 rounded-lg font-medium">
                ✅ Ready for Market Deployment
              </div>
            ) : readinessScore > 0 ? (
              <div className="bg-amber-50 border border-amber-200 text-amber-700 text-xs py-2 px-4 rounded-lg font-medium">
                ⚠️ Processing Requirements
              </div>
            ) : (
              <div className="bg-gray-50 border border-gray-200 text-gray-500 text-xs py-2 px-4 rounded-lg">
                Pending Input Selection
              </div>
            )
          }
          </div>
        </section>

      </main>
    </div>
  );
}
