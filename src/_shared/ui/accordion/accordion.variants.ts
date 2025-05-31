import { tv } from 'tailwind-variants';

export const rootVariants = tv({ base: 'text-foreground w-full text-xl' });

export const itemVariants = tv({
  base: 'border-foreground/20 border-b text-lg last:border-none',
});

export const triggerVariants = tv({
  base: 'hover:bg-background/80 flex w-full items-center justify-between px-4 py-3 text-left font-medium transition-all [&[data-state=open]>svg]:rotate-360',
});

export const contentVariants = tv({
  base: 'data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden',
});
