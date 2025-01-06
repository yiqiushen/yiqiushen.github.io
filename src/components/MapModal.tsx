import React, { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import { Box, Modal } from '@mui/material';

interface MapModalProps {
  open: boolean;
  onClose: () => void;
  geoJsonPath: string;
}

const MapModal: React.FC<MapModalProps> = ({ open, onClose, geoJsonPath }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const markersRef = useRef<maplibregl.Marker[]>([]);

  // Clear existing markers
  const clearMarkers = () => {
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];
  };

  // Function to update markers and bounds for a route
  const updateRouteDisplay = (data: any) => {
    if (!map.current) return;
    if (typeof data === 'string' || !data || !('features' in data)) return;
    
    clearMarkers();
    const bounds = new maplibregl.LngLatBounds();
    
    data.features.forEach((feature: GeoJSON.Feature<GeoJSON.Geometry>) => {
      if (feature.geometry.type === 'LineString') {
        const lineString = feature.geometry as GeoJSON.LineString;
        
        // Get start and end coordinates
        const startCoord = lineString.coordinates[0];
        const endCoord = lineString.coordinates[lineString.coordinates.length - 1];
        
        // Add markers
        if (startCoord && endCoord) {
          // Start marker
          const startMarker = new maplibregl.Marker({ color: '#4CAF50' })
            .setLngLat([startCoord[0], startCoord[1]])
            .setPopup(new maplibregl.Popup().setText('Start'))
            .addTo(map.current!);
          
          // End marker
          const endMarker = new maplibregl.Marker({ color: '#F44336' })
            .setLngLat([endCoord[0], endCoord[1]])
            .setPopup(new maplibregl.Popup().setText('Finish'))
            .addTo(map.current!);

          // Store markers for cleanup
          markersRef.current.push(startMarker, endMarker);
        }
        
        // Extend bounds
        lineString.coordinates.forEach((coord) => {
          if (coord.length >= 2) {
            bounds.extend([coord[0], coord[1]]);
          }
        });
      }
    });
    
    // Fit bounds to show entire route with padding
    map.current?.fitBounds(bounds, {
      padding: 50,
      maxZoom: 15
    });
  };

  useEffect(() => {
    if (!mapContainer.current || !open) return;

    const initializeMap = async () => {
      try {
        map.current = new maplibregl.Map({
          container: mapContainer.current!,
          style: {
            version: 8,
            sources: {
              'osm': {
                type: 'raster',
                tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
                tileSize: 256,
                attribution: '© OpenStreetMap contributors'
              }
            },
            layers: [
              {
                id: 'osm',
                type: 'raster',
                source: 'osm'
              }
            ]
          },
          center: [0, 0],
          zoom: 12
        });

        // Add navigation control
        map.current.addControl(new maplibregl.NavigationControl());

        // Wait for map to load
        await new Promise<void>(resolve => {
          map.current?.on('load', () => {
            console.log('Map loaded successfully');
            resolve();
          });
        });

        try {
          // Load the provided route file
          const response = await fetch(geoJsonPath);
          const routeData = await response.json();

          // Add route source
          map.current?.addSource('route', {
            type: 'geojson',
            data: routeData
          });

          // Update display for the route
          updateRouteDisplay(routeData);

          // Add route layer
          map.current?.addLayer({
            id: 'route',
            type: 'line',
            source: 'route',
            layout: {
              'line-join': 'round',
              'line-cap': 'round'
            },
            paint: {
              'line-color': '#3bb2d0',
              'line-width': 6
            }
          });
        } catch (error) {
          console.error('Error loading route file:', error);
        }
      } catch (error) {
        console.error('Error initializing map:', error);
      }
    };

    initializeMap();

    return () => {
      if (map.current) {
        clearMarkers();
        map.current.remove();
        map.current = null;
      }
    };
  }, [open, geoJsonPath]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="map-modal-title"
      aria-describedby="map-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80vw',
          height: '80vh',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 0,
          overflow: 'hidden'
        }}
      >
        <div 
          ref={mapContainer} 
          style={{ 
            width: '100%', 
            height: '100%',
            position: 'relative',
            overflow: 'hidden'
          }} 
        />
      </Box>
    </Modal>
  );
};

export default MapModal;
