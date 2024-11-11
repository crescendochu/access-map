// PlotMap.jsx
import React, { useRef, useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import useMapbox from './useMapbox';
// import LayerControl from './LayerControl';
import {updateNoCurbrampsLayer, noCurbrampsLayers, 
        updateCurbrampsLayer, curbrampsLayers, 
        updateNoSidewalkLayer, noSidewalkLayers, 
        updateObstacleLayer, obstacleLayers, 
        updateSurfaceProblemLayer, surfaceProblemLayers} from './SidewalkData';
import { cityPointLayers, addCityPointLayers } from './CityData';

const PlotMap = () => {
  const mapContainer = useRef(null);
  const [layers, setLayers] = useState([]);
  const map = useMapbox(mapContainer);
  const [accessShedRange, setAccessShedRange] = useState(0);
  const [severityRange, setSeverityRange] = useState([1, 5]);

  useEffect(() => {
    if (map) {

      map.on('zoomend', () => {
        updateCurbrampsLayer(map);
        updateNoCurbrampsLayer(map);
        updateNoSidewalkLayer(map);
        updateObstacleLayer(map);
        updateSurfaceProblemLayer(map);
      });
      
      updateNoCurbrampsLayer(map);
      updateCurbrampsLayer(map);
      updateNoSidewalkLayer(map);
      updateObstacleLayer(map);
      updateSurfaceProblemLayer(map);

      addCityPointLayers(map);
      setLayers([ ...curbrampsLayers, ...noCurbrampsLayers, ...obstacleLayers, ...surfaceProblemLayers, ...noSidewalkLayers, 
        ...cityPointLayers
      ]);
      // MapAccessScore(map);
      // MapPopulationDensity(map);
    }
  }, [map]);

  
  const translateToPixels = (distanceInMeters) => {
    const center = map.getCenter();
    const zoom = map.getZoom();
    const metersPerPixel = (156543.03392 * Math.cos((center.lat * Math.PI) / 180)) / Math.pow(2, zoom);

    const distanceInPixels = distanceInMeters / metersPerPixel;
    return distanceInPixels;
  };


  // const defaultAccessShedRadius = 500; // Define a default radius for the access shed layer

  const handleIconClick = (id) => {
    const visibility = map.getLayoutProperty(id, 'visibility');
    console.log("Old visibility for", id, ":", visibility);
    const newVisibility = visibility === 'none' ? 'visible' : 'none';
    
    map.setLayoutProperty(id, 'visibility', newVisibility);

    const shedLayerId = 'access-shed-layer-' + id;

    if (map.getLayer(shedLayerId)) {
      map.setLayoutProperty(shedLayerId, 'visibility', newVisibility);
    }

    setLayers(layers => layers.map(layer => {
      if (layer.id === id) {
        return { ...layer, visibility: newVisibility === 'visible' };
      }
      return layer;
    }));
  };

  const handleAccessShedChange = (layerId, newValue) => {
    console.log("New slider radius:", newValue);
    setAccessShedRange(newValue);
    const layer = layers.find(l => l.id === layerId);

    const visibility = map.getLayoutProperty(layerId, 'visibility');
    console.log("Old AccessShed Visibility:", visibility);
    const newVisibility = visibility === 'none' ? 'none' : 'visible';
    console.log("New AccessShed Visibility:", newVisibility);
    
    const accessShedLayerId = 'access-shed-layer-' + layerId;

    // map.setLayoutProperty(accessShedLayerId, 'visibility', newVisibility);

    // Check if the access shed layer already exists
    if (map.getLayer(accessShedLayerId)) {
      // map.removeLayer('access-shed-layer-' + layerId);
      map.setPaintProperty(accessShedLayerId, 'circle-radius', translateToPixels(newValue));
      // return; commented out to allow for slider to change radius 
    }

    // if (map.getSource(layerId)) {
    //   map.removeSource(layerId);
    // }

    // add a new access shed layer
    map.addLayer({
      id: accessShedLayerId, // appends the layerId to the string 'access-shed-layer-'
      type: 'circle',
      source: layerId, // use the same source as the original layer
      paint: {
        'circle-radius': translateToPixels(newValue), // use the new value from the slider
        'circle-color': layer.color, // use the same color as the original layer
        'circle-opacity': 0.2,
      },
      layout: {
        visibility: newVisibility
      }
    });

    map.on('zoomend', () => {
      const zoomLevel = map.getZoom();
      // console.log("New circle radius:", newValue);
      map.setPaintProperty(accessShedLayerId, 'circle-radius', translateToPixels(newValue, zoomLevel));
    });
  };

  return (
    <div className="map-container">
      <Sidebar 
        layers={layers}
        setLayers={setLayers} 
        mapInstance={map} 
        toggleVisibility={handleIconClick}
        handleAccessShedChange={handleAccessShedChange}
        // handleSeverityRangeChange={handleSeverityRangeChange}
      />
      <div ref={mapContainer}></div>
    </div>
  );
};

export default PlotMap;

