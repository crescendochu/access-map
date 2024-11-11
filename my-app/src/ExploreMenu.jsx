import React from 'react';
import LayerControl from './LayerControl';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const ExploreMenu = ({ cityDataLayers, sidewalkFeaturesLayers, mapInstance, toggleVisibility, handleAccessShedChange, handleSeverityRangeChange }) => {
  return (
    <div id="explore-menu" className="layer-menu">
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="sidewalk-features-content"
          id="sidewalk-features-header"
        >
          <h3>Sidewalk Features</h3>
        </AccordionSummary>
        <AccordionDetails>
          {sidewalkFeaturesLayers.map((layer) => (
            <LayerControl
              key={layer.id}
              layer={layer}
              mapInstance={mapInstance} // pass map here
              isVisible={layer.visibility}
              toggleVisibility={toggleVisibility}
              handleAccessShedChange={handleAccessShedChange}
              handleSeverityRangeChange={handleSeverityRangeChange}
            />
          ))}
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="city-data-content"
          id="city-data-header"
        >
          <h3>City Data</h3>
        </AccordionSummary>
        <AccordionDetails>
          {cityDataLayers.map((layer) => (
            <LayerControl
              key={layer.id}
              layer={layer}
              mapInstance={mapInstance}  // pass map here
              isVisible={layer.visibility}
              toggleVisibility={toggleVisibility}
              handleAccessShedChange={handleAccessShedChange}
              handleSeverityRangeChange={handleSeverityRangeChange}
            />
          ))}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default ExploreMenu;
