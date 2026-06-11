import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import mockData from './data/mockData.json';

// Inject Leaflet's map layout stylesheet directly into the document header dynamically
if (typeof window !== 'undefined' && !document.getElementById('leaflet-css')) {
  const L_CSS = document.createElement("link");
  L_CSS.id = "leaflet-css";
  L_CSS.rel = "stylesheet";
  L_CSS.href = "https://unpkg.com";
  document.head.appendChild(L_CSS);
}

// Helper component to smoothly slide the map frame when the active address switches
function ChangeMapView({ coords }) {
  const map = useMap();
  map.setView(coords, 14);
  return null;
}

export default function App() {
  // Use the first property item object as the default selected state safe template
  const defaultProperty = mockData.properties && mockData.properties.length > 0 ? mockData.properties[0] : null;
  
  const [selectedPropertyId, setSelectedPropertyId] = useState(defaultProperty ? defaultProperty.id : '');
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
  const mapCenter = activeProperty && activeProperty.coordinates ? activeProperty.coordinates : [51.4988, -0.1534];
  const currentKpis = activeProperty && activeProperty.kpis ? activeProperty.kpis : { sqft: "0", avgPriceSqft: "0", epc: "-", valuation: "0" };

  // Inline styling containers for deep ocean layout theme
  const styles = {
    wrapper: {
      minHeight: '100vh',
      color: '#f8fafc',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      backgroundColor: '#031B2F', // Specific Deep Ocean Blue
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
      color: '#EF4444', // Red Colour
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
      border: `2px solid ${borderColor}`, // Dynamic alternating border colours
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

  // Logic to dynamically switch score ring gauges based on current checklist status percentages
  const getGaugeColor = () => {
    if (readinessScore === 100) return '#10B981'; // Completed: Bright Emerald Green
    if (readinessScore >= 50) return '#06B6D4';  // Medium: Ocean Cyan Blue
    return '#F59E0B';                            // Low Input: Warning Amber
  };

  return (
    <div style={styles.wrapper}>
      
      {/* Navigation Bar */}
      <header style={styles.header}>
        <div>
          <h1 style={styles.heading}>PropVerify Intelligence</h1>
          <p style={{ color: '#67e8f9', margin: '4px 0 0 0', fontSize: '12px', fontBg: 'bold', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            UK HOME OFFICE ENDORSEMENT REVIEW PLATFORM
          </p>
        </div>

        {/* Dynamic Interactive Tab Selectors */}
        <div style={{ display: 'flex', gap: '8px', backgroundColor: 'rgba(0,0,0,0.4)', padding: '6px', borderRadius: '10px' }}>
          {mockData.properties && mockData.properties.map(p => (
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

      {/* AGGREGATED ASSET KPI ROW WITH ALTERNATING BORDERS */}
      <section style={styles.kpiGrid}>
        <div style={styles.kpiCard('#06B6D4')}> {/* Card 1: Neon Cyan */}
          <span style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 'bold' }}>Internal Area</span>
          <div style={{ fontSize: '22px', fontWeight: '900', marginTop: '4px' }}>{currentKpis.sqft} <span style={{ fontSize: '12px', fontWeight: 'normal', color: '#64748b' }}>sq ft</span></div>
        </div>
        <div style={styles.kpiCard('#10B981')}> {/* Card 2: Neon Emerald Green */}
          <span style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 'bold' }}>Market Valuation</span>
          <div style={{ fontSize: '22px', fontWeight: '900', marginTop: '4px', color: '#10B981' }}>{currentKpis.valuation}</div>
        </div>
        <div style={styles.kpiCard('#F59E0B')}> {/* Card 3: Neon Amber */}
          <span style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 'bold' }}>EPC Energy Grade</span>
          <div style={{ fontSize: '22px', fontWeight: '900', marginTop: '4px' }}>Band {currentKpis.epc}</div>
        </div>
        <div style={styles.kpiCard('#EC4899')}> {/* Card 4: Neon Pink */}
          <span style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 'bold' }}>Rate / SqFt</span>
          <div style={{ fontSize: '22px', fontWeight: '900', marginTop: '4px' }}>{currentKpis.avgPriceSqft}</div>
        </div>
      </section>

      {/* Workspace Content split frame view */}
      <div style={styles.layoutGrid}>
        
        {/* Left Hand Work Panel (2 Columns) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', gridColumn: 'span 2 / span 2' }}>
          
          {/* Map canvas Block */}
          <div style={styles.card}>
            <h3 style={{ fontSize: '12px', color: '#94a3b8', margin: '0 0 12px 0', textTransform: 'uppercase', fontWeight: 'bold' }}>Geospatial Asset Context mapping</h3>
            <div style={{ height: '240px', borderRadius: '12px', overflow: 'hidden', border: '1px solid #1e293b' }}>
              <MapContainer center={mapCenter} zoom={14} style={{ height: '100%', width: '100%' }} zoomControl={false}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={mapCenter}>
                  <Popup><span style={{ color: '#000', fontWeight: 'bold' }}>{activeProperty?.address}</span></Popup>
                </Marker>
                <ChangeMapView coords={mapCenter} />
              </MapContainer>
            </div>
          </div>

          {/* Interactive Compliance Audit Checklist */}
          <div style={styles.card}>
            <div style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '12px', marginBottom: '20px' }}>
              <span style={{ fontSize: '10px', backgroundColor: '#021627', color: '#22d3ee', border: '1px solid #0891b2', padding: '2px 8px', borderRadius: '4px', fontWeight: 'bold' }}>
                {activeProperty?.type}
              </span>
              <h2 style={{ fontSize: '18px', fontWeight: 'bold', margin: '8px 0 0 0' }}>{activeProperty?.address}</h2>
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
