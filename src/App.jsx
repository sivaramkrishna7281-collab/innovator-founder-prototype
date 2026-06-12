import React, { useState, useEffect } from 'react';
import mockData from './data/mockData.json';

export default function App() {
  // Safe Fallback Resolution Array tracking structured data
  const safeProperties = mockData && mockData.properties ? mockData.properties : [];
  
  // State initialization engines utilizing the strict business plan data models
  const [selectedPropertyId, setSelectedPropertyId] = useState("prop-1");
  const [propertyMetrics, setPropertyMetrics] = useState([]);
  const [readinessScore, setReadinessScore] = useState(0);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState("ALL");
  const [activeForensicOverlay, setActiveForensicOverlay] = useState(null);

  // Sync state cleanly whenever the user toggles the property dropdown selection node
  useEffect(() => {
    if (safeProperties.length > 0) {
      const currentProp = safeProperties.find(p => p.id === selectedPropertyId);
      if (currentProp) {
        setPropertyMetrics(currentProp.metrics || []);
      }
    }
  }, [selectedPropertyId, safeProperties]);

  // Comprehensive mathematical scoring logic using exact risk-weighted metrics
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

  // Active interaction toggle updating structural arrays in state memory safely
  const handleToggleMetric = (id) => {
    setPropertyMetrics(prev =>
      prev.map(item => item.id === id ? { ...item, checked: !item.checked } : item)
    );
  };

  const activeProperty = safeProperties.find(p => p.id === selectedPropertyId) || safeProperties;
  const currentKpis = activeProperty && activeProperty.kpis ? activeProperty.kpis : { sqft: "0", avgPriceSqft: "0", epc: "-", valuation: "0" };

  // Conditional formatting filter sorting matching category scopes
  const filteredMetrics = propertyMetrics.filter(metric => {
    if (selectedCategoryFilter === "ALL") return true;
    return metric.category === selectedCategoryFilter;
  });

  // Dynamic vector color selection script for the interactive medium pie chart gauge
  const getGaugeColor = () => {
    if (readinessScore === 100) return '#10B981'; // Completed / De-risked: Emerald Green
    if (readinessScore >= 50) return '#06B6D4';  // Medium Warning / In Progress: Cyan Blue
    return '#EF4444';                            // High Risk / Blocker State: Red
  };

  // High-fidelity UI typography, layout grid alignment and color palette configurations
  const styles = {
    wrapper: {
      minHeight: '100vh',
      color: '#f8fafc',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      backgroundColor: '#021526', // Premium Deep Ocean Blue Core
      backgroundImage: 'linear-gradient(to bottom, #021526, #090d16, #02060d)',
      paddingBottom: '40px',
      boxSizing: 'border-box'
    },
    header: {
      backgroundColor: 'rgba(2, 21, 38, 0.9)',
      borderBottom: '1px solid rgba(6, 182, 212, 0.25)',
      padding: '20px 32px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '16px'
    },
    heading: {
      color: '#EF4444', // Strict Brand Red Heading Target
      margin: 0,
      fontSize: '26px',
      fontWeight: '900',
      letterSpacing: '-0.025em'
    },
    dropdown: {
      padding: '10px 16px',
      borderRadius: '8px',
      fontSize: '13px',
      fontWeight: 'bold',
      backgroundColor: '#0b243a',
      color: '#ffffff',
      border: '1px solid rgba(6, 182, 212, 0.4)',
      cursor: 'pointer',
      outline: 'none',
      boxShadow: '0 4px 6px -1px rgba(0,0,0,0.2)'
    },
    kpiGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
      gap: '16px',
      maxWidth: '1200px',
      margin: '32px auto',
      padding: '0 24px'
    },
    kpiCard: (borderColor) => ({
      backgroundColor: '#0b243a',
      padding: '20px',
      borderRadius: '12px',
      border: `2px solid ${borderColor}`, // Demanded Alternating Neon Borders
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)',
      transition: 'all 0.2s'
    }),
    layoutGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
      gap: '32px',
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 24px'
    },
    card: {
      backgroundColor: '#0b243a',
      padding: '24px',
      borderRadius: '16px',
      border: '1px solid rgba(255,255,255,0.08)',
      boxShadow: '0 20px 25px -5px rgba(0,0,0,0.4)'
    },
    filterTab: (isActive) => ({
      padding: '6px 12px',
      borderRadius: '6px',
      fontSize: '11px',
      fontWeight: 'bold',
      border: 'none',
      cursor: 'pointer',
      backgroundColor: isActive ? '#06b6d4' : 'rgba(255,255,255,0.05)',
      color: isActive ? '#ffffff' : '#94a3b8',
      transition: 'all 0.2s'
    })
  };

  return (
    <div style={styles.wrapper}>
      
      {/* 1. Technical Typography Navigation Menu Header */}
      <header style={styles.header}>
        <div>
          <h1 style={styles.heading}>PROPREADY OS</h1>
          <p style={{ color: '#67e8f9', margin: '4px 0 0 0', fontSize: '11px', fontWeight: 'bold', letterSpacing: '0.07em', textTransform: 'uppercase' }}>
            Live Property Readiness Validation Object Platform
          </p>
        </div>
        
        {/* Dropdown Menu Node Selector in the top right corner */}
        <div>
          <select 
            style={styles.dropdown}
            value={selectedPropertyId}
            onChange={(e) => setSelectedPropertyId(e.target.value)}
          >
            {safeProperties.map(p => (
              <option key={p.id} value={p.id} style={{ backgroundColor: '#021526' }}>
                📍 {p.address || 'Asset Record'}
              </option>
            ))}
          </select>
        </div>
      </header>

      {/* 2. Aggregated Asset KPI Cards with Alternating Border Color Assignments */}
      <section style={styles.kpiGrid}>
        <div style={styles.kpiCard('#06B6D4')}>
          <span style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 'bold', letterSpacing: '0.05em' }}>Internal Volume</span>
          <div style={{ fontSize: '24px', fontWeight: '900', marginTop: '6px', color: '#fff' }}>{currentKpis.sqft} <span style={{ fontSize: '12px', fontWeight: '400', color: '#64748b' }}>sq ft</span></div>
        </div>
        <div style={styles.kpiCard('#10B981')}>
          <span style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 'bold', letterSpacing: '0.05em' }}>Transaction P&L Valuation</span>
          <div style={{ fontSize: '24px', fontWeight: '900', marginTop: '6px', color: '#10B981' }}>{currentKpis.valuation}</div>
        </div>
        <div style={styles.kpiCard('#F59E0B')}>
          <span style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 'bold', letterSpacing: '0.05em' }}>NTSELAT Energy Grade</span>
          <div style={{ fontSize: '24px', fontWeight: '900', marginTop: '6px', color: '#F59E0B' }}>Band {currentKpis.epc}</div>
        </div>
        <div style={styles.kpiCard('#EC4899')}>
          <span style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 'bold', letterSpacing: '0.05em' }}>Commercial Rate Value</span>
          <div style={{ fontSize: '24px', fontWeight: '900', marginTop: '6px', color: '#fff' }}>{currentKpis.avgPriceSqft} <span style={{ fontSize: '12px', fontWeight: '400', color: '#64748b' }}>/ sq ft</span></div>
        </div>
      </section>

      {/* 3. Core Workspace Dashboard Layout Grid */}
      <div style={styles.layoutGrid} className="lg:grid-cols-3">
        
        {/* Left Interactive Document Grid Container (Spans 2 Columns via structural layout logic) */}
        <div className="lg:col-span-2" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Mock Spatial Geospatial Mapping Feed Component */}
          <div style={styles.card}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <h3 style={{ fontSize: '12px', color: '#94a3b8', margin: 0, textTransform: 'uppercase', fontWeight: 'bold', letterSpacing: '0.05em' }}>
                Geospatial Mapping Engine Tracking File
              </h3>
              <span style={{ fontSize: '10px', color: '#22d3ee', fontWeight: 'bold', backgroundColor: 'rgba(34, 211, 238, 0.1)', padding: '2px 6px', borderRadius: '4px' }}>
                2D OpenStreetMap Active
              </span>
            </div>
            
            <div style={{ height: '260px', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
              <iframe
                title="Geospatial Mapping Framework Feed"
                width="100%"
                height="100%"
                src={getMapEmbedUrl()}
                style={{ border: "none", filter: "invert(92%) hue-rotate(180deg) brightness(95%) contrast(90%)" }}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', fontSize: '11px', color: '#64748b' }}>
              <span>Lat/Long: [{activeProperty?.coordinates ? activeProperty.coordinates.join(', ') : '51.4988, -0.1534'}]</span>
              <span>SME Compliance Grid v1.0</span>
            </div>
          </div>

          {/* Interactive Material Information Checklist Evidence Panel */}
          <div style={styles.card}>
          </div>
        </div>

        {/* Right Sidebar Readiness Score Gauge Container */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Readiness Score Gauge Card */}
          <div style={styles.card}>
            <h3 style={{ fontSize: '12px', color: '#94a3b8', margin: '0 0 16px 0', textTransform: 'uppercase', fontWeight: 'bold', letterSpacing: '0.05em' }}>
              Readiness Score
            </h3>
            <div style={{ position: 'relative', width: '180px', height: '180px', margin: '0 auto' }}>
              <svg width="180" height="180" viewBox="0 0 180 180" style={{ transform: 'rotate(-90deg)' }}>
                <circle cx="90" cy="90" r="80" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
                <circle
                  cx="90"
                  cy="90"
                  r="80"
                  fill="none"
                  stroke={getGaugeColor()}
                  strokeWidth="8"
                  strokeDasharray={`${(readinessScore / 100) * 502.65} 502.65`}
                  style={{ transition: 'stroke-dasharray 0.3s ease' }}
                />
              </svg>
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                <div style={{ fontSize: '32px', fontWeight: '900', color: getGaugeColor() }}>{readinessScore}%</div>
                <div style={{ fontSize: '10px', color: '#94a3b8', marginTop: '2px' }}>COMPLETE</div>
              </div>
            </div>
          </div>

          {/* Category Filter Controls */}
          <div style={styles.card}>
            <h3 style={{ fontSize: '12px', color: '#94a3b8', margin: '0 0 12px 0', textTransform: 'uppercase', fontWeight: 'bold', letterSpacing: '0.05em' }}>
              Filter by Category
            </h3>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {['ALL', 'Structural', 'Legal', 'Financial'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategoryFilter(cat)}
                  style={styles.filterTab(selectedCategoryFilter === cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function getMapEmbedUrl() {
  return 'https://www.openstreetmap.org/export/embed.html?bbox=-0.2,51.4,-0.1,51.55&layer=mapnik';
}
