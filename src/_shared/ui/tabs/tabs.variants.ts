import { tv } from 'tailwind-variants';

export const listVariants = tv({
  base: 'inline-flex h-11 items-center justify-center p-1 gap-1.5',
});

export const triggerVariants = tv({
  base: 'data-[state=active]:bg-content lg:data-[state=active]:bg-background bg-transparent inline-flex items-center justify-center rounded-lg px-3 py-1.5 xs:px-4 xs:py-2 text-base xs:text-lg font-medium whitespace-nowrap transition-colors-background-opacity disabled:pointer-events-none disabled:opacity-50 lg:data-[state=active]:shadow-sm',
});

export const contentVariants = tv({
  base: 'focus-visible:outline-none',
});
