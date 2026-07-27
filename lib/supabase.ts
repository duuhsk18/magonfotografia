import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

/**
 * Supabase client for browser/client-side usage.
 * Uses anon key with RLS policies.
 * Uses placeholder keys when env vars are not set (safe for build-time).
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

/**
 * Check if Supabase is configured.
 * Call this at runtime before making requests.
 */
export function isSupabaseConfigured(): boolean {
  return (
    process.env.NEXT_PUBLIC_SUPABASE_URL !== undefined &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY !== undefined
  )
}
