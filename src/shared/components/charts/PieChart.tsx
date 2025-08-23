import React from 'react';
import {
  Chart, as, ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartProps {
  labels: string[];
  data: number[];
  backgroundColor?: string[];
  className?: string;
  title?: string;
}

export const PieChart: React.FC<PieChartProps> = ({ 
  labels, data, backgroundColor = [
    'rgba(239, 68, 68, 0.8)',   // Red for Critical
    'rgba(249, 115, 22, 0.8)',  // Orange for High
    'rgba(234, 179, 8, 0.8)',   // Yellow for Medium
    'rgba(34, 197, 94, 0.8)',   // Green for Low
  ], className = '', title 
    }) => {
  const chartData = {
    labels, datasets: [
      {
        data, backgroundColor, borderColor: backgroundColor.map(color => color.replace('0.8', '1')), borderWidth: 2, hoverBackgroundColor: backgroundColor.map(color => color.replace('0.8', '0.9')), hoverBorderWidth: 3 },
    ] };

  const options = {
    responsive: true, maintainAspectRatio: false, plugins: {
      legend: {
        position: 'bottom' as const, labels: {
          color: 'rgb(107, 114, 128)', font: {
            size: 12, weight: '500' as const }, padding: 20, usePointStyle: true, pointStyle: 'circle' } }, tooltip: {
        backgroundColor: 'rgba(17, 24, 39, 0.95)', titleColor: 'rgb(243, 244, 246)', bodyColor: 'rgb(243, 244, 246)', borderColor: 'rgba(75, 85, 99, 0.3)', borderWidth: 1, cornerRadius: 8, displayColors: true, callbacks: {
          label: function(context): any {
            const label = context.label || '';
            const value = context.parsed || 0;
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
            const percentage = total > 0 ? Math.round((value / total) * 100) : 0;
            return `${label }: ${value } (${percentage }%)`;
          }
        }
      } }, elements: {
      arc: {
        borderWidth: 2 } }, animation: {
      animateRotate: true, animateScale: true, duration: 1000 } };

  // Don't render if no data
  if (data.length === 0 || data.every(value => value === 0)) {
    return (
      <div className={`flex items-center justify-center h-full ${className 
    }`}>
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-3">
            <span className="text-gray-400 text-2xl">📊</span>
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-sm">No data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className }`}>
      {title && (
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 text-center">
          {title }
        </h3>
      )}
      <div className="relative h-full">
        <Pie data={chartData } options={options } />
      </div>
    </div>
  );
};