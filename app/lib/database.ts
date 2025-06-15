import { createSupabaseClient, Database } from './supabase';
import { createSupabaseServerClient } from './supabase-server';

// Client-side database operations
export class DatabaseClient {
  private supabase = createSupabaseClient();

  // Profile operations
  async getProfile(userId: string) {
    const { data, error } = await this.supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error fetching profile:', error);
      return null;
    }

    return data;
  }

  async updateProfile(userId: string, updates: Database['public']['Tables']['profiles']['Update']) {
    const { data, error } = await this.supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();

    if (error) {
      console.error('Error updating profile:', error);
      throw error;
    }

    return data;
  }

  async createProfile(profile: Database['public']['Tables']['profiles']['Insert']) {
    const { data, error } = await this.supabase
      .from('profiles')
      .insert(profile)
      .select()
      .single();

    if (error) {
      console.error('Error creating profile:', error);
      throw error;
    }

    return data;
  }

  // You can add more database operations here as needed
  // For example: legal documents, user preferences, search history, etc.
}

// Server-side database operations
export class DatabaseServer {
  private supabase = createSupabaseServerClient();

  async getProfile(userId: string) {
    const { data, error } = await this.supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error fetching profile:', error);
      return null;
    }

    return data;
  }

  // Add more server-side operations as needed
}

// Export instances for easy use
export const dbClient = new DatabaseClient();
export const dbServer = new DatabaseServer();

// Helper functions
export const handleSupabaseError = (error: any) => {
  console.error('Supabase error:', error);
  
  if (error.code === 'PGRST116') {
    return 'Record not found';
  }
  
  if (error.code === '23505') {
    return 'This record already exists';
  }
  
  return error.message || 'An unexpected error occurred';
};
