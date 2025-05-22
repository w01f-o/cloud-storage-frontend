import { tv } from 'tailwind-variants';

export const switchVariants = tv({
  base: 'peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-secondary inline-flex h-[30px] w-[54px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors-background-opacity focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
});

export const thumbVariants = tv({
  base: 'data-[state=unchecked]:bg-primary data-[state=checked]:bg-secondary pointer-events-none block h-[24px] w-[24px] rounded-full shadow-lg ring-0 transition-all duration-[250ms] transition-transform data-[state=checked]:translate-x-[24px] data-[state=unchecked]:translate-x-0.5',
});
