export const APP_MESSAGES = {
  SWAP: {
    TITLE: 'Swap Assets',
    BUTTON_CONFIRM: 'CONFIRM SWAP',
    BUTTON_FINALIZING: 'Finalizing...',
    ERROR_SAME_ASSET: 'Select different tokens',
    ERROR_NO_AMOUNT: 'Enter an amount',
    ERROR_INSUFFICIENT_BALANCE: (asset: string) => `Insufficient ${asset} for swap + fee`,
    SLIPPAGE_LABEL: (value: string) => `${value} Slippage`,
    ESTIMATED_FEE: 'Estimated Fee',
    ROUTING: 'Routing',
    TRANSACTION_DETAILS: 'Transaction Details',
  },
  TOKEN_MODAL: {
    TITLE: 'Select Asset',
    SEARCH_PLACEHOLDER: 'Search assets or address',
    EMPTY_STATE: (search: string) => `No assets found for "${search}"`,
    INTEGRATED_NETWORK: 'Integrated Network',
    BALANCE_LABEL: 'Balance',
  },
  HEADER: {
    WELCOME: 'Welcome back, 99Tech Customer!',
  },
  LOADING: {
    SYNCING: 'Syncing Wallet',
  },
  SIDEBAR: {
    DASHBOARD: 'Dashboard',
    SWAP: 'Swap',
    HISTORY: 'History',
    SETTINGS: 'Settings',
    TOTAL_BALANCE: 'Total Balance',
  }
};
