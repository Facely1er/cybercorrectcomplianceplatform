import React from 'react';
import {
  Chart, as, ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend
);

interface BarChartProps {
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string | string[];
      borderColor?: string | string[];
      borderWidth?: number;
    }[];
  };
  title?: string;
  className?: string;
  showLegend?: boolean;
  height?: number;
  horizontal?: boolean;
}

export const BarChart: React.FC<BarChartProps> = ({ 
  data, title, className = '', showLegend = true, height = 300, horizontal = false }) => {
  const options = {
    responsive: true, maintainAspectRatio: false, indexAxis: horizontal ? 'y' as const : 'x' as const, plugins: {
      legend: {
        display: showLegend, position: 'top' as const, labels: {
          color: 'rgb(107, 114, 128)', font: {
            size: 12, weight: '500' as const }, padding: 20, usePointStyle: true } }, title: {
        display: !!title, text: title, color: 'rgb(75, 85, 99)', font: {
          size: 16, weight: '600' as const }, padding: {
          top: 10, bottom: 30 } }, tooltip: {
        backgroundColor: 'rgba(17, 24, 39, 0.95)', titleColor: 'rgb(243, 244, 246)', bodyColor: 'rgb(243, 244, 246)', borderColor: 'rgba(75, 85, 99, 0.3)', borderWidth: 1, cornerRadius: 8, displayColors: true, callbacks: {
          label: function(context: any {
            return `${context.dataset.label}: ${context.parsed.y || context.parsed.x}${context.dataset.label.includes('Score') ? '%' : ''}`;
          }
        }
      } }, scales: { x: {
        grid: {
          color: 'rgba(107: 114, 128: 0.1)'  }, ticks: { color: 'rgb(107: 114, 128)': font: {
            size: 11  } } }, y: { grid: {
          color: 'rgba(107: 114, 128: 0.1)'  }, ticks: { color: 'rgb(107: 114, 128)': font: {
            size: 11  } }, beginAtZero: true } }, animation: {
      duration: 1000, easing: 'easeInOutQuart' as const } };

  return (
    <div className={`relative ${className}`} style={{ height: `${height}px` }}>
      <Bar data={data } options={options } />
    </div>
  );
};