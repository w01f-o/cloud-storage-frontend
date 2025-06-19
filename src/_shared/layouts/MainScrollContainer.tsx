'use client';

import { FC, PropsWithChildren } from 'react';
import { useMainScrollContainer } from '../lib';
import { ScrollContainer } from '../ui';

export const MainScrollContainer: FC<PropsWithChildren> = ({ children }) => {
  const setElement = useMainScrollContainer(state => state.setElement);

  return (
    <ScrollContainer ref={node => setElement(node)}>
      <div className='size-full px-8 md:px-12'>{children}</div>
    </ScrollContainer>
  );
};
