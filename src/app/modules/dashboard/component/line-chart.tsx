import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Plugin,
  ChartType,
} from 'chart.js';
import './../../../../styles/globals.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const RoundedLegendPlugin: Plugin<ChartType> = {
  id: 'roundedLegend',
  beforeDraw: (chart) => {
    const { ctx, legend, chartArea } = chart;

    if (!legend) return;

    const legendItems = legend.legendItems;

    if (legendItems) {
      const radius = 10;
      const padding = 10;
      const itemHeight = radius * 2 + padding;
      const marginTop = 30;
      const legendY = chartArea.bottom + itemHeight + marginTop;

      legendItems.forEach((item, index) => {
        const text = item.text;

        ctx.font = '12px Arial';

        const textWidth = ctx.measureText(text).width;

        const x =
          chartArea.left + index * (radius * 2 + textWidth + padding * 3);
        const y = legendY;

        ctx.save();
        ctx.fillStyle = item.strokeStyle || '#000';
        ctx.beginPath();
        ctx.arc(x + radius, y, radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.restore();

        ctx.fillText(text, x + radius * 2 + padding, y + radius / 2);
      });
    }
  },
};

const LineChart = () => {
  const data = {
    labels: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    datasets: [
      {
        label: 'Uploads',
        data: [65, 59, 80, 81, 56, 55, 40, 70, 85, 90, 100, 95],
        fill: false,
        borderColor: '#F7CD1B',
        tension: 0.4,
      },
      {
        label: 'Extracts',
        data: [28, 48, 40, 19, 86, 27, 90, 50, 60, 70, 80, 85],
        fill: false,
        borderColor: '#5E60CE',
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    layout: {
      padding: {
        bottom: 0,
      },
    },
  };

  return (
    <div className="chart-container">
      <Line options={options} data={data} plugins={[RoundedLegendPlugin]} />
    </div>
  );
};

export default LineChart;
