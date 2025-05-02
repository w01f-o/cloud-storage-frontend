import { tv } from 'tailwind-variants';

export const triggerVariants = tv({
  base: 'group data-[placeholder]:text-foreground/50 select-none flex h-10 w-full items-center justify-between rounded-md border-2 border-primary bg-transparent px-3 py-2 whitespace-nowrap shadow-md disabled:!cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1',
});

export const scrollUpButtonVariants = tv({
  base: 'flex cursor-default items-center justify-center py-1',
});

export const scrollDownButtonVariants = tv({
  base: 'flex cursor-default items-center justify-center py-1',
});

export const contentVariants = tv({
  base: 'bg-content text-foreground data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-[--radix-select-content-available-height] min-w-[8rem] origin-[--radix-select-content-transform-origin] overflow-x-hidden overflow-y-auto rounded-md border-2 border-primary shadow-md',
  variants: {
    position: {
      popper:
        'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
      ['item-aligned']: '',
    },
  },
});

export const viewportVariants = tv({
  base: '',
  variants: {
    position: {
      popper:
        'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]',
      ['item-aligned']: '',
    },
  },
});

export const labelVariants = tv({ base: 'px-2 py-1.5 text-sm font-semibold' });

export const itemVariants = tv({
  base: 'focus:bg-default/10 transition-colors-background-opacity relative flex w-full cursor-pointer items-center py-2 pr-8 pl-2.5 outline-none select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
});

export const separatorVariants = tv({ base: 'bg-muted -mx-1 my-1 h-px' });
