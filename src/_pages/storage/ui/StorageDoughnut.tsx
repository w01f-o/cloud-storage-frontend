'use client';

import { useUserStorage } from '@/_entities/storage';
import { ArcElement, Chart, Legend, Tooltip } from 'chart.js';
import { useLocale } from 'next-intl';
import prettyBytes from 'pretty-bytes';
import { FC } from 'react';
import { Doughnut } from 'react-chartjs-2';

Chart.register(ArcElement, Tooltip, Legend);

export const StorageDoughnut: FC = () => {
  const { data: storage } = useUserStorage();
  const locale = useLocale();

  const data = storage.files.map(item => item.size);
  const labels = storage.files.map(item => item.resolvedType);

  const doughnutData = {
    labels: labels,
    datasets: [
      {
        data: data.length > 0 ? data.map(String) : [1],
        backgroundColor: 'rgba(161,64,255,0.5)',
        hoverOffset: 5,
        borderRadius: 5,
        borderColor: '#f1f3f6',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className='h-[370px]'>
      <Doughnut
        data={doughnutData}
        options={{
          plugins: {
            tooltip: {
              callbacks: {
                label: ({ label, parsed }) =>
                  `${label}: ${prettyBytes(parsed, { locale })}`,
              },
            },
            legend: { display: false },
          },
          responsive: true,
          maintainAspectRatio: false,
        }}
      />
    </div>
  );
};
