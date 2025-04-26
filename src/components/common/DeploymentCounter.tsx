"use client";

import React, { useEffect, useState } from "react";
import { getDeploymentCounts } from "@/lib/supabase";
import { BarChart } from "lucide-react";
import Link from "next/link";

export default function DeploymentCounter() {
  const [count, setCount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    async function fetchDeploymentCount() {
      try {
        setIsLoading(true);
        setHasError(false);
        const data = await getDeploymentCounts();
        
        // Handle both array response and error response formats
        if (Array.isArray(data)) {
          const total = data.reduce((sum, chain) => sum + chain.count, 0);
          setCount(total);
        } else {
          // If not an array, this might be an error or empty response
          console.log('Unexpected data format from API:', data);
          setCount(0); // Default to 0 for unexpected data
        }
      } catch (error) {
        console.error("Error fetching deployment count:", error);
        setHasError(true);
        setCount(0); // Default to 0 on error
      } finally {
        setIsLoading(false);
      }
    }

    fetchDeploymentCount();
    
    // Refresh every 30 seconds, but only if we didn't have an error
    const intervalId = setInterval(() => {
      if (!hasError) {
        fetchDeploymentCount();
      }
    }, 30000);
    
    return () => clearInterval(intervalId);
  }, [hasError]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex items-center gap-1 px-2 py-1 rounded-lg border border-indigo-500/20 bg-indigo-600/5">
        <div className="w-3 h-3 rounded-full border-2 border-indigo-400 border-t-transparent animate-spin"></div>
      </div>
    );
  }

  // Hide counter if there's an error or no deployments
  if (hasError || count === 0 || count === null) {
    return null;
  }

  return (
    <Link href="/deployment-stats" className="flex items-center gap-1 px-2 py-1 rounded-lg border border-indigo-500/20 bg-indigo-600/5 hover:bg-indigo-600/10 text-indigo-400 hover:text-indigo-300 transition-colors">
      <BarChart className="w-5 h-5" />
      <span className="text-xs font-medium">{count.toLocaleString()}</span>
    </Link>
  );
} 