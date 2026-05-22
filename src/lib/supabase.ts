/**
 * Increment deployment counter for a specific chain with retry logic
 * @param chainId Blockchain network chain ID
 * @param chainName Blockchain network name
 * @param retries Number of retries (default: 3)
 */
export async function incrementDeploymentCount(
  chainId: number, 
  chainName: string, 
  retries = 3
): Promise<void> {
  try {
    // Use server API route instead of direct Supabase access
    const response = await fetch('/api/deployments/increment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chainId,
        chainName,
      }),
    });

    if (!response.ok) {
      throw new Error(`API responded with ${response.status}: ${response.statusText}`);
    }

    console.log(`Deployment count incremented for chain ${chainName} (${chainId})`);
  } catch (error) {
    console.error('Error tracking deployment:', error);
    
    // Retry logic
    if (retries > 0) {
      console.log(`Retrying... (${retries} attempts left)`);
      // Wait 1 second before retrying
      await new Promise(resolve => setTimeout(resolve, 1000));
      return incrementDeploymentCount(chainId, chainName, retries - 1);
    } else {
      console.error('Failed to track deployment after multiple attempts');
    }
  }
}

/**
 * Get deployment counts for all chains
 * @returns Array of chain deployment records
 */
export async function getDeploymentCounts() {
  try {
    // Use server API route instead of direct Supabase access
    const response = await fetch('/api/deployments/stats');
    if (!response.ok) {
      throw new Error(`API responded with ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data || [];
  } catch (error) {
    console.error('Error fetching deployment counts:', error);
    return [];
  }
} 
