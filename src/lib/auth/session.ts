
"use server";
// This file is now deprecated and will be removed.
// All logic has been moved to the client-side data fetching and auth hooks.
// We are keeping it to prevent breaking imports, but it should not be used.

import type { User } from '@/types';

export async function getCurrentUser(): Promise<User | null> {
  return null;
}
