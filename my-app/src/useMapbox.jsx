import { useEffect, useState } from 'react';
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import mapboxgl from '!mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// The following is required to stop "npm build" from transpiling mapbox code.
// notice the exclamation point in the import.
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax, import/no-unresolved
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

const useMapbox = (mapContainer) => {
  const [map, setMap] = useState(null);

  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1IjoiY3Jlc2NlbmRvY2h1IiwiYSI6ImNpdGR5MWZ5aDAycjIyc3A5ZHoxZzRwMGsifQ.nEaSxm520v7TpKAy2GG_kA';

    const initializeMap = ({ setMap, mapContainer }) => {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/crescendochu/clhdvk3i400ea01rhep06ap9r',
        zoom: 11,
        center: [-122.33138275146484, 47.609596252441406]
      });

      map.addControl(new mapboxgl.ScaleControl(), 'bottom-right');
      map.addControl(new mapboxgl.NavigationControl(), 'top-right'); 

      map.on('load', () => {
        setMap(map);
      });
    };

    if (!map) initializeMap({ setMap, mapContainer });
  }, [map]);

  return map;
};

export default useMapbox;

