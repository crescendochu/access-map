// ADAContent.jsx
import React, { useState } from 'react';
import Slider from '@mui/material/Slider';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import { MapADAPrioritization} from './MapADAPrioritization';

const ADAContent = ({layers,mapInstance}) => {
  const [factors, setFactors] = useState([
    {
      name: '',
      value: 1
    }
  ]);

  const handleADA = () => {
    console.log('Enter ADA')
    MapADAPrioritization(mapInstance);
    // MapBlockGroupAccessScore(mapInstance);
};


  const handleNameChange = (index) => (event) => {
    const newFactors = [...factors];
    newFactors[index].name = event.target.value;
    setFactors(newFactors);
  };

  const handleValueChange = (index) => (event, newValue) => {
    const newFactors = [...factors];
    newFactors[index].value = newValue;
    setFactors(newFactors);
  };

  const deleteFactor = (index) => () => {
    const newFactors = [...factors];
    newFactors.splice(index, 1);
    setFactors(newFactors);
  };

  const addFactor = () => {
    setFactors([...factors, { name: '', value: 1 }]);
  };

  const selectedFactorNames = factors.map(factor => factor.name);

  return (
    <Box sx={{ width: '100%' }}>
      {factors.map((factor, index) => (
        <Box key={index} sx={{ marginBottom: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <FormControl fullWidth>
              <InputLabel id={`factor-${index}-label`}>Select factor</InputLabel>
              <Select
                labelId={`factor-${index}-label`}
                id={`factor-${index}-select`}
                value={factor.name}
                onChange={handleNameChange(index)}
              >
                <MenuItem value=""><em>None</em></MenuItem>
                <MenuItem value={'Factor 1'} disabled={selectedFactorNames.includes('Factor 1')}>Population</MenuItem>
                <MenuItem value={'Factor 2'} disabled={selectedFactorNames.includes('Factor 2')}>Transit</MenuItem>
                <MenuItem value={'Factor 3'} disabled={selectedFactorNames.includes('Factor 3')}>Public Facilities</MenuItem>
                <MenuItem value={'Factor 4'} disabled={selectedFactorNames.includes('Factor 4')}>Low Income</MenuItem>
                <MenuItem value={'Factor 5'} disabled={selectedFactorNames.includes('Factor 5')}>Percentage of People with Disabilities</MenuItem>
              </Select>
            </FormControl>
            {factors.length > 1 && (
              <IconButton onClick={deleteFactor(index)} size="small">
                <CloseIcon />
              </IconButton>
            )}
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 1 }}>
            <Box sx={{ flex: '1 1 auto', marginRight: 2 }}>
              <Slider 
                value={factor.value}
                onChange={handleValueChange(index)}
                step={0.01}
                min={0}
                max={1}
                valueLabelDisplay="auto"
              />
            </Box>
            <TextField 
              value={factor.value}
              variant="outlined" 
              size="small"
              sx={{ width: 50 }}
            />
          </Box>
        </Box>
         ))}
         <Button variant="contained" color="primary" onClick={addFactor}>
           Add factor
         </Button>
         <Box sx={{ marginTop: 2 }}>
         <Button color="primary" onClick={handleADA}>
         Start Prioritization Analysis
      </Button>
       </Box>
       </Box>
     );
   };
   
   export default ADAContent;
