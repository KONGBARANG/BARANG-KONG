import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'បញ្ចូល_PROJECT_URL_របស់អ្នកនៅទីនេះ'
const supabaseKey = 'បញ្ចូល_API_KEY_របស់អ្នកនៅទីនេះ'

export const supabase = createClient(supabaseUrl, supabaseKey)