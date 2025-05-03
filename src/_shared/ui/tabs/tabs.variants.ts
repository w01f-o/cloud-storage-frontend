import { tv } from 'tailwind-variants';

export const listVariants = tv({
  base: 'inline-flex h-9 items-center justify-center rounded-lg p-1',
});

export const triggerVariants = tv({
  base: 'data-[state=active]:bg-background data-[state=active]:text-foreground inline-flex items-center justify-center rounded-md px-3 py-1 text-lg font-medium whitespace-nowrap transition-colors-background-opacity disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm',
});

export const contentVariants = tv({
  base: 'focus-visible:outline-none',
});
