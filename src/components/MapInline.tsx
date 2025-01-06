import React, { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

interface MapInlineProps {
  geoJsonPath: string;
}

const MapInline: React.FC<MapInlineProps> = ({ geoJsonPath }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const markersRef = useRef<maplibregl.Marker[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const animationRef = useRef<number | null>(null);
  const routeCoordinatesRef = useRef<number[][]>([]);

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
    
    // Initialize bounds with first coordinate if available
    let bounds = new maplibregl.LngLatBounds();
    let hasSetInitialBounds = false;
    
    data.features.forEach((feature: GeoJSON.Feature<GeoJSON.Geometry>) => {
      if (feature.geometry.type === 'LineString' || feature.geometry.type === 'MultiLineString') {
        let coordinates: number[][];
        
        if (feature.geometry.type === 'LineString') {
          coordinates = feature.geometry.coordinates;
        } else {
          // For MultiLineString, flatten all line coordinates into a single array
          coordinates = feature.geometry.coordinates.reduce((acc, line) => acc.concat(line), []);
        }
        
        // Store coordinates for animation
        routeCoordinatesRef.current = coordinates;
        
        if (coordinates.length > 0) {
          // Get start and end coordinates
          const startCoord = coordinates[0];
          const endCoord = coordinates[coordinates.length - 1];
          
          if (startCoord && endCoord) {
            // Start marker
            const startMarker = new maplibregl.Marker({ color: '#4CAF50' })
              .setLngLat([startCoord[0], startCoord[1]])
              .setPopup(new maplibregl.Popup().setText('Start'))
              .addTo(map.current);

            const startElement = startMarker.getElement();
            startElement.addEventListener('mouseenter', () => {
              if (!isAnimating) {
                setIsAnimating(true);
                animateRoute(false);
              }
            });
            startElement.addEventListener('mouseleave', () => {
              setIsAnimating(false);
            });
            
            // End marker
            const endMarker = new maplibregl.Marker({ color: '#F44336' })
              .setLngLat([endCoord[0], endCoord[1]])
              .setPopup(new maplibregl.Popup().setText('Finish'))
              .addTo(map.current);

            const endElement = endMarker.getElement();
            endElement.addEventListener('mouseenter', () => {
              if (!isAnimating) {
                setIsAnimating(true);
                animateRoute(true);
              }
            });
            endElement.addEventListener('mouseleave', () => {
              setIsAnimating(false);
            });
            
            markersRef.current.push(startMarker, endMarker);

            // Set initial bounds if not set
            if (!hasSetInitialBounds) {
              bounds = new maplibregl.LngLatBounds()
                .extend([startCoord[0], startCoord[1]])
                .extend([endCoord[0], endCoord[1]]);
              hasSetInitialBounds = true;
            }
          }
          
          // Extend bounds for all coordinates
          coordinates.forEach((coord) => {
            if (coord.length >= 2) {
              bounds.extend([coord[0], coord[1]]);
            }
          });
        }
      }
    });
    
    // Fit bounds to show entire route with padding
    if (hasSetInitialBounds) {
      map.current.fitBounds(bounds, {
        padding: 50,
        maxZoom: 15,
        minZoom: 8,
        duration: 1000,
        animate: true
      });
    }
  };

  const animateRoute = (reverse: boolean = false) => {
    if (!map.current || !isAnimating) return;

    const speed = 30; // Animation speed (ms)
    const coordinates = routeCoordinatesRef.current;
    
    let currentIndex = reverse ? coordinates.length - 1 : 0;
    const endIndex = reverse ? 0 : coordinates.length;
    const step = reverse ? -1 : 1;

    const animate = () => {
      if (!isAnimating) return;

      currentIndex += step;
      const done = reverse ? currentIndex < endIndex : currentIndex >= endIndex;

      if (done) {
        setIsAnimating(false);
        return;
      }

      const currentCoords = reverse 
        ? coordinates.slice(currentIndex)
        : coordinates.slice(0, currentIndex);

      if (map.current?.getSource('route')) {
        (map.current.getSource('route') as maplibregl.GeoJSONSource).setData({
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: currentCoords
          }
        });
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();
  };

  useEffect(() => {
    if (!mapContainer.current) return;

    const initializeMap = async () => {
      if (!map.current) {
        map.current = new maplibregl.Map({
          container: mapContainer.current,
          style: {
            version: 8,
            sources: {
              'osm': {
                type: 'raster',
                tiles: ['https://a.tile.openstreetmap.org/{z}/{x}/{y}.png'],
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
      }

      try {
        // Load the provided route file
        const response = await fetch(process.env.PUBLIC_URL + geoJsonPath);
        const routeData = await response.json();

        // Remove existing source and layer if they exist
        if (map.current?.getSource('route')) {
          if (map.current?.getLayer('route')) {
            map.current?.removeLayer('route');
          }
          map.current?.removeSource('route');
        }

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
    };

    initializeMap();

    // Cleanup function
    return () => {
      // Cancel any ongoing animation
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      
      // Clear map instance
      if (map.current) {
        clearMarkers();
        if (map.current.getLayer('route')) {
          map.current.removeLayer('route');
        }
        if (map.current.getSource('route')) {
          map.current.removeSource('route');
        }
        map.current.remove();
        map.current = null;
      }
    };
  }, [geoJsonPath]);

  return (
    <div 
      ref={mapContainer} 
      style={{ 
        width: '100%', 
        height: '400px',
        marginTop: '16px',
        borderRadius: '8px',
        overflow: 'hidden'
      }} 
    />
  );
};

export default MapInline;
