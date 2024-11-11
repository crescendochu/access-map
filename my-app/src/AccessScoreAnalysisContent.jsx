// AccessScoreAnalysisContent.jsx
import React, { useState, useEffect, useRef } from 'react';
import Slider from '@mui/material/Slider';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

import { MapSidewalkAccessScore, MapBlockGroupAccessScore } from './MapAccessScore';

const label_colors = {
  'Curb Ramps': '#90C31F',
  'Missing Curb Ramps': '#E679B6',
  'Obstacles': '#78B0EA',
  'Surface Problems': '#F68D3E',
  'Missing Sidewalks': '#BE87D8'
};

const AccessScoreAnalysisContent = ({ sidewalkFeaturesLayers, layers, mapInstance}) => {
  const [map, setMap] = useState(null);
  // const [computeAccessScore, setComputeAccessScore] = useState(false);

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


  const [sliderValues, setSliderValues] = useState({
    'Curb Ramps': 1,
    'Missing Curb Ramps': 1,
    'Obstacles': 1,
    'Surface Problems': 1,
    'Missing Sidewalks': 1
  });

  const [checkboxes, setCheckboxes] = useState({
    'Curb Ramps': true,
    'Missing Curb Ramps': true,
    'Obstacles': true,
    'Surface Problems': true,
    'Missing Sidewalks': true
  });

  const [geoUnit, setGeoUnit] = useState('');

  const handleSliderChange = (label) => (event, newValue) => {
    setSliderValues(prevValues => ({
      ...prevValues,
      [label]: newValue
    }));
  };

  const handleCheckboxChange = (label) => (event) => {
    setCheckboxes(prevCheckboxes => ({
      ...prevCheckboxes,
      [label]: event.target.checked
    }));
  };

  const handleGeoUnitChange = (event) => {
    setGeoUnit(event.target.value);
  };


  const handleComputeAccessScore = () => {
    // Remove sources and layers if they exist
    if (map.getLayer('sidewalk-access-score')) {
      map.removeLayer('sidewalk-access-score');
      map.removeSource('sidewalk-access-score');
    }
    
    if (map.getLayer('blockgroup-access-score')) {
      map.removeLayer('blockgroup-access-score');
      map.removeSource('blockgroup-access-score');
    }

    // remove the legend
    const gradientLegend = document.getElementById('gradient-legend');
    if (gradientLegend) {
      gradientLegend.remove();
    }
  
    // Add the appropriate layer based on the geoUnit
    if (geoUnit === 'sidewalk segments') {
      MapSidewalkAccessScore(mapInstance, sliderValues, checkboxes);
    } else if (geoUnit === 'census block group') {
      MapBlockGroupAccessScore(mapInstance, sliderValues, checkboxes);
    }
};


  return (
    <Box sx={{ width: '100%' }}>
      {Object.keys(label_colors).map((label, index) => (
        <Box key={index} sx={{ marginBottom: 2 }}>
          <Box className='slider-heading' sx={{ display: 'flex', alignItems: 'center', borderLeft: `6px solid ${label_colors[label]}`, paddingLeft: 2, borderRadius: 1 }}>
            <Typography variant="h6" sx={{ fontSize: 16 }}>
              {label}
            </Typography>
            <Checkbox
              checked={checkboxes[label]}
              onChange={handleCheckboxChange(label)}
              name={label}
              color="primary"
            />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 1 }}>
            <Box sx={{ flex: '1 1 auto', marginRight: 2 }}>
              <Slider 
                value={sliderValues[label]}
                onChange={handleSliderChange(label)}
                step={0.1}
                min={0}
                max={1}
                valueLabelDisplay="auto"
                disabled={!checkboxes[label]}
              />
            </Box>
            <TextField 
              value={sliderValues[label]}
              variant="outlined" 
              size="small"
              sx={{ width: 50 }}
              disabled={!checkboxes[label]}
            />
          </Box>
        </Box>
      ))}
      <Box sx={{ marginTop: 2 }}>
        <FormControl fullWidth>
          <InputLabel id="geoUnitLabel">Select geographical unit</InputLabel>
          <Select
            labelId="geoUnitLabel"
            id="geoUnitSelect"
            value={geoUnit}
            onChange={handleGeoUnitChange}
          >
            {/* <MenuItem value={'zip code'}>Zip Code</MenuItem>
            <MenuItem value={'census tract'}>Census Tract</MenuItem> */}
            <MenuItem value={'census block group'}>Census Block Group</MenuItem>
            <MenuItem value={'sidewalk segments'}>Sidewalk Segments</MenuItem>
          </Select>
        </FormControl>

        <Box sx={{ marginTop: 2 }}>
          <Button  color="primary" onClick={handleComputeAccessScore}>
            Compute Access Score
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AccessScoreAnalysisContent;

