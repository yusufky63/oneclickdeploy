"use client";

import React, { useEffect, useState, useCallback } from "react";
import { getDeploymentCounts } from "@/lib/supabase";
import { RefreshCw } from "lucide-react";

interface DeploymentStat {
  chain_id: number;
  chain_name: string;
  count: number;
}

export default function DeploymentStats() {
  const [stats, setStats] = useState<DeploymentStat[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalDeployments, setTotalDeployments] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchDeploymentStats = useCallback(async () => {
    setIsRefreshing(true);
    try {
      const data = await getDeploymentCounts();
      setStats(data);
      
      // Calculate total deployments
      const total = data.reduce((sum: number, chain: DeploymentStat) => sum + chain.count, 0);
      setTotalDeployments(total);
      
      // Update last updated timestamp
      setLastUpdated(new Date());
    } catch (error) {
      console.error("Error fetching deployment stats:", error);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchDeploymentStats();
    
    // Set up auto-refresh every 5 minutes
    const intervalId = setInterval(() => {
      fetchDeploymentStats();
    }, 5 * 60 * 1000);
    
    return () => clearInterval(intervalId);
  }, [fetchDeploymentStats]);

  if (isLoading) {
    return (
      <div className="p-4 backdrop-blur-md bg-indigo-600/10 border border-indigo-500/30 rounded-lg">
        <div className="flex justify-center items-center h-24">
          <div className="w-6 h-6 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 backdrop-blur-md bg-indigo-600/10 border border-indigo-500/30 rounded-lg">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold text-indigo-200">Global Deployment Stats</h3>
        <button 
          onClick={fetchDeploymentStats}
          disabled={isRefreshing}
          className="p-1.5 rounded-full bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 transition-colors disabled:opacity-50"
          title="Refresh stats"
        >
          <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
        </button>
      </div>
      
      {lastUpdated && (
        <p className="text-xs text-indigo-400/70 mb-3">
          Last updated: {lastUpdated.toLocaleTimeString()}
        </p>
      )}
      
      <div className="bg-indigo-900/30 rounded-md p-3 mb-4">
        <div className="text-center">
          <p className="text-sm text-indigo-300">Total Deployments</p>
          <p className="text-2xl font-bold text-white">{totalDeployments.toLocaleString()}</p>
        </div>
      </div>
      
      <div className="space-y-3">
        <p className="text-sm font-medium text-indigo-300">Top Chains</p>
        
        {stats.length === 0 ? (
          <p className="text-sm text-indigo-400/70 text-center py-3">No deployments recorded yet</p>
        ) : (
          <div className="space-y-2">
            {stats.slice(0, 5).map((stat) => (
              <div key={stat.chain_id} className="flex justify-between items-center p-2 bg-indigo-800/20 rounded">
                <span className="text-sm text-indigo-200">{stat.chain_name}</span>
                <span className="text-sm font-medium text-white">{stat.count.toLocaleString()}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 