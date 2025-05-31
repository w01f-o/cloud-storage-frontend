import { getFileColor } from '@/_entities/file';
import { useUserStorage } from '@/_entities/storage';
import { ChartData } from 'chart.js';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';

type DoughnutData = ChartData<'doughnut', string[] | number[], string>;

interface UseStorageDoughnutReturn {
  doughnutData: DoughnutData;
}

export const useStorageDoughnut = (): UseStorageDoughnutReturn => {
  const { data: storage } = useUserStorage();
  const t = useTranslations('resolvedFileType.plural');
  const { resolvedTheme } = useTheme();

  const data = storage.files.map(({ size }) => size);
  const labels = storage.files.map(({ resolvedType }) => t(resolvedType));
  const colors = storage.files.map(({ resolvedType }) =>
    getFileColor(resolvedType)
  );

  const doughnutData: DoughnutData = {
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

  return {
    doughnutData,
  };
};
