import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const apiUrl = new URL(`${process.env.NEXT_PUBLIC_API_STATIC_URL}/**`);

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [apiUrl],
  },
};

const withNextIntl = createNextIntlPlugin({
  requestConfig: './src/_shared/i18n/request.ts',
  experimental: {
    createMessagesDeclaration: './messages/en.json',
  },
});

export default withNextIntl(nextConfig);
