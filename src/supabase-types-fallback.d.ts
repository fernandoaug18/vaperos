// Fallback declaration to satisfy TS for the generated Supabase client
// We cannot edit src/integrations/supabase/*, and it imports "./types" as type-only.
// This ambient module makes the build pass without affecting runtime.
declare module "./types" {
  export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json }
    | Json[];

  // Extend as needed if you start using Supabase strongly typed
  export interface Database {
    // placeholder
  }
}
