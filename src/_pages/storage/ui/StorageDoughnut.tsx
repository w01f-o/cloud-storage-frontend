'use client';

import { ArcElement, Chart, Legend, Tooltip } from 'chart.js';
import { useLocale } from 'next-intl';
import prettyBytes from 'pretty-bytes';
import { FC } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { useStorageDoughnut } from '../model/hooks/use-storage-doughnut';

Chart.register(ArcElement, Tooltip, Legend);

export const StorageDoughnut: FC = () => {
  const locale = useLocale();
  const { doughnutData } = useStorageDoughnut();

  return (
    <div className='h-96'>
      <Doughnut
        data={doughnutData}
        options={{
          plugins: {
            tooltip: {
              callbacks: {
                label: ({ label, raw }) => {
                  if (typeof raw === 'string') {
                    return `${label}: ${prettyBytes(BigInt(raw), { locale })}`;
                  }
                },
              },
              titleFont: { family: 'Nunito Sans' },
              bodyFont: { family: 'Nunito Sans' },
            },
            legend: {
              display: false,
            },
          },
          responsive: true,
          maintainAspectRatio: false,
        }}
      />
    </div>
  );
};
