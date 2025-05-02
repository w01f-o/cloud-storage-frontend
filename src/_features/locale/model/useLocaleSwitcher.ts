import { usePathname, useRouter } from '@/_shared/i18n';
import { useDisclosure } from '@/_shared/lib';
import { Locale, useLocale } from 'next-intl';
import { useTransition } from 'react';

export const useLocaleSwitcher = () => {
  const router = useRouter();
  const locale = useLocale();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const { isOpen, toggle } = useDisclosure();

  const changeHandler = (locale: Locale) => {
    startTransition(() => {
      router.replace({ pathname }, { locale });
    });
  };

  return {
    locale,
    changeHandler,
    dropdownIsOpen: isOpen,
    toggleDropdown: toggle,
    isPending,
  };
};
