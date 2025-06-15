import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import type { Database } from './supabase';

// Server-side Supabase client (for use in server components and API routes)
export const createSupabaseServerClient = () => createServerComponentClient<Database>({ cookies });

// Helper function to get the current user on the server side
export async function getServerUser() {
  const supabase = createSupabaseServerClient();
  
  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error) {
      console.error('Error getting server user:', error);
      return null;
    }

    return user;
  } catch (error) {
    console.error('Unexpected error getting server user:', error);
    return null;
  }
}

// Helper function to get the current session on the server side
export async function getServerSession() {
  const supabase = createSupabaseServerClient();
  
  try {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error) {
      console.error('Error getting server session:', error);
      return null;
    }

    return session;
  } catch (error) {
    console.error('Unexpected error getting server session:', error);
    return null;
  }
}
