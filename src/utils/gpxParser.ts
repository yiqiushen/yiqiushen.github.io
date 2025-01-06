import { gpx } from '@tmcw/togeojson';
import { DOMParser } from '@xmldom/xmldom';

interface GPXPoint {
  lat: number;
  lon: number;
  time: string;
}

export function parseGPX(gpxString: string): { points: GPXPoint[], geojson: any } {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(gpxString, "text/xml");
  
  // Convert to GeoJSON
  const geojson = gpx(xmlDoc as unknown as Document);
  
  // Extract points
  const points: GPXPoint[] = [];
  const trkpts = xmlDoc.getElementsByTagName('trkpt');
  
  for (let i = 0; i < trkpts.length; i++) {
    const trkpt = trkpts[i];
    const lat = parseFloat(trkpt.getAttribute('lat') || '0');
    const lon = parseFloat(trkpt.getAttribute('lon') || '0');
    const time = trkpt.getElementsByTagName('time')[0]?.textContent || '';
    
    points.push({ lat, lon, time });
  }
  
  return { points, geojson };
}

export function calculateDistance(points: GPXPoint[]): number[] {
  const distances: number[] = [0];
  
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    const distance = haversineDistance(prev.lat, prev.lon, curr.lat, curr.lon);
    distances.push(distances[i - 1] + distance);
  }
  
  return distances;
}

function haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371e3; // meters
  const φ1 = lat1 * Math.PI/180;
  const φ2 = lat2 * Math.PI/180;
  const Δφ = (lat2-lat1) * Math.PI/180;
  const Δλ = (lon2-lon1) * Math.PI/180;

  const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  return R * c;
}
