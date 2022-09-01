import { createClient } from '@supabase/supabase-js';
import { store } from "./store/store"

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

supabase.auth.onAuthStateChange((_, session) => {
    if(session != null)
      store.user = session.user
});

export {supabase};