// MapSocioEconomicFactors.jsx

import { createPolygonMap } from './MapCreator.jsx';
import { attachTooltip } from './ToolTip.js';

export const blockGroupAccessScoreGeoJsonUrl = 'https://raw.githubusercontent.com/crescendochu/access-score/main/seattle/json-for-publishing/access-score/access-score-per-blockgroup.geojson';

export const MapPopulationDensity = (map) => {
  const colorStops = [
    'interpolate',
    ['linear'],
    ['get', 'Population Density'],
    5416.37, '#b0f2bc',
    7659.98, '#89e8ac',
    9605.29, '#67dba5',
    11027.85, '#4cc8a3',
    13136.9, '#38b2a3',
    16722.01, '#2c98a0',
    25974.15, '#257d98'
  ];

  const legendColors = [
    { color: '#b0f2bc' },
    { color: '#89e8ac' },
    { color: '#67dba5' },
    { color: '#4cc8a3' },
    { color: '#38b2a3' },
    { color: '#2c98a0' },
    { color: '#257d98' },
  ];

  const minValue = 5416.37;
  const maxValue = 25974.15;

  const title = 'Population Density';

  const tooltipFormatFunction = (feature) => {
    const ppl = feature.properties['Population Density'];
    const roundedPpl = parseFloat(ppl).toFixed(0);
    return `Population Density: ${roundedPpl} </p>`;
  };

  // Attach the tooltip to the layer
  attachTooltip(map, 'analysis-population-density', tooltipFormatFunction);

  createPolygonMap(map, blockGroupAccessScoreGeoJsonUrl, 'analysis-population-density', colorStops, legendColors, minValue, maxValue, title);
};


export const MapIncomePerCapita = (map) => {
  const colorStops = [
    'interpolate',
    ['linear'],
    ['get', 'Income Per Capita'],
    33676, '#b0f2bc',
    44645, '#89e8ac',
    53128.25, '#67dba5',
    60193, '#4cc8a3',
    66504, '#38b2a3',
    75218,  '#2c98a0',
    87871, '#257d98'
  ];

  const legendColors = [
    { color: '#b0f2bc' },
    { color: '#89e8ac' },
    { color: '#67dba5' },
    { color: '#4cc8a3' },
    { color: '#38b2a3' },
    { color: '#2c98a0' },
    { color: '#257d98' },
  ];

  const minValue = 33676;
  const maxValue = 87871;

  const title = 'Income Per Capita';

  const tooltipFormatFunction = (feature) => {
    const income = feature.properties['Income Per Capita'];
    const roundedIncome = parseFloat(income).toFixed(0);
    return `Income Per Capita: ${roundedIncome} </p>`;
  };

  // Attach the tooltip to the layer
  attachTooltip(map, 'analysis-income-per-capita', tooltipFormatFunction);

  createPolygonMap(map, blockGroupAccessScoreGeoJsonUrl, 'analysis-income-per-capita', colorStops, legendColors, minValue, maxValue, title);
};


export const MapRent = (map) => {
  const colorStops = [
    'interpolate',
    ['linear'],
    ['get', 'Median Gross Rent'],
    0, '#44515C',
    1249.38, '#b0f2bc',
    1438.25, '#89e8ac',
    1568.12, '#67dba5',
    1677, '#4cc8a3',
    1761.25, '#38b2a3',
    1867.75,  '#2c98a0',
    2193.38, '#257d98'
  ];

  const legendColors = [
    { color: '#b0f2bc' },
    { color: '#89e8ac' },
    { color: '#67dba5' },
    { color: '#4cc8a3' },
    { color: '#38b2a3' },
    { color: '#2c98a0' },
    { color: '#257d98' },
  ];

  const minValue = 1249.38;
  const maxValue = 2193.38;

  const title = 'Income Per Capita';

  const tooltipFormatFunction = (feature) => {
    const rent = feature.properties['Median Gross Rent'];
    const roundedRent = parseFloat(rent).toFixed(0);
    return `Median Gross Rent: ${roundedRent} </p>`;
  };

  // Attach the tooltip to the layer
  attachTooltip(map, 'analysis-rent', tooltipFormatFunction);

  createPolygonMap(map, blockGroupAccessScoreGeoJsonUrl, 'analysis-rent', colorStops, legendColors, minValue, maxValue, title);
};

export const MapWalk = (map) => {
  const colorStops = [
    'interpolate',
    ['linear'],
    ['get', 'Walked%'],
      0, '#b0f2bc',
      0.01, '#89e8ac',
      0.02, '#67dba5',
      0.04, '#4cc8a3',
      0.07, '#38b2a3',
      0.11, '#2c98a0',
      0.29, '#257d98'
  ];

  const legendColors = [
    { color: '#b0f2bc' },
    { color: '#89e8ac' },
    { color: '#67dba5' },
    { color: '#4cc8a3' },
    { color: '#38b2a3' },
    { color: '#2c98a0' },
    { color: '#257d98' },
  ];

  const minValue = 0;
  const maxValue = 1;

  const title = 'Percentage of People Who Walk To Work';

  const tooltipFormatFunction = (feature) => {
    const walked = feature.properties['Walked%'] * 100;
    const roundedWalked = parseFloat(walked).toFixed(2);
    return `People Who Walk To Work: ${roundedWalked} %</p>`;
  };

  // Attach the tooltip to the layer
  attachTooltip(map, 'analysis-walk', tooltipFormatFunction);

  createPolygonMap(map, blockGroupAccessScoreGeoJsonUrl, 'analysis-walk', colorStops, legendColors, minValue, maxValue, title);
};

