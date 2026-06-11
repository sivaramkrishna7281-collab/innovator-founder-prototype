import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import mockData from './data/mockData.json';

// Inject Leaflet's essential visual stylesheet into the document header dynamically
const L_CSS = document.createElement("link");
L_CSS.rel = "stylesheet";
L_CSS.href = "https://unpkg.com";
document.head.appendChild(L_CSS);

// Custom helper component to pan the camera when active address switches
function ChangeMapView({ coords }) {
  const map = useMap();
  map.setView(coords, 14);
  return null;
}

export default function App() {
  const [selectedPropertyId, setSelectedPropertyId] = useState(mockData.properties[0].id);
  const [propertyMetrics, setPropertyMetrics] = useState([]);
  const [readinessScore, setReadinessScore] = useState(0);

  useEffect(() => {
    const currentProp = mockData.properties.find(p => p.id === selectedPropertyId);
    if (currentProp) {
      setPropertyMetrics(currentProp.metrics);
    }
  }, [selectedPropertyId]);

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
  const mapCenter = activeProperty ? activeProperty.coordinates : [51.505, -0.09];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans antialiased">
      
      {/* Ocean Blue Header */}
      <header className="bg-gradient-to-r from-cyan-900 via-blue-900 to-indigo-900 border-b border-cyan-800/40 py-6 px-8 sticky top-0 z-[1000] shadow-xl">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
              PropVerify <span className="font-light text-slate-300 text-lg">Geospatial</span>
            </h1>
            <p className="text-xs text-cyan-300 font-semibold tracking-widest uppercase mt-0.5">UK Home Office Endorsement Prototype</p>
          </div>
          
          {/* Address Selection Switcher */}
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

      {/* Main 3-Column Workspace Grid */}
      <main className="max-w-7xl mx-auto my-8 px-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Columns: Map Display + Checklist Node */}
        <section className="lg:col-span-2 space-y-6">
          
          {/* LIVE MAP COMPONENT MODULE */}
          <div className="bg-slate-850 p-4 rounded-2xl border border-cyan-900/40 shadow-xl overflow-hidden relative z-10">
            <h3 className="text-xs uppercase font-extrabold tracking-widest text-slate-400 mb-3 px-2">Live Asset Geolocation Mapping</h3>
            <div className="h-64 w-full rounded-xl overflow-hidden border border-slate-700/60 shadow-inner">
              <MapContainer 
                center={mapCenter} 
                zoom={14} 
                style={{ height: '100%', width: '100%', background: '#0f172a' }}
                zoomControl={false}
              >
                <TileLayer
                  attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a>'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={mapCenter}>
                  <Popup>
                    <span className="text-slate-900 font-bold text-xs">{activeProperty?.address}</span>
                  </Popup>
                </Marker>
                <ChangeMapView coords={mapCenter} />
              </MapContainer>
            </div>
          </div>

          {/* Verification Parameters checklist */}
          <div className="bg-slate-850 bg-gradient-to-b from-slate-800 to-slate-900 p-6 rounded-2xl border border-cyan-900/40 shadow-xl">
            <div className="mb-6 border-b border-slate-700/50 pb-4">
              <span className="text-[10px] bg-cyan-950 text-cyan-400 border border-cyan-800 px-2.5 py-1 rounded font-bold uppercase tracking-wider">
                {activeProperty?.type}
              </span>
              <h2 className="text-xl font-bold mt-2 text-white">{activeProperty?.address}</h2>
            </div>

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
                    onChange={() => {}} 
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

        {/* Right 1 Column: Interactive Score Card Widget */}
        <section className="lg:col-span-1">
          <div className="bg-slate-850 bg-gradient-to-b from-slate-800 to-slate-900 p-6 rounded-2xl border border-cyan-900/40 shadow-xl text-center sticky top-28">
            <h3 className="text-xs uppercase font-extrabold tracking-widest text-slate-400 mb-6">Market Readiness Index</h3>
            
            {/* SVG Pie Chart */}
            <div className="relative w-48 h-48 mx-auto flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" stroke="#1e293b" strokeWidth="10" fill="transparent" />
                <circle 
                  cx="50" cy="50" r="40" 
                  stroke="url(#oceanGrad)" strokeWidth="10" fill="transparent" 
                  strokeDasharray="251.3"
                  strokeDashoffset={251.3 - (251.3 * readinessScore) / 100}
                  strokeLinecap="round"
                  className="transition-all duration-500 ease-out"
                />
                <defs>
                  <linearGradient id="oceanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#06b6d4" />
                    <stop offset="100%" stopColor="#10b981" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-4xl font-black text-white tracking-tight">{readinessScore}%</span>
                <span className="text-[10px] tracking-wider uppercase text-cyan-400 font-bold mt-0.5">Verified</span>
              </div>
            </div>

            <div className="mt-8">
              {readinessScore === 100 ? (
                <div className="bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 p-4 rounded-xl text-xs font-bold leading-normal">
                  🏆 BUYER READY STATUS APPROVED
                </div>
              ) : readinessScore >= 50 ? (
                <div className="bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 p-4 rounded-xl text-xs font-bold leading-normal">
                  ⚡ LIQUIDITY ANALYSIS ACTIVE
                </div>
              ) : (
                <div className="bg-slate-900/80 border border-slate-700/50 text-slate-400 p-4 rounded-xl text-xs font-medium">
                  ⏳ AWAITING DATA INPUT
                </div>
              )}
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
