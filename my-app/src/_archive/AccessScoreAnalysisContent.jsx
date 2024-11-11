// AccessScoreAnalysisContent.jsx
import React, { useState } from 'react';
import Slider from '@mui/material/Slider';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox'; // Changed from Switch

const label_colors = {
  'Curb Ramps': '#90C31F',
  'Missing Curb Ramps': '#E679B6',
  'Obstacles': '#78B0EA',
  'Surface Problems': '#F68D3E',
  'Missing Sidewalks': '#BE87D8'
};

const AccessScoreAnalysisContent = () => {
  const [sliderValues, setSliderValues] = useState({
    'Curb Ramps': 0.5,
    'Missing Curb Ramps': 0.5,
    'Obstacles': 0.5,
    'Surface Problems': 0.5,
    'Missing Sidewalks': 0.5
  });

  const [checkboxes, setCheckboxes] = useState({
    'Curb Ramps': true,
    'Missing Curb Ramps': true,
    'Obstacles': true,
    'Surface Problems': true,
    'Missing Sidewalks': true
  });

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

  return (
    <Box sx={{ width: '100%' }}>
      {Object.keys(label_colors).map((label, index) => (
        <Box  key={index} sx={{ marginBottom: 2 }}>
          <Box  className='slider-heading' sx={{ display: 'flex', alignItems: 'center', borderLeft: `6px solid ${label_colors[label]}`, paddingLeft: 2, borderRadius: 1 }}>
          
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
                step={0.01}
                min={0}
                max={1}
                valueLabelDisplay="auto"
                disabled={!checkboxes[label]} // disable when checkbox is off
              />
            </Box>
            <TextField 
              value={sliderValues[label]}
              variant="outlined" 
              size="small"
              sx={{ width: 50 }}
              disabled={!checkboxes[label]} // disable when checkbox is off
            />
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default AccessScoreAnalysisContent;
