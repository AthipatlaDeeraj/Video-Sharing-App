import React, { useState, useEffect, useRef } from 'react';

const LiveLocationMap = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [isTracking, setIsTracking] = useState(false);
  const [showMarkers, setShowMarkers] = useState(true);
  const [error, setError] = useState(null);
  const mapRef = useRef(null);
  const watchIdRef = useRef(null);

  // Initialize map when component mounts
  useEffect(() => { 
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.css';
    document.head.appendChild(link);
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.js';
    script.onload = initializeMap;
    document.body.appendChild(script);

    return () => {
      if (watchIdRef.current) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
    };
  },[]);

  const initializeMap = () => {
    if (mapRef.current && window.L) {
      const map = window.L.map(mapRef.current).setView([51.505, -0.09], 13);
      
      window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);

      // Store map instance for later use
      mapRef.current.mapInstance = map;

      // Add click handler for adding markers
      map.on('click', handleMapClick);
    }
  };

  const handleMapClick = (e) => {
    if (mapRef.current?.mapInstance) {
      const newMarker = {
        id: Date.now(),
        lat: e.latlng.lat,
        lng: e.latlng.lng,
        title: `Marker ${markers.length + 1}`,
        timestamp: new Date().toLocaleString()
      };
      
      setMarkers(prev => [...prev, newMarker]);
      addMarkerToMap(newMarker, false);
    }
  };

  const addMarkerToMap = (markerData, isCurrentLocation = false) => {
    if (mapRef.current?.mapInstance && window.L) {
      const icon = isCurrentLocation 
        ? window.L.divIcon({
            html: '<div style="background: #3b82f6; width: 16px; height: 16px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>',
            className: 'current-location-marker',
            iconSize: [22, 22],
            iconAnchor: [11, 11]
          })
        : window.L.divIcon({
            html: '<div style="background: #ef4444; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 1px 3px rgba(0,0,0,0.3);"></div>',
            className: 'custom-marker',
            iconSize: [16, 16],
            iconAnchor: [8, 8]
          });

      const marker = window.L.marker([markerData.lat, markerData.lng], { icon })
        .addTo(mapRef.current.mapInstance);

      if (!isCurrentLocation) {
        marker.bindPopup(`
          <div style="font-family: sans-serif;">
            <strong>${markerData.title}</strong><br>
            <small>${markerData.timestamp}</small><br>
            <small>Lat: ${markerData.lat.toFixed(6)}</small><br>
            <small>Lng: ${markerData.lng.toFixed(6)}</small>
          </div>
        `);
      }

      // Store marker reference
      markerData.markerRef = marker;
    }
  };

  const startLocationTracking = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by this browser.');
      return;
    }

    setIsTracking(true);
    setError(null);

    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 1000
    };

    // Get initial position
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: new Date().toLocaleString()
        };
        
        setCurrentLocation(location);
        
        if (mapRef.current?.mapInstance) {
          // Remove previous current location marker
          if (currentLocation?.markerRef) {
            mapRef.current.mapInstance.removeLayer(currentLocation.markerRef);
          }
          
          // Add new current location marker
          addMarkerToMap(location, true);
          
          // Center map on current location
          mapRef.current.mapInstance.setView([location.lat, location.lng], 15);
        }
      },
      (error) => {
        setError(`Error getting location: ${error.message}`);
        setIsTracking(false);
      },
      options
    );

    // Watch position changes
    watchIdRef.current = navigator.geolocation.watchPosition(
      (position) => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: new Date().toLocaleString()
        };
        
        setCurrentLocation(prev => {
          // Remove previous marker
          if (prev?.markerRef) {
            mapRef.current.mapInstance.removeLayer(prev.markerRef);
          }
          return location;
        });
        
        if (mapRef.current?.mapInstance) {
          addMarkerToMap(location, true);
        }
      },
      (error) => {
        setError(`Error tracking location: ${error.message}`);
      },
      options
    );
  };

  const stopLocationTracking = () => {
    if (watchIdRef.current) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
    setIsTracking(false);
  };

  const removeMarker = (markerId) => {
    const markerToRemove = markers.find(m => m.id === markerId);
    if (markerToRemove?.markerRef && mapRef.current?.mapInstance) {
      mapRef.current.mapInstance.removeLayer(markerToRemove.markerRef);
    }
    setMarkers(prev => prev.filter(m => m.id !== markerId));
  };

  const toggleMarkersVisibility = () => {
    setShowMarkers(prev => {
      const newVisibility = !prev;
      markers.forEach(marker => {
        if (marker.markerRef && mapRef.current?.mapInstance) {
          if (newVisibility) {
            marker.markerRef.addTo(mapRef.current.mapInstance);
          } else {
            mapRef.current.mapInstance.removeLayer(marker.markerRef);
          }
        }
      });
      return newVisibility;
    });
  };

  const centerOnCurrentLocation = () => {
    if (currentLocation && mapRef.current?.mapInstance) {
      mapRef.current.mapInstance.setView([currentLocation.lat, currentLocation.lng], 15);
    }
  };

  
  const styles = {
    container: {
      width: '100%',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#f9fafb'
    },
    header: {
      backgroundColor: 'white',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      borderBottom: '1px solid #e5e7eb',
      padding: '16px'
    },
    headerFlex: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    title: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#1f2937',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    buttonGroup: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    button: {
      padding: '8px 16px',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontSize: '14px',
      fontWeight: '500',
      cursor: 'pointer',
      border: 'none',
      transition: 'all 0.2s'
    },
    trackingButton: {
      backgroundColor: '#3b82f6',
      color: 'white'
    },
    stopButton: {
      backgroundColor: '#dc2626',
      color: 'white'
    },
    toggleButton: {
      backgroundColor: showMarkers ? '#10b981' : '#6b7280',
      color: 'white'
    },
    error: {
      marginTop: '8px',
      padding: '8px',
      backgroundColor: '#fef2f2',
      border: '1px solid #fecaca',
      borderRadius: '4px',
      color: '#dc2626',
      fontSize: '14px'
    },
    mainContent: {
      flex: 1,
      display: 'flex'
    },
    mapContainer: {
      flex: 1,
      position: 'relative'
    },
    overlay: {
      position: 'absolute',
      top: '16px',
      left: '16px',
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      padding: '12px',
      maxWidth: '300px',
      zIndex: 1000
    },
    instructions: {
      position: 'absolute',
      bottom: '16px',
      left: '16px',
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      padding: '12px',
      maxWidth: '300px',
      zIndex: 1000
    },
    sidebar: {
      width: '320px',
      backgroundColor: 'white',
      borderLeft: '1px solid #e5e7eb',
      overflowY: 'auto'
    },
    sidebarContent: {
      padding: '16px'
    },
    markerItem: {
      backgroundColor: '#f9fafb',
      borderRadius: '8px',
      padding: '12px',
      border: '1px solid #e5e7eb',
      marginBottom: '12px'
    },
    markerHeader: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between'
    },
    deleteButton: {
      color: '#dc2626',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: '4px',
      borderRadius: '4px'
    }
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerFlex}>
          <h1 style={styles.title}>
            Live Location Tracker
          </h1>
          
          <div style={styles.buttonGroup}>
            <button
              onClick={toggleMarkersVisibility}
              style={{...styles.button, ...styles.toggleButton}}
            >
              {showMarkers ? 'Hide' : 'Show'} Markers
            </button>
            
            <button
              onClick={isTracking ? stopLocationTracking : startLocationTracking}
              disabled={!navigator.geolocation}
              style={{
                ...styles.button, 
                ...(isTracking ? styles.stopButton : styles.trackingButton),
                opacity: !navigator.geolocation ? 0.5 : 1
              }}
            >
              {isTracking ? 'Stop Tracking' : 'Start Tracking'}
            </button>
          </div>
        </div>
        
        {error && (
          <div style={styles.error}>
            {error}
          </div>
        )}
      </div>

      <div style={styles.mainContent}>
        {/* Map Container */}
        <div style={styles.mapContainer}>
          <div ref={mapRef} style={{width: '100%', height: '100%'}} />
          
          {/* Current Location Info Overlay */}
          {currentLocation && (
            <div style={styles.overlay}>
              <div style={{display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px'}}>
                <div style={{width: '12px', height: '12px', backgroundColor: '#3b82f6', borderRadius: '50%'}}></div>
                <span style={{fontWeight: '600', color: '#1f2937'}}>Current Location</span>
              </div>
              <div style={{fontSize: '12px', color: '#6b7280'}}>
                <div>Lat: {currentLocation.lat.toFixed(6)}</div>
                <div>Lng: {currentLocation.lng.toFixed(6)}</div>
                <div>Accuracy: ±{Math.round(currentLocation.accuracy)}m</div>
                <div>Updated: {currentLocation.timestamp}</div>
              </div>
              <button
                onClick={centerOnCurrentLocation}
                style={{
                  marginTop: '8px',
                  width: '100%',
                  fontSize: '12px',
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  padding: '4px 8px',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Center on Location
              </button>
            </div>
          )}
          
          {/* Instructions */}
          <div style={styles.instructions}>
            <div style={{fontSize: '14px', color: '#1f2937'}}>
              <div style={{fontWeight: '600', marginBottom: '4px'}}>Instructions:</div>
              <div style={{fontSize: '12px', color: '#6b7280'}}>
                <div>• Click anywhere on the map to add a marker</div>
                <div>• Start tracking to see your live location</div>
                <div>• Click markers to see details</div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div style={styles.sidebar}>
          <div style={styles.sidebarContent}>
            <h2 style={{fontSize: '18px', fontWeight: '600', color: '#1f2937', marginBottom: '16px'}}>
              ➕ Markers ({markers.length})
            </h2>
            
            {markers.length === 0 ? (
              <div style={{color: '#6b7280', fontSize: '14px', textAlign: 'center', padding: '32px 0'}}>
                No markers added yet.<br/>
                Click on the map to add markers.
              </div>
            ) : (
              <div>
                {markers.map((marker) => (
                  <div key={marker.id} style={styles.markerItem}>
                    <div style={styles.markerHeader}>
                      <div style={{flex: 1}}>
                        <h3 style={{fontWeight: '500', color: '#1f2937', margin: '0 0 4px 0'}}>{marker.title}</h3>
                        <div style={{fontSize: '12px', color: '#6b7280'}}>
                          <div>Lat: {marker.lat.toFixed(6)}</div>
                          <div>Lng: {marker.lng.toFixed(6)}</div>
                          <div>Added: {marker.timestamp}</div>
                        </div>
                      </div>
                      <button
                        onClick={() => removeMarker(marker.id)}
                        style={styles.deleteButton}
                        title="Remove marker"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveLocationMap;