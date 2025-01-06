declare module '@mapbox/togeojson' {
  import { Document } from '@xmldom/xmldom';
  
  interface ToGeoJSON {
    (doc: Document): GeoJSON.FeatureCollection;
  }

  const gpx: ToGeoJSON;
  const tcx: ToGeoJSON;
  const kml: ToGeoJSON;

  export { gpx, tcx, kml };
}
