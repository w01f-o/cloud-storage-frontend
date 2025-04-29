'use server';

import { redirect } from 'next/navigation';

export const navigate = async (pathname: string) => {
  redirect(pathname);
};
