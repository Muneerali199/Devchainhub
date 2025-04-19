import { SupabaseClient } from '@/lib/supabase'

declare global {
  var supabase: SupabaseClient
}