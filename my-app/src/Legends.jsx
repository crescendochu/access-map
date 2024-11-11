// Legends.jsx

export const createGradientLegend = (map, colors, min, max, title) => {
    const legend = document.createElement('div');
    legend.id = 'gradient-legend';
    
    const legendTitle = document.createElement('div');
    legendTitle.className = 'legend-title';
    legendTitle.textContent = title;
    legend.appendChild(legendTitle);
    
    const gradientBar = document.createElement('div');
    gradientBar.className = 'gradient-bar';
    
    // Create a linear gradient background from the colors
    let gradientBackground = 'linear-gradient(to right, ';
    gradientBackground += colors.map(color => color.color).join(', ');
    gradientBackground += ')';
    gradientBar.style.background = gradientBackground;
    
    legend.appendChild(gradientBar);

    const gradientLabels = document.createElement('div');
    gradientLabels.className = 'gradient-labels';
    legend.appendChild(gradientLabels);
  
    // Add min and max values
    const minElement = document.createElement('div');
    minElement.className = 'gradient-label';
    minElement.textContent = min;
    gradientLabels.appendChild(minElement);
  
    const maxElement = document.createElement('div');
    maxElement.className = 'gradient-label';
    maxElement.textContent = max;
    gradientLabels.appendChild(maxElement);
    
    map.getCanvas().parentNode.appendChild(legend);
  };


  export const createPointLegend = (map, values, title) => {
    const legend = document.createElement('div');
    legend.id = 'point-legend';
    
    const legendTitle = document.createElement('div');
    legendTitle.className = 'legend-title';
    legendTitle.textContent = title;
    legend.appendChild(legendTitle);

    values.forEach(value => {
        const legendItem = document.createElement('div');
        legendItem.className = 'legend-item';
        
        const legendIndicator = document.createElement('div');
        legendIndicator.className = 'legend-indicator';
        legendIndicator.style.backgroundColor = value.color;

        const legendLabel = document.createElement('div');
        legendLabel.className = 'legend-label';
        legendLabel.textContent = value.value;

        legendItem.appendChild(legendIndicator);
        legendItem.appendChild(legendLabel);
        legend.appendChild(legendItem);
    });
    
    map.getCanvas().parentNode.appendChild(legend);
  };
  