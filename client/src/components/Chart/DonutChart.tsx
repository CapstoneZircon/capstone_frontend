import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

const DonutChart = () => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const [counts, setCounts] = useState<any>(null); // Define state for counts

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch counts for each status
        const countsResponse = await fetch("http://localhost:3002/api/rfid_record_counts");
        const countsData = await countsResponse.json();
        setCounts(countsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!chartRef.current || !counts) return; // Null check for chartRef and counts

    const data = {
      // labels: ['Normal', 'Clarified', 'Abnormal'],
      labels: ['ปกติ', 'ตรวจสอบแล้ว', 'ผิดปกติ'],
      datasets: [{
        data: [counts.CheckInOut, counts.Clarified, counts.Abnormal], // Use counts data here
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
          position: 'bottom' as const,
          labels: {
            usePointStyle: true,
            pointStyle: 'circle',
            padding: 10,
            font: {
              size: 13
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
  }, [chartRef.current, counts]);

  return (
    <div style={{ textAlign: 'center' }}>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default DonutChart;
