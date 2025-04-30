import { FC, ReactNode } from 'react';

interface ScrollContainerProps {
  children: ReactNode;
}

export const ScrollContainer: FC<ScrollContainerProps> = ({ children }) => {
  return (
    <div className='[&::-webkit-scrollbar-thumb]:bg-foreground/20 [&::-webkit-scrollbar-track]:bg-background/50 size-full overflow-x-hidden overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:rounded-full'>
      {children}
    </div>
  );
};
