// MapAccessScore.jsx
import { useEffect } from 'react';
import axios from 'axios';
import mapboxgl from 'mapbox-gl';
import { createGradientLegend} from './Legends.jsx';
import { attachTooltip } from './ToolTip.js';

export const sidewalkAccessScoreGeoJsonUrl = 'https://raw.githubusercontent.com/crescendochu/access-score/main/seattle/json-for-publishing/access-score/access-score-per-sidewalk.geojson';
export const blockGroupAccessScoreGeoJsonUrl = 'https://raw.githubusercontent.com/crescendochu/access-score/main/seattle/json-for-publishing/access-score/access-score-per-blockgroup.geojson';

export const MapSidewalkAccessScore  = (map, sliderValues, checkboxes) => {
  // Add a new line layer for the access score
  const fetchData = async () => {
    if (map) {
      const {
        'Curb Ramps': curbRampsSliderValue,
        'Missing Curb Ramps': noCurbRampsSliderValue,
        'Obstacles': obstaclesSliderValue,
        'Surface Problems': surfaceProblemsSliderValue,
        'Missing Sidewalks': noSidewalksSliderValue
      } = sliderValues;

      const {
        'Curb Ramps': curbRampsChecked,
        'Missing Curb Ramps': noCurbRampsChecked,
        'Obstacles': obstaclesChecked,
        'Surface Problems': surfaceProblemsChecked,
        'Missing Sidewalks': noSidewalksChecked
      } = checkboxes;

      try {
        // Fetch the GeoJSON data from the URL
        const response = await axios.get(sidewalkAccessScoreGeoJsonUrl);
        const geoJsonData = response.data;

        // Modify the GeoJSON data by adding a new column
        geoJsonData.features.forEach(feature => {
          const curbRampsValue = curbRampsChecked ? parseFloat(curbRampsSliderValue) : 0;
          const noCurbRampsValue = noCurbRampsChecked ? parseFloat(noCurbRampsSliderValue) : 0;
          const obstaclesValue = obstaclesChecked ? parseFloat(obstaclesSliderValue) : 0;
          const surfaceProblemsValue = surfaceProblemsChecked ? parseFloat(surfaceProblemsSliderValue) : 0;
          const noSidewalksValue = noSidewalksChecked ? parseFloat(noSidewalksSliderValue) : 0;
          const curbRampAvgScore = feature.properties.curb_ramp_avg_score;
          const noCurbRampAvgScore = feature.properties.no_curb_ramp_avg_score;
          const noSidewalkAvgScore = feature.properties.no_sidewalk_avg_score;
          const obstacleAvgScore = feature.properties.obstacle_avg_score;
          const surfaceProblemAvgScore = feature.properties.surface_problem_avg_score;

          // Perform the multiplication and store the result in a new column
          feature.properties.new_total_score = curbRampsValue * curbRampAvgScore
            + noCurbRampsValue * noCurbRampAvgScore
            + obstaclesValue * obstacleAvgScore
            + surfaceProblemsValue * surfaceProblemAvgScore
            + noSidewalksValue * noSidewalkAvgScore;
        });

        map.addSource('sidewalk-access-score', {
          type: 'geojson',
          data: geoJsonData
        });

        map.addLayer({
          id: 'sidewalk-access-score',
          type: 'line',
          source: 'sidewalk-access-score',
          layout: {
            'line-cap': 'round',
            'line-join': 'round'
          },
          paint: {
            'line-color': [
              'interpolate',
              ['linear'],
              ['get', 'new_total_score'], // Use the new column for the line color
              -1, '#cf597e',
              -0.8, '#e88471',
              -0.6, '#eeb479',
              -0.4, '#e9e29c',
              -0.2, '#9ccb86',
              0, '#39b185'
            ],
            'line-width': 1,
            'line-opacity': 0.8
          }
        });

        console.log('Sidewalk Access Score added');
        console.log(curbRampsChecked, curbRampsSliderValue);
        console.log(noCurbRampsChecked, noCurbRampsSliderValue);
        console.log(obstaclesChecked, obstaclesSliderValue);
        console.log(surfaceProblemsChecked, surfaceProblemsSliderValue);
        console.log(noSidewalksChecked, noSidewalksSliderValue);        
        
      } catch (error) {
        // Handle any error that occurred during the fetch or modification of the GeoJSON data
        console.error(error);
      }
    } else {
      console.log('Map is not ready');
    }
  };
  fetchData();

  const legendColors = [
    { color: '#cf597e' },
    { color: '#e88471' },
    { color: '#eeb479' },
    { color: '#e9e29c' },
    { color: '#9ccb86' },
    { color: '#39b185' },
  ];

  const title = 'Access Score Per Sidewalk';

  const min = -1;
  const max = 0;

  createGradientLegend(map, legendColors, min, max, title);
};

     
export const MapBlockGroupAccessScore= (map, sliderValues, checkboxes) => {
  // Add a new polygon layer for the access score
  const layerId = 'blockgroup-access-score';

  const fetchData = async () => {
    if (map) {
      const {
        'Curb Ramps': curbRampsSliderValue,
        'Missing Curb Ramps': noCurbRampsSliderValue,
        'Obstacles': obstaclesSliderValue,
        'Surface Problems': surfaceProblemsSliderValue,
        'Missing Sidewalks': noSidewalksSliderValue
      } = sliderValues;

      const {
        'Curb Ramps': curbRampsChecked,
        'Missing Curb Ramps': noCurbRampsChecked,
        'Obstacles': obstaclesChecked,
        'Surface Problems': surfaceProblemsChecked,
        'Missing Sidewalks': noSidewalksChecked
      } = checkboxes;

      try {
        // Fetch the GeoJSON data from the URL
        const response = await axios.get(blockGroupAccessScoreGeoJsonUrl);
        const geoJsonData = response.data;

        // Modify the GeoJSON data by adding a new column
        geoJsonData.features.forEach(feature => {
          const curbRampsValue = curbRampsChecked ? parseFloat(curbRampsSliderValue) : 0;
          const noCurbRampsValue = noCurbRampsChecked ? parseFloat(noCurbRampsSliderValue) : 0;
          const obstaclesValue = obstaclesChecked ? parseFloat(obstaclesSliderValue) : 0;
          const surfaceProblemsValue = surfaceProblemsChecked ? parseFloat(surfaceProblemsSliderValue) : 0;
          const noSidewalksValue = noSidewalksChecked ? parseFloat(noSidewalksSliderValue) : 0;
          const curbRampAvgScore = feature.properties.curb_ramp_avg_score;
          const noCurbRampAvgScore = feature.properties.no_curb_ramp_avg_score;
          const noSidewalkAvgScore = feature.properties.no_sidewalk_avg_score;
          const obstacleAvgScore = feature.properties.obstacle_avg_score;
          const surfaceProblemAvgScore = feature.properties.surface_problem_avg_score;

          // Perform the multiplication and store the result in a new column
          feature.properties.new_total_score = curbRampsValue * curbRampAvgScore
            + noCurbRampsValue * noCurbRampAvgScore
            + obstaclesValue * obstacleAvgScore
            + surfaceProblemsValue * surfaceProblemAvgScore
            + noSidewalksValue * noSidewalkAvgScore;
        });

        map.addSource(layerId, {
          type: 'geojson',
          data: geoJsonData
        });

        map.addLayer({
          id: layerId,
          type: 'fill',
          source: layerId,
          layout: {},
          paint: {
            'fill-color': [
              'interpolate',
              ['linear'],
              ['get', 'new_total_score'],
              -1, '#cf597e', 
              -0.8, '#e88471',
              -0.6, '#eeb479', 
              -0.4,'#e9e29c',
              -0.2,'#9ccb86',
              0, '#39b185'  // use green color when total_score is 0
            ],
            'fill-opacity': .5
          }
        });

        console.log('Sidewalk Access Score added');
        console.log(curbRampsChecked, curbRampsSliderValue);
        console.log(noCurbRampsChecked, noCurbRampsSliderValue);
        console.log(obstaclesChecked, obstaclesSliderValue);
        console.log(surfaceProblemsChecked, surfaceProblemsSliderValue);
        console.log(noSidewalksChecked, noSidewalksSliderValue);      
        
      } catch (error) {
        // Handle any error that occurred during the fetch or modification of the GeoJSON data
        console.error(error);
      }
    } else {
      console.log('Map is not ready');
    }
  };

  fetchData();

    const legendColors = [
      { color: '#cf597e' },
      { color: '#e88471' },
      { color: '#eeb479' },
      { color: '#e9e29c' },
      { color: '#9ccb86' },
      { color: '#39b185' },
    ];

    const title = 'Access Score Per Block Group';

    const min = -1;
    const max = 0;

    createGradientLegend(map, legendColors, min, max, title);

    const tooltipFormatFunction = (feature) => {
      const totalScore = feature.properties.total_score;
      const roundedTotalScore = parseFloat(totalScore).toFixed(2);
      return `<p>Access Score: ${roundedTotalScore}</p>`;
    };
  
    // Attach the tooltip to the layer
    attachTooltip(map, layerId, tooltipFormatFunction);


  };