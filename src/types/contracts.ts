import { Chain } from './chains';

export interface DeploymentState {
  selectedChain: Chain | null;
  isDeploying: boolean;
  txHash: string | null;
  contractAddress: string | null;
  error: string | null;
}

export interface BaseContractTabProps {
  onDeploy: (type: string) => void;
}

export interface NetworkSelectorProps {
  selectedChain: Chain | null;
  onChainSelect: (chain: Chain | null) => void;
  requiredFeature?: string;
}

export interface ContractFormProps extends BaseContractTabProps {
  deploymentState: DeploymentState;
} 