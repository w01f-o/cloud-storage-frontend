export const getRefreshToken = async (): Promise<string | null> => {
  const { cookies } = await import('next/headers');
  const cookieManager = await cookies();

  return cookieManager.get('refreshToken')?.value ?? null;
};
