import React, { useState } from 'react';
import ExploreMenu from './ExploreMenu';
import AnalysisMenu from './AnalysisMenu';
import { MagnifyingGlass, MagicWand } from "@phosphor-icons/react";
import LayerControl from './LayerControl';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import logoImage from './img/projectSidewalkLogo.png'

const Sidebar = ({ layers, setLayers, mapInstance, toggleVisibility, handleAccessShedChange, handleSeverityRangeChange}) => {

  // sidewalk features are the layers that start with 'sidewalk-'
  const sidewalkFeaturesLayers = layers.filter(layer => layer.id.startsWith('sidewalk-'));
// cityDataLayers are the layers that do not start with 'sidewalk-'
  const cityDataLayers = layers.filter(layer => !layer.id.startsWith('sidewalk-'));
  
  const [selectedButton, setSelectedButton] = useState('explore');
  const [sidewalkFeaturesVisibility, setSidewalkFeaturesVisibility] = useState('visible');

  const handleVisibility_none = () => {
    const layersToHide = ['sidewalk-no-curb', 'sidewalk-curb', 'sidewalk-no-sidewalk', 'sidewalk-obstacle', 'sidewalk-surface'];
    const cityLayersToHide = ['hospitals', 'libraries', 'grocery', 'schools'];

    layersToHide.forEach(layerId => {
      const layer = mapInstance.getLayer(layerId);

      if (layer) {
        mapInstance.setLayoutProperty(layerId, 'visibility', 'none');
        console.log(layerId, "hide");
      }
    });

    cityLayersToHide.forEach(layerId => {
      const layer = mapInstance.getLayer(layerId);
      const shedLayerId = 'access-shed-layer-' + layerId;
      const shedLayer = mapInstance.getLayer(shedLayerId);

      if (layer) {
        mapInstance.setLayoutProperty(layerId, 'visibility', 'none');
        console.log(layerId, "hide");
      }
      if (shedLayer) {
        // mapInstance.setLayoutProperty(shedLayerId, 'visibility', 'none');
        mapInstance.removeLayer(shedLayerId);
        console.log(shedLayerId, "hide");
      }
    });
  };

  const handleVisibility_visible = () => {
    const layersToVis = ['sidewalk-no-curb', 'sidewalk-curb', 'sidewalk-no-sidewalk', 'sidewalk-obstacle', 'sidewalk-surface'];
    const cityLayersToHide = ['hospitals', 'libraries', 'grocery', 'schools'];

    layersToVis.forEach(layerId => {
      const layer = mapInstance.getLayer(layerId);
      // const shedLayerId = 'access-shed-layer-' + layerId;
      // const shedLayer = mapInstance.getLayer(shedLayerId);

      if (layer) {
        // mapInstance.setLayoutProperty(layerId, 'visibility', 'visible');
        toggleVisibility(layerId); // Set visibility back to 'visible' and reset eye icon
        console.log(layerId, "visible");
      }

    });

    cityLayersToHide.forEach(layerId => {
      const layer = mapInstance.getLayer(layerId);

      if (layer) {
        mapInstance.setLayoutProperty(layerId, 'visibility', 'visible');
        toggleVisibility(layerId); // Keep visibility as 'none' and reset eye icon
        console.log(layerId, "hide");
      }
    });
  };

  const hideAnalysisLayers = () => {
    const analysisLayers = ['sidewalk-access-score', 'blockgroup-access-score', 'analysis-population-density','analysis-income-per-capita','analysis-walk','analysis-rent','ada-prioritization'];
    // const analysisLayers = layers.filter(layer => layer.id.startsWith('analysis-')); <----- this does not work I don't know why
    console.log('lala' + analysisLayers)
    analysisLayers.forEach(layerId => {
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

    const pointLegend = document.getElementById('point-legend');
    if (pointLegend) {
      pointLegend.remove();
    }

  };
  

  return (
    <div id="menu" className="sidebar">
      <div className="title-container">
        <div className="logo">
        <img src={logoImage} alt="My image" />
        </div>
        <h1>Which Curbs to Fix?</h1>
       </div>
       <div className="sidebar-bottom">
       <div className="sideTabContainer">
        <button 
          className={`sidebarButton ${selectedButton === 'explore' ? 'selected' : ''}`}
          onClick={() => {
            setSelectedButton('explore')
            handleVisibility_visible();
            hideAnalysisLayers();
          }}
        >
          <MagnifyingGlass size={28} weight="bold" />
          EXPLORE
        </button>
        <button 
          className={`sidebarButton ${selectedButton === 'analysis' ? 'selected' : ''}`}
          onClick={() => {
            setSelectedButton('analysis');
            handleVisibility_none();
          }}          
        >
          <MagicWand size={28} weight="bold" />
          ANALYSIS
        </button>
      </div>

      {selectedButton === 'explore' && 
        <ExploreMenu 
          cityDataLayers={cityDataLayers}
          sidewalkFeaturesLayers={sidewalkFeaturesLayers}
          mapInstance={mapInstance}
          toggleVisibility={toggleVisibility}
          handleAccessShedChange={handleAccessShedChange}
          handleSeverityRangeChange={handleSeverityRangeChange}
        />
      }

      {selectedButton === 'analysis' && 
        <AnalysisMenu 
          sidewalkFeaturesLayers={sidewalkFeaturesLayers}
          layers={layers}
          mapInstance={mapInstance}
        />
      }
    </div>
    </div>
  );
};

export default Sidebar;