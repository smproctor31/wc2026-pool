import { createClient } from '@supabase/supabase-js'

// Replace these with your actual Supabase project values
// You will get these from supabase.com after creating your project
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || ''
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

export const isConfigured = () => Boolean(SUPABASE_URL && SUPABASE_ANON_KEY)
