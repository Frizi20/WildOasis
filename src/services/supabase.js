import { createClient } from '@supabase/supabase-js'




export const supabaseUrl = 'https://naecfiinlnyryjvauoki.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5hZWNmaWlubG55cnlqdmF1b2tpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTIwOTM0NjQsImV4cCI6MjAwNzY2OTQ2NH0.jcONwy-fBUMHnjo-t0ezfPSFYTUJM9ofZGLCZEmotSg'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase