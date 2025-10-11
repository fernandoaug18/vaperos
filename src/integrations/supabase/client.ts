import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://hnubweogzsnkbscxpphp.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhudWJ3ZW9nenNua2JzY3hwcGhwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY5MTA2MDcsImV4cCI6MjA3MjQ4NjYwN30._PDr_U0ZuYF_iIjtiRp3MtIZYZbPMjyu1vcDctjWO_s";

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
