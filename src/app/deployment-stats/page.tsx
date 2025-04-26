"use client";

import React, { useEffect, useState } from "react";
import { getDeploymentCounts } from "@/lib/supabase";
import Link from "next/link";
import { ArrowLeft, Download, AlertTriangle } from "lucide-react";
import GridBackground from "@/components/common/Grid-Background";

interface DeploymentStat {
  chain_id: number;
  chain_name: string;
  count: number;
  created_at?: string;
  updated_at?: string;
}

export default function DeploymentStatsPage() {
  const [stats, setStats] = useState<DeploymentStat[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalDeployments, setTotalDeployments] = useState(0);

  useEffect(() => {
    async function fetchDeploymentStats() {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getDeploymentCounts();
        
        // Check if data is an array (success case)
        if (Array.isArray(data)) {
          setStats(data);
          
          // Calculate total deployments
          const total = data.reduce((sum, chain) => sum + chain.count, 0);
          setTotalDeployments(total);
        } else {
          // If not an array, this might be an error object
          console.log('Unexpected data format from API:', data);
          setError('Received unexpected data format from API');
          setStats([]);
          setTotalDeployments(0);
        }
      } catch (error) {
        console.error("Error fetching deployment stats:", error);
        setError('Failed to fetch deployment statistics');
        setStats([]);
        setTotalDeployments(0);
      } finally {
        setIsLoading(false);
      }
    }

    fetchDeploymentStats();
  }, []);

  const downloadStats = () => {
    if (stats.length === 0) return;
    
    const csvContent = [
      ["Chain ID", "Chain Name", "Deployments", "First Deployment", "Last Updated"],
      ...stats.map(stat => [
        stat.chain_id.toString(),
        stat.chain_name,
        stat.count.toString(),
        stat.created_at ? new Date(stat.created_at).toLocaleString() : "N/A",
        stat.updated_at ? new Date(stat.updated_at).toLocaleString() : "N/A"
      ])
    ].map(row => row.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `deployment-stats-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen text-gray-100 relative overflow-hidden bg-gradient-to-br from-indigo-950 to-black">
      {/* Background Elements */}
      <div className="fixed inset-0 opacity-40 pointer-events-none z-0">
        <GridBackground theme="dark" />
      </div>
      <div className="fixed top-[-50%] left-[-10%] w-[80%] h-[80%] rounded-full bg-indigo-500/10 blur-3xl pointer-events-none z-0"></div>
      <div className="fixed bottom-[-50%] right-[-20%] w-[80%] h-[80%] rounded-full bg-indigo-600/5 blur-3xl pointer-events-none z-0"></div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-8">
        <div className="mb-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </Link>
          </div>
          <button 
            onClick={downloadStats}
            disabled={stats.length === 0 || isLoading}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-indigo-200 transition-colors ${
              stats.length === 0 || isLoading 
                ? "bg-indigo-600/10 cursor-not-allowed" 
                : "bg-indigo-600/30 hover:bg-indigo-600/40"
            }`}
          >
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
        </div>

        <h1 className="text-3xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-white to-indigo-300">Deployment Statistics</h1>
        <p className="text-indigo-300 mb-6">Analytics for all contract deployments across all chains</p>

        {isLoading ? (
          <div className="p-8 backdrop-blur-md bg-indigo-900/20 rounded-lg border border-indigo-500/30 flex justify-center">
            <div className="w-8 h-8 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <div className="p-8 backdrop-blur-md bg-indigo-900/20 rounded-lg border border-red-500/30 flex flex-col items-center gap-4">
            <AlertTriangle className="w-12 h-12 text-red-400" />
            <div className="text-center">
              <p className="text-lg font-semibold text-red-300 mb-1">Error Loading Data</p>
              <p className="text-indigo-300 text-sm">{error}</p>
              <p className="text-indigo-400 text-sm mt-4">The Supabase database table may not be set up yet.<br />Try deploying a contract first to initialize the tracking system.</p>
            </div>
          </div>
        ) : stats.length === 0 ? (
          <div className="p-8 backdrop-blur-md bg-indigo-900/20 rounded-lg border border-indigo-500/30 flex flex-col items-center gap-4">
            <div className="text-center">
              <p className="text-lg font-semibold text-indigo-200 mb-1">No Deployment Data Yet</p>
              <p className="text-indigo-300 text-sm">Be the first to deploy a contract and see your stats here!</p>
            </div>
            <Link href="/" className="mt-2 px-4 py-2 bg-indigo-600/30 hover:bg-indigo-600/40 rounded-lg text-indigo-200 transition-colors">
              Deploy a Contract
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="backdrop-blur-md bg-indigo-900/20 p-6 rounded-lg border border-indigo-500/30">
                <p className="text-indigo-300 text-sm mb-1">Total Deployments</p>
                <p className="text-4xl font-bold">{totalDeployments.toLocaleString()}</p>
              </div>
              <div className="backdrop-blur-md bg-indigo-900/20 p-6 rounded-lg border border-indigo-500/30">
                <p className="text-indigo-300 text-sm mb-1">Networks</p>
                <p className="text-4xl font-bold">{stats.length.toLocaleString()}</p>
              </div>
              <div className="backdrop-blur-md bg-indigo-900/20 p-6 rounded-lg border border-indigo-500/30">
                <p className="text-indigo-300 text-sm mb-1">Most Used Chain</p>
                <p className="text-4xl font-bold">
                  {stats.length > 0 ? stats[0].chain_name : "N/A"}
                </p>
              </div>
            </div>

            <div className="backdrop-blur-md bg-indigo-900/20 rounded-lg overflow-hidden border border-indigo-500/30">
              <div className="p-4 border-b border-indigo-700/30">
                <h2 className="text-xl font-semibold">Chain Distribution</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-indigo-800/20">
                      <th className="px-4 py-3 text-left text-sm font-medium text-indigo-200">Chain</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-indigo-200">Chain ID</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-indigo-200">Deployments</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-indigo-200">Percentage</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-indigo-200">First Deployment</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-indigo-200">Last Update</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-4 py-8 text-center text-indigo-300">
                          No deployment data available yet
                        </td>
                      </tr>
                    ) : (
                      stats.map((stat, index) => (
                        <tr key={stat.chain_id} className={index % 2 === 0 ? "bg-indigo-800/10" : ""}>
                          <td className="px-4 py-3 text-sm text-indigo-100">{stat.chain_name}</td>
                          <td className="px-4 py-3 text-sm text-indigo-100">{stat.chain_id}</td>
                          <td className="px-4 py-3 text-sm font-medium text-white">{stat.count.toLocaleString()}</td>
                          <td className="px-4 py-3 text-sm text-indigo-100">
                            {((stat.count / totalDeployments) * 100).toFixed(1)}%
                          </td>
                          <td className="px-4 py-3 text-sm text-indigo-100">
                            {stat.created_at ? new Date(stat.created_at).toLocaleString() : "N/A"}
                          </td>
                          <td className="px-4 py-3 text-sm text-indigo-100">
                            {stat.updated_at ? new Date(stat.updated_at).toLocaleString() : "N/A"}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 