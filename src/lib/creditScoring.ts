interface FarmerData {
  // Identity Data (S1)
  ninVerified: boolean;
  bvnVerified: boolean;
  hasCollateral: boolean;
  cooperativeMember: boolean;
  
  // Farm Assets (S2)
  hectares: number;
  cropTypes: string[];
  livestockCount: number;
  equipmentValue: number;
  
  // Historical Performance (S3)
  yieldHistory: number[]; // kg/hectare over seasons
  repaymentHistory: number[]; // 0-100 percentage
  cooperativeYieldAvg: number;
  
  // Community Trust (S4)
  cooperativeRating: number; // 0-100
  peerRecommendations: number;
  leadershipRoles: number;
  trainingCompleted: number;
  
  // AI-Projected Capacity (S5)
  projectedRevenue: number;
  loanAmount: number;
  marketPrices: number[];
  weatherRisk: number; // 0-100
  
  // Location context
  location: string;
  state: string;
}

interface CreditScoreResult {
  score: number; // 0-100
  riskBand: 'Green' | 'Yellow' | 'Orange' | 'Red';
  subscores: {
    identity: number;
    assets: number;
    history: number;
    trust: number;
    capacity: number;
  };
  explanation: {
    [key: string]: string;
  };
  recommendedLoanAmount: number;
  interestRate: number;
}

// Normalization utilities
const normalizeToScale = (value: number, min: number, max: number): number => {
  return Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100));
};

const calculateWeightedAverage = (values: number[], weights: number[]): number => {
  const weightedSum = values.reduce((sum, value, index) => sum + (value * weights[index]), 0);
  const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
  return weightedSum / totalWeight;
};

// Subscore calculations
const calculateIdentityScore = (data: FarmerData): { score: number; explanation: string } => {
  let score = 0;
  let explanation = "";
  
  if (data.ninVerified) {
    score += 5;
    explanation += "NIN verified (+5), ";
  } else {
    explanation += "NIN not verified (-5), ";
  }
  
  if (data.bvnVerified) {
    score += 5;
    explanation += "BVN verified (+5), ";
  } else {
    explanation += "BVN not verified (-5), ";
  }
  
  if (data.hasCollateral) {
    score += 5;
    explanation += "Collateral available (+5), ";
  } else {
    explanation += "No collateral (-5), ";
  }
  
  if (data.cooperativeMember) {
    score += 5;
    explanation += "Cooperative member (+5)";
  } else {
    explanation += "Not a cooperative member (-15)";
  }
  
  // Scale to 20 points max (Identity component = 20% of total 100)
  const scaledScore = Math.max(0, Math.min(20, score));
  return { score: scaledScore, explanation };
};

const calculateAssetsScore = (data: FarmerData): { score: number; explanation: string } => {
  // Farm size component (40% of assets = 10 points)
  const hectareScore = normalizeToScale(data.hectares, 0.5, 5) * 0.10;
  
  // Diversification index (30% of assets = 7.5 points)
  const diversificationScore = Math.min(7.5, data.cropTypes.length * 2.5);
  
  // Livestock component (20% of assets = 5 points)
  const livestockScore = normalizeToScale(data.livestockCount, 0, 50) * 0.05;
  
  // Equipment value (10% of assets = 2.5 points)
  const equipmentScore = normalizeToScale(data.equipmentValue, 0, 2000000) * 0.025;
  
  const totalScore = hectareScore + diversificationScore + livestockScore + equipmentScore;
  
  const explanation = `Farm size: ${data.hectares}ha (${hectareScore.toFixed(1)}), ` +
    `Crop diversity: ${data.cropTypes.length} types (${diversificationScore.toFixed(1)}), ` +
    `Livestock: ${data.livestockCount} (${livestockScore.toFixed(1)})`;
  
  // Return score capped at 25 points (Assets = 25% of total 100)
  return { score: Math.round(Math.min(25, totalScore)), explanation };
};

const calculateHistoryScore = (data: FarmerData): { score: number; explanation: string } => {
  if (data.yieldHistory.length === 0) {
    // New farmer - use base score for 25% component
    const score = 12.5; // Base score for new farmers (50% of 25 points)
    return { score, explanation: "New farmer - using base score (12.5/25)" };
  }
  
  // Yield performance vs cooperative average (15 points max)
  const avgYield = data.yieldHistory.reduce((a, b) => a + b, 0) / data.yieldHistory.length;
  const yieldRatio = avgYield / data.cooperativeYieldAvg;
  const yieldScore = normalizeToScale(yieldRatio, 0.7, 1.3) * 0.15; // 70%-130% range
  
  // Repayment history (10 points max)
  const avgRepayment = data.repaymentHistory.reduce((a, b) => a + b, 0) / data.repaymentHistory.length;
  const repaymentScore = (avgRepayment / 100) * 10;
  
  const totalScore = yieldScore + repaymentScore;
  
  const explanation = `Yield vs cooperative avg: ${(yieldRatio * 100).toFixed(0)}% (${yieldScore.toFixed(0)}), ` +
    `Repayment rate: ${avgRepayment.toFixed(0)}% (${repaymentScore.toFixed(0)})`;
  
  // Scale to 25 points max (History component = 25% of total 100)
  return { score: Math.round(Math.min(25, totalScore)), explanation };
};

const calculateTrustScore = (data: FarmerData): { score: number; explanation: string } => {
  // Cooperative rating (60% of trust = 9 points)
  const cooperativeScore = (data.cooperativeRating / 100) * 9;
  
  // Peer recommendations (25% of trust = 3.75 points)
  const peerScore = normalizeToScale(data.peerRecommendations, 0, 10) * 0.0375;
  
  // Leadership roles (10% of trust = 1.5 points)
  const leadershipScore = normalizeToScale(data.leadershipRoles, 0, 5) * 0.015;
  
  // Training completed (5% of trust = 0.75 points)
  const trainingScore = normalizeToScale(data.trainingCompleted, 0, 10) * 0.0075;
  
  const totalScore = cooperativeScore + peerScore + leadershipScore + trainingScore;
  
  const explanation = `Cooperative rating: ${data.cooperativeRating}/100 (${cooperativeScore.toFixed(1)}), ` +
    `Peer recommendations: ${data.peerRecommendations} (${peerScore.toFixed(1)})`;
  
  // Return score capped at 15 points (Trust = 15% of total 100)
  return { score: Math.round(Math.min(15, totalScore)), explanation };
};

const calculateCapacityScore = (data: FarmerData): { score: number; explanation: string } => {
  // Loan to revenue ratio (lower is better) - 50% of capacity = 7.5 points
  const loanRatio = data.loanAmount / data.projectedRevenue;
  const ratioScore = normalizeToScale(1 - loanRatio, 0, 0.8) * 7.5; // Max 50% of revenue
  
  // Market price stability - 30% of capacity = 4.5 points
  const priceVariability = data.marketPrices.length > 1 
    ? Math.sqrt(data.marketPrices.reduce((acc, price, i, arr) => {
        const mean = arr.reduce((sum, p) => sum + p, 0) / arr.length;
        return acc + Math.pow(price - mean, 2);
      }, 0) / data.marketPrices.length) / (data.marketPrices.reduce((a, b) => a + b, 0) / data.marketPrices.length)
    : 0;
  
  const stabilityScore = normalizeToScale(1 - priceVariability, 0.7, 1) * 4.5;
  
  // Weather risk (inverse) - 20% of capacity = 3 points
  const weatherScore = ((100 - data.weatherRisk) / 100) * 3;
  
  const totalScore = ratioScore + stabilityScore + weatherScore;
  
  const explanation = `Loan/revenue ratio: ${(loanRatio * 100).toFixed(0)}% (${ratioScore.toFixed(1)}), ` +
    `Weather risk: ${data.weatherRisk}% (${weatherScore.toFixed(1)})`;
  
  // Return score capped at 15 points (Capacity = 15% of total 100)
  return { score: Math.round(Math.min(15, totalScore)), explanation };
};

// Main credit scoring function
export const calculateFarmerCreditScore = (data: FarmerData): CreditScoreResult => {
  // Calculate subscores
  const identity = calculateIdentityScore(data);
  const assets = calculateAssetsScore(data);
  const history = calculateHistoryScore(data);
  const trust = calculateTrustScore(data);
  const capacity = calculateCapacityScore(data);
  
  // Direct sum since each component is already scaled to its max points
  // Identity (20 pts) + Assets (25 pts) + History (25 pts) + Trust (15 pts) + Capacity (15 pts) = 100 pts total
  const finalScore = identity.score + assets.score + history.score + trust.score + capacity.score;
  
  // Determine risk band
  let riskBand: 'Green' | 'Yellow' | 'Orange' | 'Red';
  let interestRate: number;
  let loanMultiplier: number;
  
  if (finalScore >= 75) {
    riskBand = 'Green';
    interestRate = 12; // 12% annual
    loanMultiplier = 1.0;
  } else if (finalScore >= 55) {
    riskBand = 'Yellow';
    interestRate = 15; // 15% annual
    loanMultiplier = 0.8;
  } else if (finalScore >= 35) {
    riskBand = 'Orange';
    interestRate = 18; // 18% annual
    loanMultiplier = 0.6;
  } else {
    riskBand = 'Red';
    interestRate = 25; // 25% annual or recommend training
    loanMultiplier = 0.3;
  }
  
  const recommendedLoanAmount = Math.round(data.loanAmount * loanMultiplier);
  
  return {
    score: Math.round(finalScore),
    riskBand,
    subscores: {
      identity: Math.round(identity.score),
      assets: Math.round(assets.score),
      history: Math.round(history.score),
      trust: Math.round(trust.score),
      capacity: Math.round(capacity.score)
    },
    explanation: {
      S1_Identity: identity.explanation,
      S2_Assets: assets.explanation,
      S3_History: history.explanation,
      S4_Trust: trust.explanation,
      S5_Capacity: capacity.explanation
    },
    recommendedLoanAmount,
    interestRate
  };
};

// Example usage for testing
export const exampleFarmerData: FarmerData = {
  ninVerified: true,
  bvnVerified: true,
  hasCollateral: true,
  cooperativeMember: true,
  hectares: 2.5,
  cropTypes: ['Maize', 'Soybeans'],
  livestockCount: 15,
  equipmentValue: 800000,
  yieldHistory: [2800, 3200, 2950], // kg/hectare
  repaymentHistory: [95, 88, 92], // percentage
  cooperativeYieldAvg: 3000,
  cooperativeRating: 85,
  peerRecommendations: 7,
  leadershipRoles: 2,
  trainingCompleted: 5,
  projectedRevenue: 1200000,
  loanAmount: 400000,
  marketPrices: [180, 195, 175, 188], // per kg
  weatherRisk: 25,
  location: "Funtua",
  state: "Katsina"
};
