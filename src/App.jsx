import React, { useState, useEffect } from 'react';
import mockData from './data/mockData.json';

export default function App() {
  const safeProperties = mockData && mockData.properties ? mockData.properties : [];
  const [selectedPropertyId, setSelectedPropertyId] = useState("prop-1");
  const [propertyMetrics, setPropertyMetrics] = useState([]);
  const [readinessScore, setReadinessScore] = useState(0);

  useEffect(() => {
    if (safeProperties.length > 0) {
      const currentProp = safeProperties.find(p => p.id === selectedPropertyId);
      if (currentProp) {
        setPropertyMetrics(currentProp.metrics || []);
      }
    }
  }, [selectedPropertyId, safeProperties]);

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

  const activeProperty = safeProperties.find(p => p.id === selectedPropertyId) || safeProperties;
  const currentKpis = activeProperty && activeProperty.kpis ? activeProperty.kpis : { sqft: "0", avgPriceSqft: "0", epc: "-", valuation: "0" };

  const getMapEmbedUrl = () => {
    if (selectedPropertyId === "prop-2") {
      return "https://openstreetmap.org";
    }
    if (selectedPropertyId === "prop-3") {
      return "https://openstreetmap.org";
    }
    return "https://openstreetmap.org";
  };

  const styles = {
    wrapper: {
      minHeight: '100vh',
      color: '#f8fafc',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      backgroundColor: '#031B2F', 
      backgroundImage: 'linear-gradient(to bottom, #021627, #031B2F, #010c14)',
      paddingBottom: '40px'
    },
    header: {
      backgroundColor: 'rgba(2, 22, 39, 0.85)',
      borderBottom: '1px solid rgba(6, 182, 212, 0.2)',
      padding: '20px 32px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '16px'
    },
    heading: {
      color: '#EF4444', 
      margin: 0,
      fontSize: '26px',
      fontWeight: '900',
      letterSpacing: '-0.025em'
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
      padding: '16px',
      borderRadius: '12px',
      border: `2px solid ${borderColor}`, 
      boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
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
      boxShadow: '0 20px 25px -5px rgba(0,0,0,0.3)'
    }
  };

  const getGaugeColor = () => {
    if (readinessScore === 100) return '#10B981'; 
    if (readinessScore >= 50) return '#06B6D4';  
    return '#F59E0B';                            
  };

  return (
    <div style={styles.wrapper}>
      <header style={styles.header}>
        <div>
          <h1 style={styles.heading}>PropVerify Intelligence</h1>
          <p style={{ color: '#67e8f9', margin: '4px 0 0 0', fontSize: '12px', fontWeight: 'bold', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            UK HOME OFFICE ENDORSEMENT REVIEW PLATFORM
          </p>
        </div>
        <div style={{ display: 'flex', gap: '8px', backgroundColor: 'rgba(0,0,0,0.4)', padding: '6px', borderRadius: '10px' }}>
          {safeProperties.map(p => (
            <button
              key={p.id}
              onClick={() => setSelectedPropertyId(p.id)}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                fontSize: '12px',
                fontWeight: 'bold',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s',
                backgroundColor: selectedPropertyId === p.id ? '#06b6d4' : 'transparent',
                color: selectedPropertyId === p.id ? '#ffffff' : '#94a3b8'
              }}
            >
              📍 {p.address ? p.address.split(',')[0] : 'Property'}
            </button>
          ))}
        </div>
      </header>

      <section style={styles.kpiGrid}>
        <div style={styles.kpiCard('#06B6D4')}>
          <span style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 'bold' }}>Internal Area</span>
          <div style={{ fontSize: '22px', fontWeight: '900', marginTop: '4px' }}>{currentKpis.sqft} <span style={{ fontSize: '12px', fontWeight: 'normal', color: '#64748b' }}>sq ft</span></div>
        </div>
        <div style={styles.kpiCard('#10B981')}>
          <span style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 'bold' }}>Market Valuation</span>
          <div style={{ fontSize: '22px', fontWeight: '900', marginTop: '4px', color: '#10B981' }}>{currentKpis.valuation}</div>
        </div>
        <div style={styles.kpiCard('#F59E0B')}>
          <span style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 'bold' }}>EPC Energy Grade</span>
          <div style={{ fontSize: '22px', fontWeight: '900', marginTop: '4px' }}>Band {currentKpis.epc}</div>
        </div>
        <div style={styles.kpiCard('#EC4899')}>
          <span style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 'bold' }}>Rate / SqFt</span>
          <div style={{ fontSize: '22px', fontWeight: '900', marginTop: '4px' }}>{currentKpis.avgPriceSqft}</div>
        </div>
      </section>

      <div style={styles.layoutGrid}>
        {/* Left Side: Map + Checklist */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={styles.card}>
            <h3 style={{ fontSize: '12px', color: '#94a3b8', margin: '0 0 12px 0', textTransform: 'uppercase', fontWeight: 'bold' }}>Geospatial Asset Context mapping</h3>
            <div style={{ height: '260px', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
              <iframe
                title="Geospatial Mapping Feed"
                width="100%"
                height="100%"
                src={getMapEmbedUrl()}
                style={{ border: "none", filter: "invert(90%) hue-rotate(180deg) brightness(95%) contrast(90%)" }}
              />
            </div>
          </div>

          <div style={styles.card}>
            <div style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '12px', marginBottom: '20px' }}>
              <span style={{ fontSize: '10px', backgroundColor: '#021627', color: '#22d3ee', border: '1px solid #0891b2', padding: '2px 8px', borderRadius: '4px', fontWeight: 'bold' }}>
                {activeProperty?.type || 'Asset'}
              </span>
              <h2 style={{ fontSize: '18px', fontWeight: 'bold', margin: '8px 0 0 0' }}>{activeProperty?.address || 'Select Asset'}</h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {propertyMetrics.map((metric) => (
                <div 
                  key={metric.id}
                  onClick={() => toggleMetric(metric.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'start',
                    gap: '16px',
                    padding: '14px',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    border: metric.checked ? '1px solid #06b6d4' : '1px solid rgba(255,255,255,0.05)',
                    backgroundColor: metric.checked ? 'rgba(6, 182, 212, 0.05)' : 'rgba(255,255,255,0.02)'
                  }}
                >
                  <input 
                    type="checkbox" 
                    checked={metric.checked} 
                    onChange={() => toggleMetric(metric.id)} 
                    style={{ width: '18px', height: '18px', marginTop: '2px', cursor: 'pointer' }}
                  />
                  <div>
                    <span style={{ fontSize: '14px', fontWeight: '600', display: 'block' }}>{metric.label}</span>
                    <span style={{ fontSize: '11px', color: '#64748b', display: 'block', marginTop: '4px' }}>
                      Category: <strong>{metric.category}</strong> | Impact: <strong>+{metric.weight}%</strong>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Visual Score Counter */}
        <div>
          <div style={styles.card}>
            <h3 style={{ fontSize: '12px', color: '#94a3b8', margin: '0 0 24px 0', textTransform: 'uppercase', textAlign: 'center', fontWeight: 'bold' }}>
              Pre-Sale Diagnostics Engine
            </h3>

            <div style={{ position: 'relative', width: '140px', height: '140px', margin: '0 auto' }}>
              <svg style={{ transform: 'rotate(-90deg)', width: '100%', height: '100%' }} viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
                <circle 
                  cx="50" 
                  cy="50" 
                  r="45" 
                  fill="none" 
                  stroke={getGaugeColor()} 
                  strokeWidth="8"
                  strokeDasharray={`${readinessScore * 2.827} 282.7`}
                  strokeLinecap="round"
                />
              </svg>
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                <div style={{ fontSize: '36px', fontWeight: '900', color: getGaugeColor() }}>{readinessScore}</div>
                <div style={{ fontSize: '10px', color: '#94a3b8', marginTop: '4px' }}>Readiness %</div>
              </div>
            </div>

            <div style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 'bold', marginBottom: '12px' }}>SCORE BREAKDOWN</div>
              {propertyMetrics.length > 0 ? (
                propertyMetrics.map(metric => (
                  <div key={metric.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '8px' }}>
                    <span style={{ color: '#cbd5e1' }}>{metric.label}</span>
                    <span style={{ color: metric.checked ? '#10B981' : '#64748b', fontWeight: 'bold' }}>
                      {metric.checked ? `+${metric.weight}%` : '0%'}
                    </span>
                  </div>
                ))
              ) : (
                <div style={{ fontSize: '12px', color: '#64748b' }}>No metrics available</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
