// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://tkbiywqauihzpwebewma.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRrYml5d3FhdWloenB3ZWJld21hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAyMDI5NjIsImV4cCI6MjA1NTc3ODk2Mn0.PAQ6ojB3UMQwiswR0EPKD2YmnyjVA7rnylv8YszHPRI";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);