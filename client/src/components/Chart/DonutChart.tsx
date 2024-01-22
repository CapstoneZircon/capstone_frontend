import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const DonutChart = () => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!chartRef.current) return; // Null check

    const data = {
      labels: ['Normal', 'Clarified', 'Abnormal'],
      datasets: [{
        data: [70, 20, 10],
        backgroundColor: ['#90FF7E', '#FFE55C', '#FF5C5C'],
        hoverBackgroundColor: ['#90FF7E', '#FFE55C', '#FF5C5C'],
       
      }],
    };

    const options = {
      cutout: '50%',
      radius: '90%',
      plugins: {
        legend: {
          display: true,
          position: 'bottom' as const, // Explicitly specify 'bottom' as the type
          labels: {
            usePointStyle: true,
            pointStyle: 'circle',
            padding: 17,
            font: {
              size: 16
            }
          },
        },
      },
    };

    const ctx = chartRef.current.getContext('2d');

    if (ctx) {
      const myChart = new Chart(ctx, {
        type: 'doughnut',
        data: data,
        options: options,
      });

      return () => {
        myChart.destroy();
      };
    }
  }, [chartRef.current]);

  return (
    <div style={{ textAlign: 'center' }}>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default DonutChart;
