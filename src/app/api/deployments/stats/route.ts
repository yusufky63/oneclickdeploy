import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

function getSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Supabase is not configured');
  }

  return createClient(supabaseUrl, supabaseKey);
}

export async function GET() {
  try {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from('chain_deployments')
      .select('*')
      .order('count', { ascending: false });
    
    if (error) {
      if (error.code === '42P01') {
        console.log('Stats table does not exist yet, returning empty array');
        return NextResponse.json([]);
      }
      
      console.error('Error fetching deployment stats:', error);
      return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
    }
    
    return NextResponse.json(data || []);
  } catch (error) {
    console.error('Stats API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 
