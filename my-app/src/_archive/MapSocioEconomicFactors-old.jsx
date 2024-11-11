// MapSocioEconomicFactors.jsx

export const blockGroupAccessScoreGeoJsonUrl = 'https://raw.githubusercontent.com/crescendochu/access-score/main/seattle/json-for-publishing/access-score/access-score-per-blockgroup.geojson';

export const MapPopulationDensity= (map) => {
  // Add a new polygon layer for the access score
  if (map) {
    map.addSource('population-density', {
      type: 'geojson',
      data: blockGroupAccessScoreGeoJsonUrl
    });

    map.addLayer({
      id: 'population-density',
      type: 'fill',
      source: 'population-density',
      layout: {},
      paint: {
        'fill-color': [
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
        ],
        'fill-opacity': .5
      }
    });

    console.log('Population Density map added');

    // Adding legend
    const items = [
      { color: '#b0f2bc', value: '5416.37' },
      { color: '#89e8ac', value: '7659.98' },
      { color: '#67dba5', value: '9605.29' },
      { color: '#4cc8a3', value: '11027.85' },
      { color: '#38b2a3', value: '13136.9' },
      { color: '#2c98a0', value: '16722.01' },
      { color: '#257d98', value: '25974.15' },
    ];

    const legend = document.createElement('div');
    legend.id = 'legend';
    items.forEach((item) => {
      const key = document.createElement('span');
      key.className = 'legend-key';
      key.style.backgroundColor = item.color;

      const value = document.createElement('span');
      value.innerHTML = item.value;
      
      legend.appendChild(key);
      legend.appendChild(value);
    });

    map.getCanvas().parentNode.appendChild(legend);

  } else {
    console.log('Map is not ready');
  }
};
