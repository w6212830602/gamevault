'use client';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ChartComponent({ games }) {
  const platformCount = {};

  games.forEach((game) => {
    const platforms = game.platform?.split(',') || ['Unknown'];
    platforms.forEach((p) => {
      const key = p.trim();
      platformCount[key] = (platformCount[key] || 0) + 1;
    });
  });

  const data = {
    labels: Object.keys(platformCount),
    datasets: [
      {
        label: 'Favorites by Platform',
        data: Object.values(platformCount),
        backgroundColor: [
          '#60a5fa', 
          '#f87171', 
          '#34d399', 
          '#fbbf24', 
          '#a78bfa', 
          '#f472b6', 
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ maxWidth: '480px', margin: '0 auto', paddingTop: '20px' }}>
      <Pie data={data} />
    </div>
  );
}
