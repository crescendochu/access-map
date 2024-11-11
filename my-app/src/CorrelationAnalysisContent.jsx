// CorrelationAnalysisContent.jsx
import React, { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import ScatterPlot from './ScatterPlot';


import { MapPopulationDensity, MapIncomePerCapita, MapRent, MapWalk } from './MapSocioEconomicFactors';

import {updateNoCurbrampsLayer, noCurbrampsLayers, 
  updateCurbrampsLayer, curbrampsLayers, 
  updateNoSidewalkLayer, noSidewalkLayers, 
  updateObstacleLayer, obstacleLayers, 
  updateSurfaceProblemLayer, surfaceProblemLayers} from './SidewalkData';

import populationMissingCurb from './img/populationMissingCurb.png'


const CorrelationAnalysisContent = ({layers, mapInstance}) => {
  const mapRef = useRef();
  const [map, setMap] = useState(null);
  const [sidewalkFactor, setSidewalkFactor] = React.useState('');
  const [socioeconomicFactor, setSocioeconomicFactor] = React.useState('');
  const [showImage, setShowImage] = useState(false);
  const [showScatterPlot, setShowScatterPlot] = useState(false);

  useEffect(() => {
    if (mapInstance) {
      setMap(mapInstance);
    }
  }, [mapInstance]);

  useEffect(() => {
    if (mapInstance.current && mapInstance.current.getMap()) {
      setMap(mapInstance.current.getMap());
    }
  }, [mapInstance]);


  const handleSocioEconomicChange = (event) => {
    // remove all map layers with analysis prefix
    const analysisLayersIds = ['analysis-population-density', 'analysis-income-per-capita', 'analysis-rent', 'analysis-walk'];

    analysisLayersIds.forEach(layerId => {
      const layer = mapInstance.getLayer(layerId);
      if (layer) {
        mapInstance.removeLayer(layerId);
        mapInstance.removeSource(layerId);
      }
    });

    const gradientLegend = document.getElementById('gradient-legend');
    if (gradientLegend) {
      gradientLegend.remove();
    }
    
    setSocioeconomicFactor(event.target.value);
    if (event.target.value === 'Population Density') {
      MapPopulationDensity(mapInstance);
    };
    if (event.target.value === 'Income Per Capita') {
      MapIncomePerCapita(mapInstance);
    };
    if (event.target.value === 'Median Gross Rent') {
      MapRent(mapInstance);
    };
    if (event.target.value === 'Walked%') {
      MapWalk(mapInstance);
    }
  };

  const handleSidewalkChange = (event) => {
    // hide all map layers with sidewalk prefix

    // put all sidewalk features layers in an array

    const sidewalkFeaturesLayerIds = layers.filter(layer => layer.id.startsWith('sidewalk-')).map(layer => layer.id);
    sidewalkFeaturesLayerIds.forEach(layerId => {
      const layer = mapInstance.getLayer(layerId);
      if (layer) {
        mapInstance.setLayoutProperty(layerId, 'visibility', 'none');
      }
    });

    setSidewalkFactor(event.target.value);
    if (event.target.value === 'no_curb_ramp_count') {
      mapInstance.setLayoutProperty('sidewalk-no-curb', 'visibility', 'visible');
      updateNoCurbrampsLayer(mapInstance);
      // move map to the top
      mapInstance.moveLayer('sidewalk-no-curb');
      updateNoCurbrampsLayer(mapInstance);
      
    }
    if (event.target.value === 'no_sidewalk_count') {
      mapInstance.setLayoutProperty('sidewalk-no-sidewalk', 'visibility', 'visible');
      updateNoSidewalkLayer(mapInstance);
      // move map to the top
      mapInstance.moveLayer('sidewalk-no-sidewalk');
      updateNoSidewalkLayer(mapInstance);
    }
    if (event.target.value === 'obstacle_count') {
      mapInstance.setLayoutProperty('sidewalk-obstacle', 'visibility', 'visible');
      updateObstacleLayer(mapInstance);
      // move map to the top
      mapInstance.moveLayer('sidewalk-obstacle');
      updateObstacleLayer(mapInstance);
    }
    if (event.target.value === 'surface_problem_count') {
      mapInstance.setLayoutProperty('sidewalk-surface', 'visibility', 'visible');
      updateSurfaceProblemLayer(mapInstance);
      // move map to the top
      mapInstance.moveLayer('sidewalk-surface');
      updateSurfaceProblemLayer(mapInstance);
    }
    if (event.target.value === 'curb_ramp_count') {
      mapInstance.setLayoutProperty('sidewalk-curb', 'visibility', 'visible');
      updateCurbrampsLayer(mapInstance);
      // move map to the top
      mapInstance.moveLayer('sidewalk-curb');
      updateCurbrampsLayer(mapInstance);
    }

  };

  const handleCorrelationAnalysis = () => {
    setShowImage(true);
    console.log('Enter Correlation Analysis')

  };


  
  return (
    <Box sx={{ width: '100%', marginBottom: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
        <FormControl fullWidth>
          <InputLabel id="socio-economic-factor-label" 
          sx={{
          zIndex: 1,
          backgroundColor: '#fff', 
        }}
        >Socio-Economic Factors</InputLabel>
          <Select
            labelId="socio-economic-factor-label"
            id="socio-economic-factor-select"
            value={socioeconomicFactor}
            onChange={handleSocioEconomicChange}
          >
            <MenuItem value={'Population Density'}>Population Density</MenuItem>
            <MenuItem value={'Income Per Capita'}>Income Per Capita</MenuItem>
            <MenuItem value={'Median Gross Rent'}>Median Gross Rent</MenuItem>
            <MenuItem value={'Walked%'}>Percentage of People Who Walk To Work</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
        <FormControl fullWidth>
          <InputLabel id="sidewalk-factor-label">Sidewalk Factors</InputLabel> 
          <Select
            labelId="sidewalk-factor-label"
            id="sidewalk-factor-select"
            value={sidewalkFactor}
            onChange={handleSidewalkChange}
          >
            <MenuItem value={'no_curb_ramp_count'}>Number of Missing Curb Ramps</MenuItem>
            <MenuItem value={'no_sidewalk_count'}>Number of Missing Sidewalks</MenuItem>
            <MenuItem value={'obstacle_count'}>Number of Obstacles</MenuItem>
            <MenuItem value={'surface_problem_count'}>Number of Surface Problems</MenuItem>
            <MenuItem value={'curb_ramp_count'}>Number of Curb Ramps</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box className="correlation" sx={{ display: 'flex', justifyContent: 'center', marginTop: 2, alignItems: 'column' }}>
        <Button color="primary" onClick={() => setShowScatterPlot(true)}>
          Start Correlation Analysis
        </Button>
        {showScatterPlot && <ScatterPlot socioeconomic={socioeconomicFactor} sidewalk={sidewalkFactor} />}
      </Box>
    </Box>
  );  
};

export default CorrelationAnalysisContent;
