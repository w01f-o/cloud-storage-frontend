import { FC, ReactNode } from 'react';

interface SettingsRowProps {
  label: string;
  children: ReactNode;
}

export const SettingsRow: FC<SettingsRowProps> = ({ label, children }) => {
  return (
    <div className='flex items-center gap-4'>
      <div className='min-w-36 flex-1'>{label}</div>
      <div className='flex flex-2 items-center gap-3'>{children}</div>
    </div>
  );
};
