export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'https://interview.switcheo.com',
  PRICE_API_URL: 'https://interview.switcheo.com',
  TIMEOUT: Number(import.meta.env.VITE_API_TIMEOUT) || 10000,
  PRICES_STALE_TIME_MS: 300000,
};

export const SWAP_CONFIG = {
  DEFAULT_SLIPPAGE: '0.5%',
  BASE_GAS_FEE_USD: 2.45,
  LP_FEE_PERCENT: 0.003, // 0.3% liquidity provider fee
  ROUTING_NETWORK: 'Deep Forest L2',
  SWAP_DELAY_MS: 2000,
  SUCCESS_TOAST_DURATION_MS: 5000,
};
