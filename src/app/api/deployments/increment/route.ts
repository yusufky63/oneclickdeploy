import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { SupportedChains } from '@/types/chains';

function getSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Supabase is not configured');
  }

  return createClient(supabaseUrl, supabaseKey);
}

function getSupportedChain(chainId: unknown) {
  const numericChainId = Number(chainId);

  if (!Number.isInteger(numericChainId)) {
    return null;
  }

  return Object.values(SupportedChains).find(
    (chain) => chain.enabled && chain.chainId === numericChainId
  ) || null;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const chain = getSupportedChain(body?.chainId);

    if (!chain) {
      return NextResponse.json({ error: 'Unsupported chain ID' }, { status: 400 });
    }

    try {
      const supabase = getSupabaseClient();

      const { data, error: selectError } = await supabase
        .from('chain_deployments')
        .select('count')
        .eq('chain_id', chain.chainId)
        .maybeSingle();
      
      if (selectError && selectError.code !== 'PGRST116') {
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
            chain_name: chain.chainName,
            updated_at: new Date().toISOString()
          })
          .eq('chain_id', chain.chainId);
          
        error = result.error;
      } else {
        const result = await supabase
          .from('chain_deployments')
          .insert([{ 
            chain_id: chain.chainId,
            chain_name: chain.chainName,
            count: 1,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }]);
          
        error = result.error;
      }
      
      if (error) {
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
