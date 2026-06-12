import React, { useState, useEffect } from 'react';
import mockData from './data/mockData.json';

export default function App() {

  const safeProperties = mockData && mockData.properties ? mockData.properties : [];
  const [selectedPropertyId, setSelectedPropertyId] = useState("prop-1");
  const [propertyMetrics, setPropertyMetrics] = useState([]);
  const [readinessScore, setReadinessScore] = useState(0);

  // Synchronize state safely whenever the selected property shifts
  useEffect(() => {
    if (safeProperties.length > 0) {
      const currentProp = safeProperties.find(p => p.id === selectedPropertyId);
      if (currentProp) {
        setPropertyMetrics(currentProp.metrics || []);
      }
    }
  }, [selectedPropertyId, safeProperties]);

  // Recalculate compliance scoring algorithms
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

  // Explicit hardcoded address matching logic for the map engine view framing
  const getMapEmbedUrl = () => {
    if (selectedPropertyId === "prop-2") {
      return "https://openstreetmap.org";
    }
    if (selectedPropertyId === "prop-3") {
      return "https://openstreetmap.org";
    }
    // Default Fallback: 14 Belgrave Square, London
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
      
      {/* Navigation Header */}
      <header style={styles.header}>
        <div>
          <h1 style={styles.heading}>PropVerify Intelligence</h1>
          <p style={{ color: '#67e8f9', margin: '4px 0 0 0', fontSize: '12px', fontWeight: 'bold', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            UK HOME OFFICE ENDORSEMENT REVIEW PLATFORM
          </p>
        </div>

        {/* Dynamic Navigation Address Selectors */}
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

      {/* KPI METRIC BAR ROW */}
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

      {/* Workspace Display Grid Splits */}
      <div style={styles.layoutGrid}>
        
        {/* Left Side (Map Canvas Block + Questionnaire) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', gridColumn: 'span 2 / span 2' }}>
          
          {/* PRODUCTION-READY IMMUNE EMBEDDED GEOSPATIAL ENGINE MAP MAP COMPONENT */}
          <div style={styles.card}>
            <h3 style={{ fontSize: '12px', color: '#94a3b8', margin: '0 0 12px 0', textTransform: 'uppercase', fontWeight: 'bold' }}>Geospatial Asset Context mapping</h3>
            <div style={{ height: '260px', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
              <iframe
                title="Geospatial Mapping Feed"
                width="100%"
                height="100%"
                frameBorder="0"
                scrolling="no"
                marginHeight="0"
                marginWidth="0"
                src={getMapEmbedUrl()}
                style={{ border: "none", filter: "invert(90%) hue-rotate(180deg) brightness(95%) contrast(90%)" }} // Elegant matching dark mode filter map styling
              />
            </div>
          </div>

          {/* Checklist Verification Block */}
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
                    onChange={() => {}} 
                    style={{ width: '18px', height: '18px', marginTop: '2px', cursor: 'pointer' }}
                  />
                  <div>
                    <span style={{ fontSize: '14px', fontWeight: '600', display: 'block' }}>{metric.label}</span>
                    <span style={{ fontSize: '11px', color: '#64748b', display: 'block', marginTop: '4px' }}>
