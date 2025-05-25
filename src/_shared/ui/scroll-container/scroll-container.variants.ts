import { tv } from 'tailwind-variants';

export const scrollContainerVariants = tv({
  base: '[&::-webkit-scrollbar-thumb]:bg-foreground/20 [&::-webkit-scrollbar-track]:bg-background/50 size-full overflow-x-hidden overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:rounded-full',
});
