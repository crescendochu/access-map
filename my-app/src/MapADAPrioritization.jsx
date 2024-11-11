// MapADAPrioritization.jsx

import { createPointMap } from "./MapCreator";

export const adaGeoJsonUrl = 'https://raw.githubusercontent.com/crescendochu/data-visualization/main/data/Seattle_labels_withZoominLevel/filtered_NoCurbs_withTimestamp_zoomin_0.geojson';

export const MapADAPrioritization = (map) => {
    const colorStops = [
        'interpolate',
        ['linear'],
        ['get', 'severity'],
        1, '#fef6b5',
        2, '#ffc285',
        3, '#fa8a76',
        4, '#f16d7a',
        5, '#e15383'
      ];

      const legendValues = [
        { value: 1, color: '#e15383' },
        { value: 2, color: '#f16d7a' },
        { value: 3, color: '#fa8a76' },
        { value: 4, color: '#ffc285' },
        { value: 5, color: '#fef6b5' },
       
      ];

      const title = 'Prioritization';

      createPointMap(map, adaGeoJsonUrl, 'ada-prioritization', colorStops,legendValues, 4, title);
};