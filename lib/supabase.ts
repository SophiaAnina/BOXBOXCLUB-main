import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://brkwvdhfjzmnedrbdila.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJya3d2ZGhmanptbmVkcmJkaWxhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY1NDk5MzAsImV4cCI6MjA2MjEyNTkzMH0.MCAYQOJ8enwXIeOEs9uezIie2F2HzxrD_hCiTv0d0w0'

console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Anon Key:', supabaseAnonKey);

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})

async function getUsername() {
  try {
    // Get the authenticated user's ID
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError) throw authError;
    if (!user) throw new Error('User not authenticated');

    // Fetch the username from the profiles table
    const { data, error: fetchError } = await supabase
      .from('profiles')
      .select('username')
      .eq('id', user.id)
      .single();

    if (fetchError) throw fetchError;

    return data?.username || null;
  } catch (error) {
    console.error('Error fetching username:', error);
    return null;
  }
}