import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { MOCK_BALANCES } from '../common/data';

interface BalanceContextType {
  balances: Record<string, number>;
  updateBalance: (token: string, amount: number) => void;
  executeSwap: (fromToken: string, fromAmount: number, toToken: string, toAmount: number, feeInUsd: number, fromPrice: number) => void;
}

const BalanceContext = createContext<BalanceContextType | undefined>(undefined);

export const BalanceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [balances, setBalances] = useState<Record<string, number>>(MOCK_BALANCES);

  const updateBalance = useCallback((token: string, amount: number) => {
    setBalances(prev => ({
      ...prev,
      [token]: amount
    }));
  }, []);

  const executeSwap = useCallback((
    fromToken: string, 
    fromAmount: number, 
    toToken: string, 
    toAmount: number, 
    totalFeeInUsd: number, 
    fromPrice: number
  ) => {
    // Calculate total fee in token quantity
    const feeInToken = fromPrice > 0 ? totalFeeInUsd / fromPrice : 0;

    setBalances(prev => {
      const newBalances = { ...prev };
      
      // Deduct the principal and the total fee from the source
      newBalances[fromToken] = (newBalances[fromToken] || 0) - fromAmount - feeInToken;
      
      // Add the received amount to the destination
      newBalances[toToken] = (newBalances[toToken] || 0) + toAmount;
      
      return newBalances;
    });
  }, []);

  return (
    <BalanceContext.Provider value={{ balances, updateBalance, executeSwap }}>
      {children}
    </BalanceContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useBalances = () => {
  const context = useContext(BalanceContext);
  if (!context) {
    throw new Error('useBalances must be used within a BalanceProvider');
  }
  return context;
};
