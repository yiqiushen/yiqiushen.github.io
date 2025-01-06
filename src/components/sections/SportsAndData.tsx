import React, { useState } from 'react';
import { Box, Typography, Paper, Grid, Card, CardContent, Chip, CardActionArea } from '@mui/material';
import Plot from 'react-plotly.js';
import { calculateDistance, parseGPX } from '../../utils/gpxParser';
import MapInline from '../MapInline';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { bestScores } from '../../data/runningScores';

const SportsAndData: React.FC = () => {
  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(null);
  const [runningData, setRunningData] = useState<{
    time: number[], 
    distance: number[], 
    predictedTime: number[], 
    predictedFinish: number[]
  }>({
    time: [], 
    distance: [], 
    predictedTime: [], 
    predictedFinish: []
  });

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCardClick = async (index: number, geoJsonPath: string | undefined) => {
    if (geoJsonPath) {
      if (selectedCardIndex === index) {
        setSelectedCardIndex(null);
        setRunningData({time: [], distance: [], predictedTime: [], predictedFinish: []});
      } else {
        setSelectedCardIndex(index);
        // Get GPX file path from JSON path
        const gpxPath = process.env.PUBLIC_URL + geoJsonPath.replace('.json', '.gpx');
        try {
          const response = await fetch(gpxPath);
          const gpxStr = await response.text();
          const { points } = parseGPX(gpxStr);
          const distances = calculateDistance(points);
          const startTime = new Date(points[0].time).getTime();
          
          // Calculate predicted finish times
          const predictedData = points.reduce((acc, p, i) => {
            if (i === 0 || i % 50 === 0) {
              const timeDiff = (new Date(p.time).getTime() - startTime) / 1000;
              const pace = distances[i] / timeDiff;
              let predictedSeconds;
              // Set target distance based on event type
              const targetDistance = bestScores[index].event === "Marathon" ? 42195 :
                                   bestScores[index].event === "Half Marathon" ? 21097.5 :
                                   bestScores[index].event === "10K" ? 10000 :
                                   bestScores[index].event === "5K" ? 5000 : 0;
              predictedSeconds = targetDistance / pace;
              acc.times.push(timeDiff);
              acc.finishTimes.push(predictedSeconds);
            }
            return acc;
          }, {times: [] as number[], finishTimes: [] as number[]});

          setRunningData({
            time: points.map(p => (new Date(p.time).getTime() - startTime) / 1000),
            distance: distances,
            predictedTime: predictedData.times,
            predictedFinish: predictedData.finishTimes
          });
        } catch (error) {
          console.error('Error loading GPX data:', error);
        }
      }
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Sports & Data
      </Typography>
      
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <DirectionsRunIcon color="primary" sx={{ mr: 1, fontSize: 30 }} />
              <Typography variant="h5">Running</Typography>
            </Box>
            <Typography variant="body1" paragraph>
              I am a recreation long-distance runner! I enjoy challenging myself and maintaining an active lifestyle through running.
            </Typography>
            
            <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
              Click on any race to see its route, and click again to close the map.
            </Typography>
            
            <Grid container spacing={2}>
              {bestScores.map((score, index) => (
                <Grid item xs={12} sm={3} key={index}>
                  <Card 
                    sx={{ 
                      height: '100%',
                      transition: 'transform 0.2s',
                      '&:hover': {
                        transform: 'scale(1.02)',
                        cursor: score.geoJsonPath ? 'pointer' : 'default'
                      }
                    }}
                  >
                    <CardActionArea 
                      onClick={() => handleCardClick(index, score.geoJsonPath)}
                      disabled={!score.geoJsonPath}
                      sx={{ height: '100%', cursor: score.geoJsonPath ? 'pointer' : 'default' }}
                    >
                      <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <EmojiEventsIcon color="primary" sx={{ mr: 1 }} />
                        <Typography variant="h6" component="div">
                          {score.event}
                        </Typography>
                      </Box>
                      <Typography variant="h4" color="primary" gutterBottom>
                        {score.time}
                      </Typography>
                      <Chip 
                        label={score.location}
                        size="small"
                        sx={{ mb: 1 }}
                      />
                      <Typography variant="body2" color="text.secondary">
                        {new Date(score.date + 'T00:00:00').toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          timeZone: 'UTC'
                        })}
                      </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
              {selectedCardIndex !== null && bestScores[selectedCardIndex]?.geoJsonPath && (
                <>
                  <Grid item xs={12} md={6}>
                    <MapInline geoJsonPath={bestScores[selectedCardIndex].geoJsonPath} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Plot
                      key={`${selectedCardIndex}-${runningData.time.length}`}
                      data={[
                        {
                          x: runningData.time,
                          y: runningData.distance,
                          type: 'scatter',
                          mode: 'lines',
                          marker: {color: '#F44336'},
                          line: {shape: 'spline', width: 2},
                          name: 'Distance',
                          hovertemplate: 'Distance: %{y:,.0f}m<br>Time: %{text}<extra></extra>',
                          text: runningData.time.map(formatTime)
                        },
                        {
                          x: runningData.predictedTime,
                          y: runningData.predictedFinish,
                          type: 'scatter',
                          mode: 'lines',
                          marker: {color: '#2196F3', size: 8},
                          line: {shape: 'spline', width: 2},
                          name: 'Projected Finish Time',
                          yaxis: 'y2',
                          hovertemplate: 'Projected: %{text}<extra></extra>',
                          text: runningData.predictedFinish.map(formatTime)
                        }
                      ]}
                      layout={{
                        title: `${bestScores[selectedCardIndex].event} Analysis`,
                        xaxis: {
                          title: {
                            text: 'Elapsed Time (HH:MM:SS)',
                            standoff: 40  // Increase space between title and tick labels
                          },
                          type: 'linear',
                          showgrid: true,
                          gridcolor: '#E0E0E0',
                          tickformat: '%H:%M:%S',
                          tickangle: 45,  // Rotate tick labels for better readability
                          tickvals: Array.from(
                            {length: bestScores[selectedCardIndex].event === "Marathon" ? 13 : // Every 30 mins for 6 hours
                                    bestScores[selectedCardIndex].event === "Half Marathon" ? 7 : // Every 30 mins for 3 hours
                                    bestScores[selectedCardIndex].event === "10K" ? 8 : // Every 10 mins for 70 mins
                                    bestScores[selectedCardIndex].event === "5K" ? 8 : // Every 5 mins for 35 mins
                                    13}, 
                            (_, i) => bestScores[selectedCardIndex].event === "Marathon" ? i * 1800 : // 30 min intervals
                                     bestScores[selectedCardIndex].event === "Half Marathon" ? i * 1800 : // 30 min intervals
                                     bestScores[selectedCardIndex].event === "10K" ? i * 600 : // 10 min intervals
                                     bestScores[selectedCardIndex].event === "5K" ? i * 300 : // 5 min intervals
                                     i * 1800
                          ),
                          ticktext: Array.from(
                            {length: bestScores[selectedCardIndex].event === "Marathon" ? 13 :
                                    bestScores[selectedCardIndex].event === "Half Marathon" ? 7 :
                                    bestScores[selectedCardIndex].event === "10K" ? 8 :
                                    bestScores[selectedCardIndex].event === "5K" ? 8 :
                                    13}, 
                            (_, i) => formatTime(bestScores[selectedCardIndex].event === "Marathon" ? i * 1800 :
                                               bestScores[selectedCardIndex].event === "Half Marathon" ? i * 1800 :
                                               bestScores[selectedCardIndex].event === "10K" ? i * 600 :
                                               bestScores[selectedCardIndex].event === "5K" ? i * 300 :
                                               i * 1800)
                          )
                        },
                        yaxis: {
                          title: 'Distance (meters)',
                          rangemode: 'tozero',
                          showgrid: false,
                          gridcolor: '#E0E0E0'
                        },
                        yaxis2: {
                          title: 'Projected Finish Time (HH:MM:SS)',
                          overlaying: 'y',
                          side: 'right',
                          showgrid: true,
                          gridcolor: '#E0E0E0',
                          tickmode: 'array',
                          ticktext: Array.from(
                            {length: 5}, 
                            (_, i) => formatTime(i * (bestScores[selectedCardIndex].event === "Marathon" ? 21600 / 4 : // 6 hours / 4
                                                    bestScores[selectedCardIndex].event === "Half Marathon" ? 10800 / 4 : // 3 hours / 4
                                                    bestScores[selectedCardIndex].event === "10K" ? 4500 / 4 : // 75 mins / 4
                                                    bestScores[selectedCardIndex].event === "5K" ? 2100 / 4 : // 35 mins / 4
                                                    21600 / 4))
                          ),
                          tickvals: Array.from(
                            {length: 5}, 
                            (_, i) => i * (bestScores[selectedCardIndex].event === "Marathon" ? 21600 / 4 : // 6 hours / 4
                                         bestScores[selectedCardIndex].event === "Half Marathon" ? 10800 / 4 : // 3 hours / 4
                                         bestScores[selectedCardIndex].event === "10K" ? 4500 / 4 : // 75 mins / 4
                                         bestScores[selectedCardIndex].event === "5K" ? 2100 / 4 : // 35 mins / 4
                                         21600 / 4)
                          ),
                          range: [0, bestScores[selectedCardIndex].event === "Marathon" ? 21600 : // 6 hours
                                   bestScores[selectedCardIndex].event === "Half Marathon" ? 10800 : // 3 hours
                                   bestScores[selectedCardIndex].event === "10K" ? 4500 : // 75 mins
                                   bestScores[selectedCardIndex].event === "5K" ? 2100 : // 35 mins
                                   21600]
                        },
                        margin: {l: 60, r: 80, t: 40, b: 70},  // Increase bottom margin
                        showlegend: true,
                        legend: {
                          x: 0.95,
                          xanchor: 'right',
                          y: 0.05
                        },
                        plot_bgcolor: '#FFFFFF',
                        paper_bgcolor: '#FFFFFF',
                        hovermode: 'x unified'
                      }}
                      config={{
                        responsive: true,
                        displayModeBar: true,
                        displaylogo: false
                      }}
                      style={{width: '100%', height: '400px'}}
                    />
                  </Grid>
                </>
              )}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SportsAndData;
