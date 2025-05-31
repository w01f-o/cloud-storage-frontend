import { FC, ReactNode } from 'react';

interface SettingsRowProps {
  label: string;
  children: ReactNode;
}

export const SettingsRow: FC<SettingsRowProps> = ({ label, children }) => {
  return (
    <div className='flex flex-col gap-2 md:flex-row md:items-center md:gap-4'>
      <div className='text-xl md:w-40 md:text-base'>{label}</div>
      <div className='flex items-center gap-3'>{children}</div>
    </div>
  );
};
