import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {};

const withNextIntl = createNextIntlPlugin({
  requestConfig: './src/_shared/i18n/request.ts',
  experimental: {
    createMessagesDeclaration: './messages/en.json',
  },
});

export default withNextIntl(nextConfig);
