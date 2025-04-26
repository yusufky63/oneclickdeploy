import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Create Supabase server client (using environment variables)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(request: Request) {
  try {
    // Parse request body
    const body = await request.json();
    const { chainId, chainName } = body;

    if (!chainId || !chainName) {
      return NextResponse.json({ error: 'Chain ID and name are required' }, { status: 400 });
    }

    try {
      // First check if the record exists
      const { data, error: selectError } = await supabase
        .from('chain_deployments')
        .select('count')
        .eq('chain_id', chainId)
        .maybeSingle(); // Use maybeSingle() to avoid errors if record doesn't exist
      
      // Record doesn't exist or there was an error other than "not found"
      if (selectError && selectError.code !== 'PGRST116') {
        // Check for table not existing error
        if (selectError.code === '42P01') {
          console.error('Table chain_deployments does not exist:', selectError);
          return NextResponse.json({ 
            error: 'Database table does not exist. Please create it in Supabase with: CREATE TABLE chain_deployments (id SERIAL PRIMARY KEY, chain_id INTEGER NOT NULL UNIQUE, chain_name TEXT NOT NULL, count INTEGER DEFAULT 1, created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(), updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW());'
          }, { status: 500 });
        }
        
        console.error('Error checking for existing record:', selectError);
        return NextResponse.json({ error: 'Failed to check existing data' }, { status: 500 });
      }
      
      let error;
      
      if (data) {
        // Record exists, increment count
        const result = await supabase
          .from('chain_deployments')
          .update({ 
            count: data.count + 1,
            chain_name: chainName, // Update name in case it changed
            updated_at: new Date().toISOString()
          })
          .eq('chain_id', chainId);
          
        error = result.error;
      } else {
        // Record doesn't exist, create new one
        const result = await supabase
          .from('chain_deployments')
          .insert([{ 
            chain_id: chainId, 
            chain_name: chainName, 
            count: 1,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }]);
          
        error = result.error;
      }
      
      if (error) {
        // If table doesn't exist, provide a helpful error message
        if (error.code === '42P01') {
          console.error('Table chain_deployments does not exist:', error);
          return NextResponse.json({ 
            error: 'Database table does not exist. Please create it in Supabase with: CREATE TABLE chain_deployments (id SERIAL PRIMARY KEY, chain_id INTEGER NOT NULL UNIQUE, chain_name TEXT NOT NULL, count INTEGER DEFAULT 1, created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(), updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW());'
          }, { status: 500 });
        }
        
        console.error('Error updating deployment count:', error);
        return NextResponse.json({ error: 'Failed to update count' }, { status: 500 });
      }
      
      return NextResponse.json({ success: true });
    } catch (error) {
      console.error('Database operation failed:', error);
      return NextResponse.json({ error: 'Database operation failed' }, { status: 500 });
    }
  } catch (error) {
    console.error('Deployment tracking error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 