import { FC } from 'react';

interface PageTitleProps {
  title: string;
}

export const PageTitle: FC<PageTitleProps> = ({ title }) => {
  return <h1 className='text-4xl font-bold'>{title}</h1>;
};
