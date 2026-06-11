import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';

// Helper component to smoothly slide the map frame when the active address switches
function ChangeMapView({ coords }) {
  const map = useMap();
  useEffect(() => {
    if (coords) {
      map.setView(coords, 14);
    }
  }, [coords, map]);
  return null;
}

export default function MapComponent({ mapCenter, address }) {
  // Ensure coordinates are valid numerical arrays before rendering map elements
  const safeCenter = Array.isArray(mapCenter) && mapCenter.length === 2 ? mapCenter : [51.4988, -0.1534];

  return (
    <MapContainer 
      center={safeCenter} 
      zoom={14} 
      style={{ height: '100%', width: '100%', background: '#021627' }} 
      zoomControl={false}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={safeCenter}>
        <Popup>
          <span style={{ color: '#000', fontWeight: 'bold' }}>{address || 'Asset Location'}</span>
        </Popup>
      </Marker>
      <ChangeMapView coords={safeCenter} />
    </MapContainer>
  );
}
