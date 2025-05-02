import { FC, PropsWithChildren } from 'react';

export const SettingsGroup: FC<PropsWithChildren> = ({ children }) => {
  return <div className='inline-flex flex-col gap-4'>{children}</div>;
};
