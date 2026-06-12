import React, { useState, useEffect } from 'react';
import mockData from './data/mockData.json';

export default function App() {
  // Navigation State Engine
  const [activeTab, setActiveTab] = useState('executive-summary');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Real Estate Diagnostic Engine States
  const safeProperties = mockData && mockData.properties ? mockData.properties : [];
  const [selectedPropertyId, setSelectedPropertyId] = useState("prop-1");
  const [propertyMetrics, setPropertyMetrics] = useState([]);
  const [readinessScore, setReadinessScore] = useState(0);
  
  // Category Filtering State Variable Tracker
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Synchronise diagnostic state elements dynamically
  useEffect(() => {
    if (safeProperties.length > 0) {
      const currentProp = safeProperties.find(p => p.id === selectedPropertyId);
      if (currentProp) {
        setPropertyMetrics(currentProp.metrics || []);
      }
    }
  }, [selectedPropertyId, safeProperties]);

  // Dynamic Pie Chart compliance logic calculator
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

  const activeProperty = safeProperties.find(p => p.id === selectedPropertyId) || safeProperties[0];
  const currentKpis = activeProperty && activeProperty.kpis ? activeProperty.kpis : { volume: "0 m³", pandl: "£0", commercialRate: "£0", ntselatGrade: "Grade -" };

  const getMapEmbedUrl = () => {
    if (selectedPropertyId === "prop-2") {
      return "https://openstreetmap.org";
    }
    if (selectedPropertyId === "prop-3") {
      return "https://openstreetmap.org";
    }
    return "https://openstreetmap.org";
  };

  const getGaugeColor = () => {
    if (readinessScore === 100) return '#10B981'; 
    if (readinessScore >= 50) return '#06B6D4';  
    return '#F59E0B';                            
  };

  // Filter metrics array array data items based on category selection
  const filteredMetrics = propertyMetrics.filter(metric => {
    if (selectedCategory === "All") return true;
    return metric.category === selectedCategory;
  });

  const styles = {
    wrapper: {
      minHeight: '100vh',
      color: '#f8fafc',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      backgroundColor: '#020d18',
      backgroundImage: 'linear-gradient(to bottom, #021627, #031B2F, #010c14)',
      paddingBottom: '60px'
    },
    header: {
      backgroundColor: 'rgba(2, 22, 39, 0.95)',
      borderBottom: '1px solid rgba(6, 182, 212, 0.2)',
      padding: '16px 32px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      backdropFilter: 'blur(12px)'
    },
    menuTrigger: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      backgroundColor: 'rgba(6, 182, 212, 0.1)',
      border: '1px solid rgba(6, 182, 212, 0.3)',
      color: '#67e8f9',
      padding: '8px 14px',
      borderRadius: '8px',
      fontWeight: 'bold',
      fontSize: '13px',
      cursor: 'pointer'
    },
    menuOverlay: {
      position: 'absolute',
      top: '65px',
      left: '32px',
      backgroundColor: '#061321',
      border: '1px solid rgba(6, 182, 212, 0.25)',
      borderRadius: '12px',
      width: '280px',
      boxShadow: '0 20px 25px -5px rgba(0,0,0,0.5)',
      padding: '12px',
      display: isMenuOpen ? 'block' : 'none',
      zIndex: 2000
    },
    menuItem: (isActive) => ({
      width: '100%',
      textAlign: 'left',
      padding: '12px 16px',
      backgroundColor: isActive ? 'rgba(6, 182, 212, 0.15)' : 'transparent',
      color: isActive ? '#22d3ee' : '#cbd5e1',
      border: 'none',
      borderRadius: '6px',
      fontSize: '13px',
      fontWeight: 'bold',
      cursor: 'pointer',
      display: 'block',
      marginBottom: '4px'
    }),
    heading: {
      color: '#EF4444',
      margin: 0,
      fontSize: '24px',
      fontWeight: '900',
      letterSpacing: '-0.025em'
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 24px'
    },
    kpiGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
      gap: '16px',
      margin: '32px auto'
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
      gap: '32px'
    },
    card: {
      backgroundColor: '#0b243a',
      padding: '24px',
      borderRadius: '16px',
      border: '1px solid rgba(255,255,255,0.08)',
      boxShadow: '0 20px 25px -5px rgba(0,0,0,0.3)'
    }
  };

  return (
    <div style={styles.wrapper}>
      
      {/* Navigation Header */}
      <header style={styles.header}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ position: 'relative' }}>
            <button style={styles.menuTrigger} onClick={() => setIsMenuOpen(!isMenuOpen)}>☰ Menu</button>
            <div style={styles.menuOverlay}>
              <div style={{ fontSize: '10px', fontWeight: 'bold', color: '#64748b', padding: '4px 16px 8px 16px', borderBottom: '1px solid rgba(255,255,255,0.05)', marginBottom: '8px', textTransform: 'uppercase' }}>Platform Navigator</div>
              <button style={styles.menuItem(activeTab === 'executive-summary')} onClick={() => { setActiveTab('executive-summary'); setIsMenuOpen(false); }}>📋 Executive Plan Briefing</button>
              <button style={styles.menuItem(activeTab === 'readiness-core')} onClick={() => { setActiveTab('readiness-core'); setIsMenuOpen(false); }}>⚡ Live Readiness Core Engine</button>
            </div>
          </div>
          <h1 style={styles.heading}>PropReady OS</h1>
        </div>
        <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 'bold', textTransform: 'uppercase', border: '1px solid #1e293b', padding: '6px 12px', borderRadius: '6px', backgroundColor: '#020d18' }}>Visa Prototype Environment v1.2</span>
      </header>

      {/* EXECUTIVE INFORMATION VIEW */}
      {activeTab === 'executive-summary' && (
        <div style={styles.container}>
          <div style={{ backgroundColor: '#0b243a', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '32px', marginTop: '32px' }}>
            <span style={{ fontSize: '11px', fontWeight: 'bold', letterSpacing: '0.05em', textTransform: 'uppercase', color: '#22d3ee', backgroundColor: 'rgba(6, 182, 212, 0.1)', border: '1px solid rgba(6, 182, 212, 0.2)', padding: '4px 10px', borderRadius: '4px', display: 'inline-block', marginBottom: '12px' }}>UK Residential PropTech Transformation</span>
            <h2 style={{ fontSize: '28px', fontWeight: '900', margin: '0 0 12px 0', color: '#fff' }}>Business Overview</h2>
            <p style={{ color: '#94a3b8', fontSize: '15px', lineHeight: '1.6', margin: 0 }}>
              PROPREADY OS is an AI-driven, end-to-end property readiness and transaction orchestration platform tailored specifically for the UK residential real estate sector. It addresses a critical structural and regulatory crisis: the "Workflow Gap" in the home-buying process, which currently contributes to an agonizing 120-day average transaction time and a staggering 33% failure rate for residential sales. PROPREADY OS shifts the focus from reactive, post-offer legal discovery to proactive, real-time "Readiness Compilation" at the point of listing.
            </p>
            <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <span style={{ fontSize: '11px', color: '#475569', fontWeight: 'bold', textTransform: 'uppercase', display: 'block' }}>Founder & CEO</span>
                <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#cbd5e1' }}>Venkata Sivaramakrishna Chowdary Raavi</span>
              </div>
              <button style={{ backgroundColor: '#EF4444', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '8px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer' }} onClick={() => setActiveTab('readiness-core')}>Launch Calculator Engine →</button>
            </div>
          </div>
        </div>
      )}

      {/* CORE READINESS SCORE VIEW ENVIRONMENT */}
      {activeTab === 'readiness-core' && (
        <div style={styles.container}>
          
          {/* Top Aggregated Real Estate Asset KPI Metrics */}
          <section style={styles.kpiGrid}>
            <div style={styles.kpiCard('#06B6D4')}>
              <span style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 'bold' }}>Internal Volume</span>
              <div style={{ fontSize: '22px', fontWeight: '900', marginTop: '4px' }}>{currentKpis.volume}</div>
            </div>
            <div style={styles.kpiCard('#10B981')}>
              <span style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 'bold' }}>P&L</span>
              <div style={{ fontSize: '22px', fontWeight: '900', marginTop: '4px' }}>{currentKpis.pandl}</div>
            </div>
            <div style={styles.kpiCard('#F59E0B')}>
              <span style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 'bold' }}>Commercial Rate</span>
              <div style={{ fontSize: '22px', fontWeight: '900', marginTop: '4px' }}>{currentKpis.commercialRate}</div>
            </div>
            <div style={styles.kpiCard('#8B5CF6')}>
              <span style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 'bold' }}>NTSELAT Grade</span>
              <div style={{ fontSize: '22px', fontWeight: '900', marginTop: '4px' }}>{currentKpis.ntselatGrade}</div>
            </div>
          </section>

          {/* Property Selection & Metrics Dashboard */}
          <div style={styles.layoutGrid}>
            <div style={styles.card}>
              <h3 style={{ fontSize: '16px', fontWeight: '900', marginBottom: '16px', color: '#22d3ee' }}>Property Selection</h3>
              <select 
                value={selectedPropertyId} 
                onChange={(e) => setSelectedPropertyId(e.target.value)}
                style={{ width: '100%', padding: '10px', borderRadius: '8px', backgroundColor: '#061321', color: '#22d3ee', border: '1px solid rgba(6, 182, 212, 0.3)', fontSize: '14px' }}
              >
                {safeProperties.map(prop => (
                  <option key={prop.id} value={prop.id}>{prop.name}</option>
                ))}
              </select>
            </div>

            <div style={styles.card}>
              <h3 style={{ fontSize: '16px', fontWeight: '900', marginBottom: '16px', color: '#22d3ee' }}>Readiness Score</h3>
              <div style={{ fontSize: '48px', fontWeight: '900', color: getGaugeColor(), textAlign: 'center' }}>{readinessScore}%</div>
            </div>
          </div>

          {/* Category Filter */}
          <div style={{ marginTop: '32px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {['All', 'Legal', 'Financial', 'Compliance'].map(category => (
              <button 
                key={category}
                onClick={() => setSelectedCategory(category)}
                style={{ 
                  padding: '8px 16px', 
                  borderRadius: '8px', 
                  backgroundColor: selectedCategory === category ? 'rgba(6, 182, 212, 0.3)' : 'rgba(6, 182, 212, 0.1)',
                  border: '1px solid rgba(6, 182, 212, 0.3)',
                  color: selectedCategory === category ? '#22d3ee' : '#cbd5e1',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  fontSize: '13px'
                }}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Metrics Checklist */}
          <div style={{ marginTop: '32px', backgroundColor: '#0b243a', padding: '24px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.08)' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '900', marginBottom: '16px', color: '#22d3ee' }}>Property Metrics</h3>
            <div style={{ display: 'grid', gap: '12px' }}>
              {filteredMetrics.map(metric => (
                <label key={metric.id} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', backgroundColor: '#061321', borderRadius: '8px', cursor: 'pointer', border: '1px solid rgba(6, 182, 212, 0.1)' }}>
                  <input 
                    type="checkbox" 
                    checked={metric.checked || false}
                    onChange={() => toggleMetric(metric.id)}
                    style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                  />
                  <div>
                    <div style={{ fontWeight: 'bold', color: '#cbd5e1' }}>{metric.name}</div>
                    <div style={{ fontSize: '12px', color: '#64748b' }}>Weight: {metric.weight}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
