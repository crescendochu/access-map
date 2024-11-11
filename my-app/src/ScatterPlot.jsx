//ScatterPlot.jsx
import React, { useEffect, useState } from 'react';
import { Chart } from 'chart.js';
import { Scatter } from 'react-chartjs-2';
import regression from 'regression';
  
  const ScatterPlot = ({socioeconomic, sidewalk}) => {
    const [chartData, setChartData] = useState(null);
    
  useEffect(() => {
      async function fetchData() {
        try {
          const res = await fetch('https://raw.githubusercontent.com/crescendochu/access-score/main/seattle/json-for-publishing/access-score/access-score-per-blockgroup.geojson');
          const data = await res.json();
    
          let sidewalk_feature = [];
          let socioeconomic_factor = [];
          let dataPairs = []; 
          
          for (let item of data.features) {
              sidewalk_feature.push(item.properties[sidewalk]); // Use sidewalk prop
              socioeconomic_factor.push(item.properties[socioeconomic]); // Use socioeconomic prop
              dataPairs.push([item.properties[sidewalk], item.properties[socioeconomic]]);
            }
  
          // Calculate the regression
          const result = regression.polynomial(dataPairs, { order: 2 });
          const coefficients = result.equation;
  
          // Create an array of points that define the regression line
          let regressionLine = sidewalk_feature.map((score) => {
              // For polynomial of order 2, equation is of the form y = ax^2 + bx + c
              return { x: score, y: (coefficients[0] * Math.pow(score, 2)) + (coefficients[1] * score) + coefficients[2] };
            });
  
          // Sort the regression line points by their x-coordinate
          regressionLine = regressionLine.sort((a, b) => a.x - b.x);
    
          setChartData({
  
          datasets: [
              {
                label: 'Scatter Dots',
                data: sidewalk_feature.map((score, index) => ({
                  x: score,
                  y: socioeconomic_factor[index],
                })),
                pointBackgroundColor: 'rgba(250, 138, 118,0.5)',
                pointBorderColor: 'transparent',
                pointBorderWidth: 0,
              },
              {
                label: 'Regression Line',
                data: regressionLine,
                type: 'line',
                borderColor: '#e15383',
                borderWidth: 3,
                fill: false,
                pointRadius: 0,
              },
            ],
          });
        } catch (error) {
          console.error("Error fetching data: ", error);
        }
      }
    
      fetchData();
    }, [sidewalk, socioeconomic]); // empty array as dependency
    
  
    return (
      <div>
        {chartData && <Scatter data={chartData} options={{ 
          responsive: true, 
          scales: {
            x: {
              type: 'linear',
              position: 'bottom',
              title: {
                display: true,
                text: sidewalk
              }
            },
            y: {
              type: 'linear',
              title: {
                display: true,
                text: socioeconomic
              }
            }
          },
          plugins: {
              legend: {
                  display: false,
              }
  
          }
          
        }} />}
      </div>
    );  
  };
  
  export default ScatterPlot;
  


