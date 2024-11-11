// LayerControl.jsx

import React, { useState, useEffect, useRef } from 'react';
import { Plus, ChartPolar, Eye, EyeSlash,Faders,Funnel } from "@phosphor-icons/react";
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Tooltip from '@mui/material/Tooltip';


const LayerControl = ({ layer, mapInstance, isVisible, toggleVisibility, handleAccessShedChange }) => {
  // const mapInstance = useRef(null);
  const [map, setMap] = useState(null);
  const [severityRange, setSeverityRange] = useState([0, 5]); 
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [addAccessShed, setAddAccessShed] = useState(false);
  const [accessShedRange, setAccessShedRange] = useState(0);
  const [showFilterBar, setShowFilterBar] = useState(false);
  const [filterProperties, setFilterProperties] = useState([]);
  const [filterInput, setFilterInput] = useState('');

  const [wheelchairAccessible, setWheelchairAccessible] = useState(false);
  const [isLayerVisible, setIsLayerVisible] = useState(isVisible);
  // const minDate = '2019-01-01T00:00:00.000000';
  // const maxDate = '2023-12-31T23:59:59.999999';
  // const [labelDateRange, setLabelDateRange] = useState([minDate, maxDate]); // Set initial range values for minDate and maxDate


  const applySeverityFilter = (severityRange, layerId) => {
    if (map) {
      map.setFilter(layerId, ['all', ['>=', 'severity', severityRange[0]], ['<=', 'severity', severityRange[1]]]);
    }
  };

  // const applyLabelDateFilter = (dateRange) => {
  //   if (map) {
  //     map.setFilter('no-curb-ramp', ['all', ['>=', 'avg_label_date', dateRange[0]], ['<=', 'avg_label_date', dateRange[1]]]);
  //   }
  // };

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
  
  useEffect(() => {
    if (map && layer.id === 'sidewalk-no-curb' && filterInput === 'severity') {
      map.setFilter('sidewalk-no-curb', ['all', ['>=', 'severity', severityRange[1]], ['<=', 'severity', severityRange[5]]]);
    }
    if (map && layer.id === 'sidewalk-curb' && filterInput === 'severity') {
      map.setFilter('sidewalk-curb', ['all', ['>=', 'severity', severityRange[1]], ['<=', 'severity', severityRange[5]]]);
    }
    if (map && layer.id === 'sidewalk-no-sidewalk' && filterInput === 'severity') {
      map.setFilter('sidewalk-no-sidewalk', ['all', ['>=', 'severity', severityRange[1]], ['<=', 'severity', severityRange[5]]]);
    }
    if (map && layer.id === 'sidewalk-obstacle' && filterInput === 'severity') {
      map.setFilter('sidewalk-obstacle', ['all', ['>=', 'severity', severityRange[1]], ['<=', 'severity', severityRange[5]]]);
    }
    if (map && layer.id === 'sidewalk-surface' && filterInput === 'severity') {
      map.setFilter('sidewalk-surface', ['all', ['>=', 'severity', severityRange[1]], ['<=', 'severity', severityRange[5]]]);
    }
  }, [map, severityRange, layer.id, filterInput]);

  // Wheelchair check box 
  useEffect(() => {
    if (map && ['pharmacies', 'hospitals', 'churches', 'libraries', 'grocery', 'schools'].includes(layer.id) && filterInput === 'wheelchair') {
      if (wheelchairAccessible) {
        map.setFilter(layer.id, ['all', ['==', 'wheelchair', 'yes']]);
        map.setFilter('access-shed-layer-' + layer.id, ['==', 'wheelchair', 'yes']);
      } else {
        map.setFilter(layer.id, ['all']);
        map.setFilter('access-shed-layer-' + layer.id, ['none']);
      }
    }
  }, [map, wheelchairAccessible, layer.id, filterInput]);

  // Label date filter
  // useEffect(() => {
  //   if (map && layer.id === 'sidewalk-no-curb' && filterInput === 'avg_label_date') {
  //     map.setFilter('sidewalk-no-curb', ['all', ['>=', 'avg_label_date', labelDateRange[0]], ['<=', 'avg_label_date', labelDateRange[1]]]);
  //   }
  // }, [map, labelDateRange, layer.id, filterInput]);
  

  const layerProperties = {
    'sidewalk-no-curb': ['severity'],
    'sidewalk-curb': ['severity'],
    'sidewalk-no-sidewalk': ['severity'],
    'sidewalk-obstacle': ['severity'],
    'sidewalk-surface': ['severity'],
    'pharmacies': ['wheelchair'],
    'hospitals': ['wheelchair'],
    'churches': ['wheelchair'],
    'libraries': ['wheelchair'],
    'grocery': ['wheelchair'],
    'schools': ['wheelchair'],
    // Add other layers here if needed.
  };

  const fetchDataProperties = async (url, layerId) => {
      const response = await fetch(url);
      const data = await response.json();
      const properties = data.features?.[0]?.properties;
      
      // Check if layerId exists in layerProperties
      if (properties && layerProperties[layerId]) {
        const selectedProperties = Object.keys(properties).filter(key => layerProperties[layerId].includes(key));
        setFilterProperties(selectedProperties);
      }
  };
  
  
  useEffect(() => {
    if (layer.id === 'sidewalk-no-curb') {
      console.log(layer.id);
      fetchDataProperties('https://raw.githubusercontent.com/crescendochu/data-visualization/main/data/Seattle_labels_withZoominLevel/filtered_NoCurbs_withTimestamp_zoomin_0.geojson', layer.id);
    } else if (layer.id === 'sidewalk-curb') {
      console.log(layer.id);
      fetchDataProperties('https://raw.githubusercontent.com/crescendochu/data-visualization/main/data/Seattle_labels_withZoominLevel/filtered_Curbramps_withTimestamp_zoomin_0.geojson', layer.id);
    } else if (layer.id === 'sidewalk-no-sidewalk') {
      console.log(layer.id);
      fetchDataProperties('https://raw.githubusercontent.com/crescendochu/data-visualization/main/data/Seattle_labels_withZoominLevel/filtered_NoSidewalk_withTimestamp_zoomin_0.geojson', layer.id);
    } else if (layer.id === 'sidewalk-obstacle') {
      console.log(layer.id);
      fetchDataProperties('https://raw.githubusercontent.com/crescendochu/data-visualization/main/data/Seattle_labels_withZoominLevel/filtered_Obstacle_withTimestamp_zoomin_0.geojson', layer.id);
    } else if (layer.id === 'sidewalk-surface') {
      console.log(layer.id);
      fetchDataProperties('https://raw.githubusercontent.com/crescendochu/data-visualization/main/data/Seattle_labels_withZoominLevel/filtered_SurfaceProblem_withTimestamp_zoomin_0.geojson', layer.id);
    } else {
      console.log(layer.id, "is not one of five label types");
      fetchDataProperties(`https://raw.githubusercontent.com/crescendochu/data-visualization/main/data/Seattle_GeoData_Points/Seattle_${layer.id}_centroids.geojson`, layer.id);
    }
  }, [layer.id]);

  const handleToggleVisibility = () => {
    toggleVisibility(layer.id);
    setIsLayerVisible(!isLayerVisible);
  };
  const handleSettingsClick = () => setSettingsOpen(!settingsOpen);
  const handleAddAccessShed = () => setAddAccessShed(true);

  const handleAccessShedSliderChange = (event, newValue) => {
    setAccessShedRange(newValue);
    handleAccessShedChange(layer.id, newValue);
  };

  const handleAddFilter = () => setShowFilterBar(true);

  const handleFilterChange = (event, newValue) => setFilterInput(newValue);

  const handleSeverityFilterChange = (event, newValue) => {
    console.log('Severity filter changed with new value: ', newValue);
    setSeverityRange(newValue);
    applySeverityFilter(newValue,layer.id);  // Apply the filter whenever the slider changes
  };

  const handleWheelchairFilterChange = (event) => {
    console.log('Wheelchair filter changed with new value: ', event.target.checked);
    setWheelchairAccessible(event.target.checked);
  }; 

  // const handleLabelDateFilterChange = (event, newValue) => {
  //   console.log('Label date filter changed with new value: ', newValue);
  //   setLabelDateRange(newValue);
  //   applyLabelDateFilter(newValue); // Apply the filter whenever the slider changes
  // };
  
  
  return (
    <div className="map-layers" style={{ height: settingsOpen ? 'fit-content' : 'auto' }}>
      <div className="draggable-layer">
        <div className="layer-name-container">
          <div
            className="color-strip"
            style={{ backgroundColor: layer.color || "transparent" }}
          />
          <span>{layer.title}</span>
        </div>
        <div className="icon-container">
          {isLayerVisible ? ( // If the layer is visible, show the Eye icon
            <Eye weight="bold" onClick={handleToggleVisibility} /> // isLayerVisible check is triggered when handleToggleVisibility is called
          ) : (
            <EyeSlash weight="bold" onClick={handleToggleVisibility} />
          )}
          <Faders weight="bold" onClick={handleSettingsClick} />
        </div>
      </div>
      {settingsOpen && (
        <div className="settings-container">
          <div className="settings-buttons">
          <Button onClick={handleAddFilter}>  <Plus size={22} weight="bold" />  Filter</Button>
          {!layer.id.startsWith('sidewalk-') && (
          <Tooltip title="Access sheds highlights sidewalk problems within a defined range of a certain location" placement="right">
            <Button onClick={handleAddAccessShed}> 
              <Plus size={22} weight="bold" /> Access Shed
            </Button>
          </Tooltip>
          )}
          </div>
          {addAccessShed && (
            <div className="slider-with-icon">
              <ChartPolar size={32} weight="bold" className='icon'/>
              <div className="slider">
            <Slider
              value={accessShedRange}
              onChange={handleAccessShedSliderChange}
              min={0}
              max={2000}
              step={100}
              marks={[
                {value: 0, label: '0'},
                {value: 500, label: '500m'},
                {value: 1000, label: '1000m'},
                {value: 1500, label: '1500m'},
                {value: 2000, label: '2000m'},
              ]}
            />
            </div>
            </div>
          )}
          {showFilterBar && (
            <div className="filter-and-slider">
              <div className="filter-bar">
                <Funnel size={32} weight="bold" className='icon'/>
                <div className="filter-input">
                  <Autocomplete
                    options={filterProperties}
                    value={filterInput}
                    onChange={handleFilterChange}
                    renderInput={(params) => <TextField {...params} label="Filter" variant="outlined" />}
                  />
                </div>
              </div>
              {filterInput === 'severity' && (
                <div className="slider">
                  <Slider
                    value={severityRange}
                    onChange={handleSeverityFilterChange}
                    valueLabelDisplay="auto"
                    min={0}
                    max={5}
                    step={1}
                    marks={[
                      { value: 0, label: '0' },
                      { value: 1, label: '1' },
                      { value: 2, label: '2' },
                      { value: 3, label: '3' },
                      { value: 4, label: '4' },
                      { value: 5, label: '5' },
                    ]}
                  />
                </div>
              )}
              {filterInput === 'wheelchair' && (
                <div className="checkbox">
                  <Checkbox
                    checked={wheelchairAccessible}
                    onChange={handleWheelchairFilterChange}
                  />
                  Wheelchair Accessible
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LayerControl;
