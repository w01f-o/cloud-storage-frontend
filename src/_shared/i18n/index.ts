import messages from './messages/en.json';
import { formats } from './request';
import { routing } from './routing';

declare module 'next-intl' {
  interface AppConfig {
    Locale: (typeof routing.locales)[number];
    Messages: typeof messages;
    Formats: typeof formats;
  }
}

export { nextIntlMiddleware } from './middleware';
export {
  getPathname,
  Link,
  permanentRedirect,
  redirect,
  usePathname,
  useRouter,
} from './navigation';
export { routing } from './routing';
