import {createClient} from '@supabase/supabase-js';

const supaBaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supaBaseKey = process.env.REACT_APP_SUPABASE_KEY;

export const supabase = createClient(supaBaseUrl, supaBaseKey);