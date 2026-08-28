export type TransactionState = 
  | 'IDLE'
  | 'FUNDING'
  | 'TASK_CREATION'
  | 'DISCOVERY'
  | 'COMPETITION'
  | 'FINANCIAL_ASSESSMENT'
  | 'ESCROW_LOCKED'
  | 'COLLATERAL_LOCKED'
  | 'EXECUTING'
  | 'SUBMITTED'
  | 'JURY_COMMITTING'
  | 'JURY_REVEALING'
  | 'CONSENSUS'
  | 'SETTLEMENT'
  | 'COMPLETED'
  | 'VERIFICATION_FAILED'
  | 'REFUNDED';

export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH';

export interface Agent {
  id: string;
  name: string;
  avatar: string;
  capabilities: string[];
  reputation: number; // percentage e.g. 98.0
  riskScore: RiskLevel;
  walletBalance: number;
  collateralBalance: number;
  tasksCompleted: number;
  successfulTasks: number;
  averageQuality: number;
  requiredCollateralRatio: number; // e.g. 10 for $10
  role: 'BUYER' | 'WORKER' | 'EVALUATOR';
}

export interface Task {
  id: string;
  title: string;
  description: string;
  budget: number;
  qualityThreshold: number; // e.g. 80
  deadlineSeconds: number;
  status: TransactionState;
  buyerAgentId: string;
  selectedWorkerId?: string;
  createdAt: string;
}

export interface Bid {
  id: string;
  taskId: string;
  agentId: string;
  agentName: string;
  price: number;
  estimatedQuality: number;
  estimatedTime: number; // in seconds
  risk: RiskLevel;
  scores: {
    quality: number;
    price: number;
    reliability: number;
    speed: number;
    risk: number;
  };
  finalScore: number;
}

export interface FinancialAssessment {
  taskValue: number;
  workerReputation: number;
  risk: RiskLevel;
  workerReliability: number;
  requiredCollateral: number;
  escrowAmount: number;
  verificationLevel: string;
  settlementCondition: string;
  isApproved: boolean;
}

export interface JuryEvaluator {
  id: string;
  name: string;
  avatar: string;
  reputation: number;
  commitHash: string;
  score: number; // percentage e.g. 92
  reasoning: string;
  committed: boolean;
  revealed: boolean;
}

export interface SettlementBreakdown {
  taskId: string;
  workerPayment: number;
  workerCollateralReturned: number;
  evaluatorPoolReward: number;
  protocolFee: number;
  buyerRefund: number;
  workerCollateralSlashed: number;
  consensusScore: number;
  threshold: number;
  isSuccess: boolean;
}

export interface TransactionRecord {
  id: string;
  taskId: string;
  taskTitle: string;
  buyerAgentId: string;
  buyerAgentName: string;
  workerAgentId: string;
  workerAgentName: string;
  escrowAmount: number;
  workerReward: number;
  evaluatorReward: number;
  protocolFee: number;
  collateralStatus: string;
  consensusScore: number;
  threshold: number;
  status: 'SETTLED' | 'REFUNDED' | 'SLASHED';
  timestamp: string;
}

export interface ReputationEvent {
  id: string;
  agentId: string;
  agentName: string;
  taskId: string;
  oldScore: number;
  newScore: number;
  reason: string;
  timestamp: string;
}

export interface FlowState {
  currentState: TransactionState;
  isMaliciousScenario: boolean;
  autoPlay: boolean;
  autoPlaySpeed: number; // ms per step
  agentA: Agent;
  task: Task;
  bids: Bid[];
  selectedBid?: Bid;
  selectedWorker?: Agent;
  assessment?: FinancialAssessment;
  executionProgress: number;
  executionOutput: string;
  evaluators: JuryEvaluator[];
  consensusScore?: number;
  settlement?: SettlementBreakdown;
  ledger: TransactionRecord[];
  reputationLogs: ReputationEvent[];
  allAgents: Agent[];
}
