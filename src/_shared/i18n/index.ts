import messages from '../../../messages/ru.json';
import { formats } from './request';
import { routing } from './routing';

declare module 'next-intl' {
  interface AppConfig {
    Locale: (typeof routing.locales)[number];
    Messages: typeof messages;
    Formats: typeof formats;
  }
}

export { withNextIntlMiddleware } from './middleware';
export {
  getPathname,
  Link,
  permanentRedirect,
  redirect,
  usePathname,
  useRouter,
} from './navigation';
export { routing } from './routing';
