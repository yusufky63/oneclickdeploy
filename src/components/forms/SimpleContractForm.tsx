"use client";

interface SimpleFormProps {
  onDeploy: () => void;
}

export default function SimpleContractForm({ }: SimpleFormProps) {
  return (
    <div>
      <h2 className="text-lg font-medium mb-1 text-gray-300">
        Simple Contract
      </h2>
      <p className="text-sm text-gray-300/80 mb-4">
        Deploy a basic contract without parameters
      </p>
    </div>
  );
} 