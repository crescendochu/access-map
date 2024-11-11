// MapCreator.jsx

import { createGradientLegend, createPointLegend } from './Legends.jsx';
import { addPolygonLayer, addPointLayer } from './MapLayer.jsx';

export const createPolygonMap = (map, source, id, colorStops, legendColors, min, max,title) => {
  if (map) {
    addPolygonLayer(map, source, id, colorStops);
    createGradientLegend(map, legendColors, min, max, title);
  } else {
    console.log('Map is not ready');
  }
};

export const createPointMap = (map, source, id, colorStops, legendColors, radius, title) => {
  if (map) {
    addPointLayer(map, source, id, colorStops, radius);
    createPointLegend(map, legendColors, title);
  } else {
    console.log('Map is not ready');
  }
}



