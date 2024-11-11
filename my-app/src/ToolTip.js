// ToolTips.js
import mapboxgl from 'mapbox-gl';

export function attachTooltip(map, layerId, tooltipFormatFunction) {
  const tooltip = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false
  });

  map.on('mousemove', layerId, (e) => {
    if (e.features.length) {
      const feature = e.features[0];
      tooltip.setLngLat(e.lngLat)
        .setHTML(tooltipFormatFunction(feature))
        .addTo(map);
    }
  });

  map.on('mouseleave', layerId, () => {
    tooltip.remove();
  });
}