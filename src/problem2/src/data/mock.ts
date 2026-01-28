export const MOCK_BALANCES: Record<string, number> = {
  'ETH': 1.245,
  'USDC': 2840.40,
  'WBTC': 0.045,
  'USDT': 1500.00,
  'SWTH': 50000.00,
  'ZIL': 12500.0,
  'ATOM': 45.2,
  'STATOM': 12.5,
  'STEVMOS': 8.0,
  'LUNA': 0.0,
};

export const SWAP_CONFIG = {
  DEFAULT_SLIPPAGE: '0.5%',
  BASE_GAS_FEE_USD: 2.45,
  LP_FEE_PERCENT: 0.003, // 0.3% liquidity provider fee
  ROUTING_NETWORK: 'Deep Forest L2',
  SWAP_DELAY_MS: 2000,
  SUCCESS_TOAST_DURATION_MS: 5000,
};

export const DASHBOARD_STATS = {
  TOTAL_BALANCE: '$12,450.80',
  DAILY_CHANGE: '+2.4%',
};
