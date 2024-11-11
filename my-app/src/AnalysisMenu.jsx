// AnalysisMenu.jsx
import React, { useState, useEffect } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccessScoreAnalysisContent from './AccessScoreAnalysisContent';
import ADAContent from './ADAContent';
import CorrelationAnalysisContent from './CorrelationAnalysisContent';

const AnalysisMenu = ({ sidewalkFeaturesLayers, layers, mapInstance}) => {

  const [map, setMap] = useState(null);
  const [expandedPanel, setExpandedPanel] = useState(null); 

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


  const handleReset = () => {
    const analysisLayers = ['sidewalk-access-score', 'blockgroup-access-score', 'analysis-population-density','analysis-income-per-capita','analysis-rent','analysis-walk','ada-prioritization'];
    const sidewalkFeaturesLayers =['sidewalk-no-curb','sidewalk-curb','sidewalk-no-sidewalk','sidewalk-obstacle','sidewalk-surface']

    analysisLayers.forEach(layerId => {
      const layer = mapInstance.getLayer(layerId);

      if (layer) {
        mapInstance.removeLayer(layerId);
        mapInstance.removeSource(layerId);
      }
    });



    sidewalkFeaturesLayers.forEach(layerId => {
      const layer = mapInstance.getLayer(layerId);
      if (layer) {
        mapInstance.setLayoutProperty(layerId, 'visibility', 'none');
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
    console.log("reset");
  };

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpandedPanel(isExpanded ? panel : false);
    if (isExpanded) {
      handleReset();
    }
  };


  return (
    <div id="analysis-menu" className="layer-menu">
      <Accordion expanded={expandedPanel === 'panel1'} onChange={handleAccordionChange('panel1')}>
      <AccordionSummary expandIcon={<ExpandMoreIcon onClick={handleReset} />} aria-controls="access-score-content" id="access-score-header">
          <h3>Access Score Analysis</h3>
        </AccordionSummary>
        <AccordionDetails>
        <AccessScoreAnalysisContent 
          sidewalkFeaturesLayers={sidewalkFeaturesLayers}
          layers={layers}
          mapInstance={mapInstance}
        />
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expandedPanel === 'panel2'} onChange={handleAccordionChange('panel2')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon onClick={handleReset} />} aria-controls="ada-transition-content" id="ada-transition-header">
          <h3>ADA Transition Prioritization</h3>
        </AccordionSummary>
        <AccordionDetails>
        <ADAContent 
          layers={layers}
          mapInstance={mapInstance}
        />
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expandedPanel === 'panel3'} onChange={handleAccordionChange('panel3')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon onClick={handleReset} />} aria-controls="correlation-content" id="correlation-header">
          <h3>Correlation Analysis</h3>
        </AccordionSummary>
        <AccordionDetails>
        <CorrelationAnalysisContent 
          layers={layers}
          mapInstance={mapInstance}
        />
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default AnalysisMenu;
