import { tv } from 'tailwind-variants';

const baseItemStyles =
  'focus:bg-default/10 transition-colors-background-opacity text-md pl-8 pr-4 py-3 outline-none select-none';

const interactiveStyles =
  'cursor-pointer relative flex items-center data-[disabled]:pointer-events-none data-[disabled]:opacity-50';

const contentBaseStyles =
  'bg-background text-foreground z-50 min-w-[12rem] origin-[--radix-context-menu-content-transform-origin] overflow-hidden rounded-md shadow-xl';

const dangerStyles = 'text-danger';

export const subTriggerVariants = tv({
  base: `${baseItemStyles} flex cursor-default items-center`,
});

export const subContentVariants = tv({
  base: `${contentBaseStyles}`,
});

export const contentVariants = tv({
  base: `${contentBaseStyles} max-h-[--radix-context-menu-content-available-height] overflow-x-hidden overflow-y-auto shadow-md`,
});

export const itemVariants = tv({
  base: `${baseItemStyles} ${interactiveStyles}`,
  variants: {
    isDanger: {
      true: dangerStyles,
    },
  },
});

export const checkboxItemVariants = tv({
  base: `${baseItemStyles} ${interactiveStyles}`,
  variants: {
    isDanger: {
      true: dangerStyles,
    },
  },
});

export const radioItemVariants = tv({
  base: `${baseItemStyles} ${interactiveStyles}`,
  variants: {
    isDanger: {
      true: dangerStyles,
    },
  },
});

export const labelVariants = tv({
  base: 'text-foreground p-3 pr-4 pl-8 text-md font-semibold',
});

export const separatorVariants = tv({
  base: 'bg-foreground/20 h-px',
});
