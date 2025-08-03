import React from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

interface RadarChartProps {
  sectionScores: Array<{
    name: string;
    score: number;
  }>;
  className?: string;
}

export const RadarChart: React.FC<RadarChartProps> = ({ sectionScores, className = '' }) => {
  const data = {
    labels: sectionScores.map(section => section.name),
    datasets: [
      {
        label: 'Current Maturity Score',
        data: sectionScores.map(section => section.score),
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(59, 130, 246, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(59, 130, 246, 1)',
        pointRadius: 6,
        pointHoverRadius: 8,
      },
      {
        label: 'Target Score (75%)',
        data: sectionScores.map(() => 75),
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        borderColor: 'rgba(34, 197, 94, 0.8)',
        borderWidth: 2,
        borderDash: [5, 5],
        pointBackgroundColor: 'rgba(34, 197, 94, 0.8)',
        pointBorderColor: '#fff',
        pointRadius: 4,
        pointHoverRadius: 6,
      }
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: 'rgb(107, 114, 128)',
          font: {
            size: 12,
            weight: '500' as const,
          },
          padding: 20,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(17, 24, 39, 0.95)',
        titleColor: 'rgb(243, 244, 246)',
        bodyColor: 'rgb(243, 244, 246)',
        borderColor: 'rgba(75, 85, 99, 0.3)',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
        callbacks: {
          label: function(context: any) {
            return `${context.dataset.label}: ${context.parsed.r}%`;
          }
        }
      },
    },
    scales: {
      r: {
        angleLines: {
          color: 'rgba(107, 114, 128, 0.3)',
        },
        grid: {
          color: 'rgba(107, 114, 128, 0.2)',
        },
        pointLabels: {
          color: 'rgb(75, 85, 99)',
          font: {
            size: 11,
            weight: '500' as const,
          },
        },
        ticks: {
          color: 'rgb(107, 114, 128)',
          font: {
            size: 10,
          },
          stepSize: 25,
          showLabelBackdrop: false,
        },
        suggestedMin: 0,
        suggestedMax: 100,
      },
    },
    elements: {
      line: {
        tension: 0.2,
      },
    },
  };

  return (
    <div className={`relative ${className}`}>
      <Radar data={data} options={options} />
    </div>
  );
};