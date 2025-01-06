const fs = require('fs');
const { gpx } = require('@tmcw/togeojson');
const { DOMParser } = require('@xmldom/xmldom');

// Create routes directory if it doesn't exist
const outputDir = './public/routes';
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

// Read all GPX files from src/data/routes
const gpxFiles = fs.readdirSync('./src/data/routes').filter(file => file.endsWith('.gpx'));

gpxFiles.forEach(file => {
  const gpxContent = fs.readFileSync(`./src/data/routes/${file}`, 'utf8');
  const parser = new DOMParser();
  const gpxDoc = parser.parseFromString(gpxContent, 'text/xml');
  const geoJson = gpx(gpxDoc);
  
  // Save as GeoJSON
  const outputFile = file.replace('.gpx', '.json');
  fs.writeFileSync(
    `${outputDir}/${outputFile}`,
    JSON.stringify(geoJson, null, 2)
  );
  console.log(`Converted ${file} to ${outputFile}`);
});
