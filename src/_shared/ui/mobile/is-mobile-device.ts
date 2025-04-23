import { UAParser } from 'ua-parser-js';

export const isMobileDevice = async (): Promise<boolean> => {
  if (typeof process === 'undefined') {
    throw new Error(
      '[Server method] you are importing a server-only module outside of server'
    );
  }

  const { headers } = await import('next/headers');
  const { get } = await headers();
  const userAgent = get('user-agent');

  const device = new UAParser(userAgent || '').getDevice();

  return device.type === 'mobile';
};
