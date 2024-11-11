// SidewalkData.jsx

export const updateNoCurbrampsLayer = (map) => {
  const zoomLevel = map.getZoom();
  let sidewalkDataGeojsonUrl;
  if (zoomLevel < 12) {
    sidewalkDataGeojsonUrl = 'https://raw.githubusercontent.com/crescendochu/data-visualization/main/data/Seattle_labels_withZoominLevel/filtered_NoCurbs_withTimestamp_zoomin_0.geojson';
  } else if (zoomLevel < 13) {
    sidewalkDataGeojsonUrl = 'https://raw.githubusercontent.com/crescendochu/data-visualization/main/data/Seattle_labels_withZoominLevel/filtered_NoCurbs_withTimestamp_zoomin_1.geojson';
  } else if (zoomLevel < 14) {
    sidewalkDataGeojsonUrl = 'https://raw.githubusercontent.com/crescendochu/data-visualization/main/data/Seattle_labels_withZoominLevel/filtered_NoCurbs_withTimestamp_zoomin_2.geojson';
  } else if (zoomLevel < 15) {
    sidewalkDataGeojsonUrl = 'https://raw.githubusercontent.com/crescendochu/data-visualization/main/data/Seattle_labels_withZoominLevel/filtered_NoCurbs_withTimestamp_zoomin_3.geojson';
  } else if (zoomLevel >= 15) {
    sidewalkDataGeojsonUrl = 'https://raw.githubusercontent.com/crescendochu/data-visualization/main/data/Seattle_labels_withZoominLevel/filtered_NoCurbs_withTimestamp_zoomin_4.geojson';
  } else {
    sidewalkDataGeojsonUrl = 'https://raw.githubusercontent.com/crescendochu/data-visualization/main/data/Seattle_labels_withZoominLevel/filtered_NoCurbs_withTimestamp_zoomin_0.geojson';
  }

  const existingLayer = map.getLayer('sidewalk-no-curb');
  if (existingLayer) {
    // Get the visibility of the existing layer
    const visibility = map.getLayoutProperty(existingLayer.id, 'visibility');
    map.removeLayer(existingLayer.id); // Remove the existing layer
    map.removeSource(existingLayer.source); // Remove the existing source

    // Add the new source and layer with the same visibility as the old layer
    map.addSource('sidewalk-no-curb', {
      type: 'geojson',
      data: sidewalkDataGeojsonUrl
    });

    const newVisibility = visibility !== undefined ? visibility : 'visible';

    map.addLayer({
      id: 'sidewalk-no-curb',
      type: 'circle',
      source: 'sidewalk-no-curb',
      paint: {
        'circle-radius': 2,
        'circle-color': '#E679B6'
      },
      layout: {
        visibility: newVisibility // Set the visibility of the new layer same as the old layer
      }
    });
  } else {
    // Add the new source and layer with default visibility
    map.addSource('sidewalk-no-curb', {
      type: 'geojson',
      data: sidewalkDataGeojsonUrl
    });

    map.addLayer({
      id: 'sidewalk-no-curb',
      type: 'circle',
      source: 'sidewalk-no-curb',
      paint: {
        'circle-radius': 2,
        'circle-color': '#E679B6'
      },
      layout: {
        visibility: 'visible'
      }
    });
  }
};


export const noCurbrampsLayers = [
  {
    id: 'sidewalk-no-curb',
    source: 'sidewalk-no-curb',
    visibility: 'visible',
    color: '#E679B6',
    title:"Missing Curb Ramps"
  }
];

export const updateCurbrampsLayer = (map) => {
  const zoomLevel = map.getZoom();
  let sidewalkDataGeojsonUrl;
  if (zoomLevel < 12) {
    sidewalkDataGeojsonUrl = 'https://raw.githubusercontent.com/crescendochu/data-visualization/main/data/Seattle_labels_withZoominLevel/filtered_Curbramps_withTimestamp_zoomin_0.geojson';
  } else if (zoomLevel < 13) {
    sidewalkDataGeojsonUrl = 'https://raw.githubusercontent.com/crescendochu/data-visualization/main/data/Seattle_labels_withZoominLevel/filtered_Curbramps_withTimestamp_zoomin_1.geojson';
  } else if (zoomLevel < 14) {
    sidewalkDataGeojsonUrl = 'https://raw.githubusercontent.com/crescendochu/data-visualization/main/data/Seattle_labels_withZoominLevel/filtered_Curbramps_withTimestamp_zoomin_2.geojson';
  } else if (zoomLevel < 15) {
    sidewalkDataGeojsonUrl = 'https://raw.githubusercontent.com/crescendochu/data-visualization/main/data/Seattle_labels_withZoominLevel/filtered_Curbramps_withTimestamp_zoomin_3.geojson';
  } else if (zoomLevel >= 15) {
    sidewalkDataGeojsonUrl = 'https://raw.githubusercontent.com/crescendochu/data-visualization/main/data/Seattle_labels_withZoominLevel/filtered_Curbramps_withTimestamp_zoomin_4.geojson';
  } else {
    sidewalkDataGeojsonUrl = 'https://raw.githubusercontent.com/crescendochu/data-visualization/main/data/Seattle_labels_withZoominLevel/filtered_Curbramps_withTimestamp_zoomin_0.geojson';
  }

  const existingLayer = map.getLayer('sidewalk-curb');
  if (existingLayer) {
    // Get the visibility of the existing layer
    const visibility = map.getLayoutProperty(existingLayer.id, 'visibility');
    map.removeLayer(existingLayer.id); // Remove the existing layer
    map.removeSource(existingLayer.source); // Remove the existing source

    // Add the new source and layer with the same visibility as the old layer
    map.addSource('sidewalk-curb', {
      type: 'geojson',
      data: sidewalkDataGeojsonUrl
    });

    const newVisibility = visibility !== undefined ? visibility : 'visible';

    map.addLayer({
      id: 'sidewalk-curb',
      type: 'circle',
      source: 'sidewalk-curb',
      paint: {
        'circle-radius': 2,
        'circle-color': '#90C31F'
      },
      layout: {
        visibility: newVisibility // Set the visibility of the new layer same as the old layer
      }
    });
  } else {
    // Add the new source and layer with default visibility
    map.addSource('sidewalk-curb', {
      type: 'geojson',
      data: sidewalkDataGeojsonUrl
    });

    map.addLayer({
      id: 'sidewalk-curb',
      type: 'circle',
      source: 'sidewalk-curb',
      paint: {
        'circle-radius': 2,
        'circle-color': '#90C31F'
      },
      layout: {
        visibility: 'visible'
      }
    });
  }
};

export const curbrampsLayers = [
  {
    id: 'sidewalk-curb',
    source: 'sidewalk-curb',
    visibility: 'visible',
    color: '#90C31F',
    title:"Curb Ramps"
  }
];

export const updateNoSidewalkLayer = (map) => {
  const zoomLevel = map.getZoom();
  let sidewalkDataGeojsonUrl;
  if (zoomLevel < 12) {
    sidewalkDataGeojsonUrl = 'https://raw.githubusercontent.com/crescendochu/data-visualization/main/data/Seattle_labels_withZoominLevel/filtered_NoSidewalk_withTimestamp_zoomin_0.geojson';
  } else if (zoomLevel < 13) {
    sidewalkDataGeojsonUrl = 'https://raw.githubusercontent.com/crescendochu/data-visualization/main/data/Seattle_labels_withZoominLevel/filtered_NoSidewalk_withTimestamp_zoomin_1.geojson';
  } else if (zoomLevel < 14) {
    sidewalkDataGeojsonUrl = 'https://raw.githubusercontent.com/crescendochu/data-visualization/main/data/Seattle_labels_withZoominLevel/filtered_NoSidewalk_withTimestamp_zoomin_2.geojson';
  } else if (zoomLevel < 15) {
    sidewalkDataGeojsonUrl = 'https://raw.githubusercontent.com/crescendochu/data-visualization/main/data/Seattle_labels_withZoominLevel/filtered_NoSidewalk_withTimestamp_zoomin_3.geojson';
  } else if (zoomLevel >= 15) {
    sidewalkDataGeojsonUrl = 'https://raw.githubusercontent.com/crescendochu/data-visualization/main/data/Seattle_labels_withZoominLevel/filtered_NoSidewalk_withTimestamp_zoomin_4.geojson';
  } else {
    sidewalkDataGeojsonUrl = 'https://raw.githubusercontent.com/crescendochu/data-visualization/main/data/Seattle_labels_withZoominLevel/filtered_NoSidewalk_withTimestamp_zoomin_0.geojson';
  }

  const existingLayer = map.getLayer('sidewalk-no-sidewalk');
  if (existingLayer) {
    // Get the visibility of the existing layer
    const visibility = map.getLayoutProperty(existingLayer.id, 'visibility');
    map.removeLayer(existingLayer.id); // Remove the existing layer
    map.removeSource(existingLayer.source); // Remove the existing source

    // Add the new source and layer with the same visibility as the old layer
    map.addSource('sidewalk-no-sidewalk', {
      type: 'geojson',
      data: sidewalkDataGeojsonUrl
    });

    const newVisibility = visibility !== undefined ? visibility : 'visible';

    map.addLayer({
      id: 'sidewalk-no-sidewalk',
      type: 'circle',
      source: 'sidewalk-no-sidewalk',
      paint: {
        'circle-radius': 2,
        'circle-color': '#BE87D8'
      },
      layout: {
        visibility: newVisibility // Set the visibility of the new layer same as the old layer
      }
    });
  } else {
    // Add the new source and layer with default visibility
    map.addSource('sidewalk-no-sidewalk', {
      type: 'geojson',
      data: sidewalkDataGeojsonUrl
    });

    map.addLayer({
      id: 'sidewalk-no-sidewalk',
      type: 'circle',
      source: 'sidewalk-no-sidewalk',
      paint: {
        'circle-radius': 2,
        'circle-color': '#BE87D8'
      },
      layout: {
        visibility: 'visible'
      }
    });
  }
};

export const noSidewalkLayers = [
  {
    id: 'sidewalk-no-sidewalk',
    source: 'sidewalk-no-sidewalk',
    visibility: 'visible',
    color: '#BE87D8',
    title:"No Sidewalk"
  }
];

export const updateObstacleLayer = (map) => {
  const zoomLevel = map.getZoom();
  let sidewalkDataGeojsonUrl;
  if (zoomLevel < 12) {
    sidewalkDataGeojsonUrl = 'https://raw.githubusercontent.com/crescendochu/data-visualization/main/data/Seattle_labels_withZoominLevel/filtered_Obstacle_withTimestamp_zoomin_0.geojson';
  } else if (zoomLevel < 13) {
    sidewalkDataGeojsonUrl = 'https://raw.githubusercontent.com/crescendochu/data-visualization/main/data/Seattle_labels_withZoominLevel/filtered_Obstacle_withTimestamp_zoomin_1.geojson';
  } else if (zoomLevel < 14) {
    sidewalkDataGeojsonUrl = 'https://raw.githubusercontent.com/crescendochu/data-visualization/main/data/Seattle_labels_withZoominLevel/filtered_Obstacle_withTimestamp_zoomin_2.geojson';
  } else if (zoomLevel < 15) {
    sidewalkDataGeojsonUrl = 'https://raw.githubusercontent.com/crescendochu/data-visualization/main/data/Seattle_labels_withZoominLevel/filtered_Obstacle_withTimestamp_zoomin_3.geojson';
  } else if (zoomLevel >= 15) {
    sidewalkDataGeojsonUrl = 'https://raw.githubusercontent.com/crescendochu/data-visualization/main/data/Seattle_labels_withZoominLevel/filtered_Obstacle_withTimestamp_zoomin_4.geojson';
  } else {
    sidewalkDataGeojsonUrl = 'https://raw.githubusercontent.com/crescendochu/data-visualization/main/data/Seattle_labels_withZoominLevel/filtered_Obstacle_withTimestamp_zoomin_0.geojson';
  }

  const existingLayer = map.getLayer('sidewalk-obstacle');
  if (existingLayer) {
    // Get the visibility of the existing layer
    const visibility = map.getLayoutProperty(existingLayer.id, 'visibility');
    map.removeLayer(existingLayer.id); // Remove the existing layer
    map.removeSource(existingLayer.source); // Remove the existing source

    // Add the new source and layer with the same visibility as the old layer
    map.addSource('sidewalk-obstacle', {
      type: 'geojson',
      data: sidewalkDataGeojsonUrl
    });

    const newVisibility = visibility !== undefined ? visibility : 'visible';

    map.addLayer({
      id: 'sidewalk-obstacle',
      type: 'circle',
      source: 'sidewalk-obstacle',
      paint: {
        'circle-radius': 2,
        'circle-color': '#78B0EA'
      },
      layout: {
        visibility: newVisibility // Set the visibility of the new layer same as the old layer
      }
    });
  } else {
    // Add the new source and layer with default visibility
    map.addSource('sidewalk-obstacle', {
      type: 'geojson',
      data: sidewalkDataGeojsonUrl
    });

    map.addLayer({
      id: 'sidewalk-obstacle',
      type: 'circle',
      source: 'sidewalk-obstacle',
      paint: {
        'circle-radius': 2,
        'circle-color': '#78B0EA'
      },
      layout: {
        visibility: 'visible'
      }
    });
  }
};

export const obstacleLayers = [
  {
    id: 'sidewalk-obstacle',
    source: 'sidewalk-obstacle',
    visibility: 'visible',
    color: '#78B0EA',
    title:"Obstacles"
  }
];

export const updateSurfaceProblemLayer = (map) => {
  const zoomLevel = map.getZoom();
  let sidewalkDataGeojsonUrl;
  if (zoomLevel < 12) {
    sidewalkDataGeojsonUrl = 'https://raw.githubusercontent.com/crescendochu/data-visualization/main/data/Seattle_labels_withZoominLevel/filtered_SurfaceProblem_withTimestamp_zoomin_0.geojson';
  } else if (zoomLevel < 13) {
    sidewalkDataGeojsonUrl = 'https://raw.githubusercontent.com/crescendochu/data-visualization/main/data/Seattle_labels_withZoominLevel/filtered_SurfaceProblem_withTimestamp_zoomin_1.geojson';
  } else if (zoomLevel < 14) {
    sidewalkDataGeojsonUrl = 'https://raw.githubusercontent.com/crescendochu/data-visualization/main/data/Seattle_labels_withZoominLevel/filtered_SurfaceProblem_withTimestamp_zoomin_2.geojson';
  } else if (zoomLevel < 15) {
    sidewalkDataGeojsonUrl = 'https://raw.githubusercontent.com/crescendochu/data-visualization/main/data/Seattle_labels_withZoominLevel/filtered_SurfaceProblem_withTimestamp_zoomin_3.geojson';
  } else if (zoomLevel >= 15) {
    sidewalkDataGeojsonUrl = 'https://raw.githubusercontent.com/crescendochu/data-visualization/main/data/Seattle_labels_withZoominLevel/filtered_SurfaceProblem_withTimestamp_zoomin_4.geojson';
  } else {
    sidewalkDataGeojsonUrl = 'https://raw.githubusercontent.com/crescendochu/data-visualization/main/data/Seattle_labels_withZoominLevel/filtered_SurfaceProblem_withTimestamp_zoomin_0.geojson';
  }

  const existingLayer = map.getLayer('sidewalk-surface');
  if (existingLayer) {
    // Get the visibility of the existing layer
    const visibility = map.getLayoutProperty(existingLayer.id, 'visibility');
    map.removeLayer(existingLayer.id); // Remove the existing layer
    map.removeSource(existingLayer.source); // Remove the existing source

    // Add the new source and layer with the same visibility as the old layer
    map.addSource('sidewalk-surface', {
      type: 'geojson',
      data: sidewalkDataGeojsonUrl
    });

    const newVisibility = visibility !== undefined ? visibility : 'visible';

    map.addLayer({
      id: 'sidewalk-surface',
      type: 'circle',
      source: 'sidewalk-surface',
      paint: {
        'circle-radius': 2,
        'circle-color': '#F68D3E',
        'circle-opacity': 0.8
      },
      layout: {
        visibility: newVisibility // Set the visibility of the new layer same as the old layer
      }
    });
  } else {
    // Add the new source and layer with default visibility
    map.addSource('sidewalk-surface', {
      type: 'geojson',
      data: sidewalkDataGeojsonUrl
    });

    map.addLayer({
      id: 'sidewalk-surface',
      type: 'circle',
      source: 'sidewalk-surface',
      paint: {
        'circle-radius': 2,
        'circle-color': '#F68D3E'
      },
      layout: {
        visibility: 'visible'
      }
    });
  }
};

export const surfaceProblemLayers = [
  {
    id: 'sidewalk-surface',
    source: 'sidewalk-surface',
    visibility: 'visible',
    color: '#F68D3E',
    title:"Surface Problems"
  }
];