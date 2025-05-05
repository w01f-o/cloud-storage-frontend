'use client';

import { getFileColor } from '@/_entities/file';
import { useUserStorage } from '@/_entities/storage';
import { ArcElement, Chart, ChartData, Legend, Tooltip } from 'chart.js';
import { useLocale, useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import prettyBytes from 'pretty-bytes';
import { FC } from 'react';
import { Doughnut } from 'react-chartjs-2';

Chart.register(ArcElement, Tooltip, Legend);

export const StorageDoughnut: FC = () => {
  const { data: storage } = useUserStorage();
  const locale = useLocale();
  const t = useTranslations('StoragePage.resolvedFileType.plural');

  const data = storage.files.map(({ size }) => size);
  const labels = storage.files.map(({ resolvedType }) => t(resolvedType));
  const colors = storage.files.map(({ resolvedType }) =>
    getFileColor(resolvedType)
  );
  const { resolvedTheme } = useTheme();

  const doughnutData: ChartData<'doughnut', string[] | number[], string> = {
    labels: labels,
    datasets: [
      {
        data: data.length > 0 ? data.map(String) : [1],
        backgroundColor: colors,
        hoverOffset: 0,
        borderRadius: 5,
        borderColor: resolvedTheme === 'light' ? '#ffffff' : '#1a1a1c',
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
