
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://tkbiywqauihzpwebewma.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRrYml5d3FhdWloenB3ZWJld21hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAyMDI5NjIsImV4cCI6MjA1NTc3ODk2Mn0.PAQ6ojB3UMQwiswR0EPKD2YmnyjVA7rnylv8YszHPRI";

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
