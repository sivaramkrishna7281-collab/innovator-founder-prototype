import React, { useState, useEffect } from 'react';
import mockData from './data/mockData.json';

export default function App() {
  // Navigation State Routing Engine
  const [activeTab, setActiveTab] = useState('executive-summary');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Real Estate Diagnostic Engine States
  const safeProperties = mockData && mockData.properties ? mockData.properties : [];
  const [selectedPropertyId, setSelectedPropertyId] = useState("prop-1");
  const [propertyMetrics, setPropertyMetrics] = useState([]);
  const [readinessScore, setReadinessScore] = useState(0);

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

  const getGaugeColor = () => {
    if (readinessScore === 100) return '#10B981'; 
    if (readinessScore >= 50) return '#06B6D4';  
    return '#F59E0B';                            
  };

  // Centralised Inline CSS Core Architecture Theme Palette
  const styles = {
    wrapper: {
      minHeight: '100vh',
      color: '#f8fafc',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      backgroundColor: '#020d18',
      backgroundImage: 'linear-gradient(to bottom, #021424, #031c33, #010a12)',
      paddingBottom: '60px'
    },
    header: {
      backgroundColor: 'rgba(2, 20, 36, 0.95)',
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
      cursor: 'pointer',
      transition: 'all 0.2s ease'
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
      marginBottom: '4px',
      transition: 'all 0.2s'
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
    infoBlock: {
      backgroundColor: '#071828',
      border: '1px solid rgba(255,255,255,0.06)',
      borderRadius: '16px',
      padding: '32px',
      marginTop: '32px',
      boxShadow: '0 10px 15px -3px rgba(0,0,0,0.3)'
    },
    pill: {
      fontSize: '11px',
      fontWeight: 'bold',
      letterSpacing: '0.05em',
      textTransform: 'uppercase',
      color: '#22d3ee',
      backgroundColor: 'rgba(6, 182, 212, 0.1)',
      border: '1px solid rgba(6, 182, 212, 0.2)',
      padding: '4px 10px',
      borderRadius: '4px',
      display: 'inline-block',
      marginBottom: '12px'
    },
    gridThree: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '24px',
      marginTop: '24px'
    },
    gridTwo: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
      gap: '32px',
      marginTop: '32px'
    }
  };

  return (
    <div style={styles.wrapper}>
      
      {/* Dynamic Header Core Navigation Canvas */}
      <header style={styles.header}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          
          {/* Top Left Menu Trigger */}
          <div style={{ position: 'relative' }}>
            <button 
              style={styles.menuTrigger} 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              ☰ Menu
            </button>
            
            {/* Control Panel Overlay Box */}
            <div style={styles.menuOverlay}>
              <div style={{ fontSize: '10px', fontWeight: 'bold', color: '#64748b', padding: '4px 16px 8px 16px', borderBottom: '1px solid rgba(255,255,255,0.05)', marginBottom: '8px', textTransform: 'uppercase' }}>
                Platform Navigator
              </div>
              <button 
                style={styles.menuItem(activeTab === 'executive-summary')}
                onClick={() => { setActiveTab('executive-summary'); setIsMenuOpen(false); }}
              >
                📋 Executive Plan Briefing
              </button>
              <button 
                style={styles.menuItem(activeTab === 'readiness-core')}
                onClick={() => { setActiveTab('readiness-core'); setIsMenuOpen(false); }}
              >
                ⚡ Live Readiness Core Engine
              </button>
            </div>
          </div>

          <h1 style={styles.heading}>PropReady OS</h1>
        </div>

        <div>
          <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 'bold', textTransform: 'uppercase', trackingWide: 'true', border: '1px solid #1e293b', padding: '6px 12px', borderRadius: '6px', backgroundColor: '#020d18' }}>
            Visa Prototype Environment v1.1
          </span>
        </div>
      </header>

      {/* RENDER STEP A: LANDING PAGE BRIEFING ENVIRONMENT */}
      {activeTab === 'executive-summary' && (
        <div style={styles.container}>
          <div style={styles.infoBlock}>
            <span style={styles.pill}>UK Residential PropTech Transformation</span>
            <h2 style={{ fontSize: '28px', fontWeight: '900', margin: '0 0 12px 0', color: '#fff' }}>Business Overview</h2>
            <p style={{ color: '#94a3b8', fontSize: '15px', lineHeight: '1.6', margin: 0 }}>
              PROPREADY OS is an AI-driven, end-to-end property readiness and transaction orchestration platform tailored specifically for the UK residential real estate sector. It addresses a critical structural and regulatory crisis: the "Workflow Gap" in the home-buying process, which currently contributes to an agonizing 120-day average transaction time and a staggering 33% failure rate for residential sales. PROPREADY OS shifts the focus from reactive, post-offer legal discovery to proactive, real-time "Readiness Compilation" at the point of listing.
            </p>

            <div style={styles.gridThree}>
              <div style={{ backgroundColor: '#0b1d2e', padding: '20px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.03)' }}>
                <h4 style={{ margin: '0 0 8px 0', color: '#fff', fontSize: '14px', fontWeight: 'bold', textTransform: 'uppercase' }}>Unify Operations</h4>
                <p style={{ margin: 0, fontSize: '13px', color: '#64748b', lineHeight: '1.5' }}>One platform for projects, leads, sales, finance, and facility management.</p>
              </div>
              <div style={{ backgroundColor: '#0b1d2e', padding: '20px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.03)' }}>
                <h4 style={{ margin: '0 0 8px 0', color: '#fff', fontSize: '14px', fontWeight: 'bold', textTransform: 'uppercase' }}>Drive Efficiency</h4>
                <p style={{ margin: 0, fontSize: '13px', color: '#64748b', lineHeight: '1.5' }}>Automate workflows, reduce manual work, and improve team productivity.</p>
              </div>
              <div style={{ backgroundColor: '#0b1d2e', padding: '20px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.03)' }}>
                <h4 style={{ margin: '0 0 8px 0', color: '#fff', fontSize: '14px', fontWeight: 'bold', textTransform: 'uppercase' }}>Smarter Decisions</h4>
                <p style={{ margin: 0, fontSize: '13px', color: '#64748b', lineHeight: '1.5' }}>Predictive analytics and portfolio insights for better investment outcomes.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Placeholder for other tabs (readiness-core) and closing of main wrapper */}
    </div>
  );
}
