
// MapLayer.jsx

export const addPolygonLayer = (map, source, id, colorStops) => {
    map.addSource(id, {
      type: 'geojson',
      data: source
    });
  
    map.addLayer({
      id: id,
      type: 'fill',
      source: id,
      layout: {},
      paint: {
        'fill-color': colorStops,
        'fill-opacity': .5
      }
    });
  
    console.log(`${id} map added`);
  };


  export const addPointLayer = (map, source, id, color, radius) => {
    map.addSource(id, {
      type: 'geojson',
      data: source
    });
  
    map.addLayer({
      id: id,
      type: 'circle',
      source: id,
      paint: {
        'circle-color': color,
        'circle-radius': radius,
        'circle-opacity': 0.8
      }
    });
  
    console.log(`${id} points added`);
  };