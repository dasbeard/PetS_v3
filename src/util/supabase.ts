import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/database.types';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '';
// const supabaseUrl = 'https://lvlalnssokxzjrvyebqu.supabase.co';
// const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx2bGFsbnNzb2t4empydnllYnF1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc0MzA5MTMsImV4cCI6MjAyMzAwNjkxM30.X8Qkny5JxbiEU5e6U23Fz_T-rpm9tyZXYWKJpONH8JI';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});