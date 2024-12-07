import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const Analytics: React.FC = () => {
  // Dummy data for cards
  const stats = [
    { label: 'Total Users', value: '24,562', growth: '+12.5%', color: 'bg-indigo-500' },
    { label: 'New Signups', value: '1,204', growth: '+8.3%', color: 'bg-green-500' },
    { label: 'Active Sessions', value: '14,843', growth: '-3.2%', color: 'bg-red-500' },
    { label: 'Revenue', value: '$56,432', growth: '+5.7%', color: 'bg-yellow-500' },
  ];

  // Chart data
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Revenue (in $)',
        data: [12000, 19000, 15000, 22000, 24000, 26000],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Monthly Revenue Chart',
      },
    },
  };

  return (
    <div className="space-y-8 relative top-8 w-[82vw] sm:top-0 overflow-x-hidden">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ label, value, growth, color }) => (
          <div
            key={label}
            className={`p-4 rounded-lg shadow-md text-white ${color}`}
          >
            <h4 className="text-sm font-medium">{label}</h4>
            <p className="text-2xl font-bold mt-2">{value}</p>
            <p
              className={`mt-1 text-sm ${
                growth.startsWith('-') ? 'text-red-300' : 'text-green-300'
              }`}
            >
              {growth}
            </p>
          </div>
        ))}
      </div>

      {/* Bar Chart */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-md overflow-hidden">
        <h3 className="text-xl font-semibold text-white mb-4">Revenue Analytics</h3>
        <div className="relative w-full max-w-full h-64 sm:h-80 lg:h-96 overflow-hidden">
          <Bar data={data} options={options} />
        </div>
      </div>
    </div>
  );
};
