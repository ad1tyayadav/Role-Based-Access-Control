import React from 'react';
import { Line, Doughnut } from 'react-chartjs-2';
import { Users, Shield, Key, DollarSign, TrendingUp } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { useStore } from '../../store/useStore';

// Registering necessary chart components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Title, Tooltip, Legend);

export const DashboardStats: React.FC = () => {
  const { users, roles } = useStore();

  // Define stats with dummy growth data
  const stats = [
    {
      name: 'Total Users',
      value: users.length,
      icon: Users,
      color: 'bg-indigo-600',
      growth: '+12.5%',
    },
    {
      name: 'Active Roles',
      value: roles.length,
      icon: Shield,
      color: 'bg-green-600',
      growth: '+8.3%',
    },
    {
      name: 'Total Permissions',
      value: roles.reduce((acc, role) => acc + role.permissions.length, 0),
      icon: Key,
      color: 'bg-purple-600',
      growth: '+5.2%',
    },
    {
      name: 'Revenue',
      value: '$150,000',
      icon: DollarSign,
      color: 'bg-yellow-600',
      growth: '+8.9%',
    },
    {
      name: 'Growth Rate',
      value: '15%',
      icon: TrendingUp,
      color: 'bg-teal-600',
      growth: '+4.7%',
    },
  ];

  // Doughnut chart data (dummy data for demonstration)
  const doughnutData = {
    labels: ['Active Users', 'Inactive Users', 'New Signups'],
    datasets: [
      {
        label: 'User Statistics',
        data: [60, 20, 20],
        backgroundColor: ['#34D399', '#F87171', '#FBBF24'],
        borderColor: 'white',
        borderWidth: 2,
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem: any) {
            return tooltipItem.raw + '%'; // Show percentage in the tooltip
          },
        },
      },
    },
  };

  // Line chart data (dummy data for demonstration)
  const lineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'User Growth',
        data: [8000, 9000, 10500, 12000, 13000, 15000],
        borderColor: '#4ADE80',
        backgroundColor: '#4ADE8040',
        borderWidth: 2,
        fill: true,
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'User Growth Over Time',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="space-y-8 px-4 sm:px-6 lg:px-8 relative top-8 sm:top-0">
      {/* Stats Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
        {stats.map(({ name, value, growth, color, icon: Icon }) => (
          <div
            key={name}
            className={`p-6 rounded-lg shadow-lg text-white ${color} hover:scale-105 transition-transform duration-300`}
          >
            <div className="flex items-center">
              <div className={`p-3 rounded-full ${color} bg-opacity-20`}>
                <Icon className={`h-8 w-8 ${color.replace('bg-', 'text-')}`} />
              </div>
              <div className="ml-4">
                <h4 className="text-sm font-medium">{name}</h4>
                <p className="text-2xl font-bold mt-2">{value}</p>
                <p
                  className={`mt-1 text-sm ${
                    growth.startsWith('-') ? 'text-red-300' : 'text-green-300'
                  }`}
                >
                  {growth}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section: Side-by-Side Layout on Larger Screens */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {/* Doughnut Chart */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold text-white mb-4">User Statistics</h3>
          <div className="w-full h-64 sm:h-80">
            <Doughnut data={doughnutData} options={doughnutOptions} />
          </div>
        </div>

        {/* Line Chart */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold text-white mb-4">User Growth Analytics</h3>
          <div className="w-full h-64 sm:h-80">
            <Line data={lineData} options={lineOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};
