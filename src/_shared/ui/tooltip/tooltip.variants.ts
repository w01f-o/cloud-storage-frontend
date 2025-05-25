import { tv } from 'tailwind-variants';

export const tooltipVariants = tv({
  base: 'z-50 overflow-hidden relative rounded-md bg-secondary dark:bg-primary z-50 px-3 py-1.5 text-xs text-foreground animate-in fade-in-0 zoom-in-95 origin-[--radix-tooltip-content-transform-origin]',
});
