import { useState, useMemo } from 'react';
import { usePrices } from '../../api/hooks/prices.hook';
import { formatCurrency, formatTokenAmount } from '../../utils/formatters';
import { SWAP_CONFIG } from '../../common/config';
import { APP_MESSAGES } from '../../common/messages/text.messages';
import { useBalances } from '../../context/BalanceContext';

export const useAppLogic = () => {
  const { prices, loading, error } = usePrices();
  const { balances, executeSwap } = useBalances();


  const [fromAsset, setFromAsset] = useState<string>('ETH');
  const [toAsset, setToAsset] = useState<string>('USDC');
  const [fromAmount, setFromAmount] = useState<string>('');
  
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [activeSide, setActiveSide] = useState<'from' | 'to'>('from');

  const [isSwapping, setIsSwapping] = useState<boolean>(false);
  const [swapStatus, setSwapStatus] = useState<'success' | 'error' | null>(null);
  
  // Sorted list of available token names for the selection modal
  const tokenList = useMemo(() => prices.map(p => p.currency).sort(), [prices]);
  
  // Current market prices for the selected pair
  const fromPrice = useMemo(() => prices.find(p => p.currency === fromAsset)?.price || 0, [prices, fromAsset]);
  const toPrice = useMemo(() => prices.find(p => p.currency === toAsset)?.price || 0, [prices, toAsset]);

  // User's current wallet balance for the source asset
  const fromBalance = useMemo(() => balances[fromAsset] || 0, [balances, fromAsset]);

  // Relative value between the two selected assets
  const exchangeRate = useMemo(() => {
    if (!fromPrice || !toPrice) return 0;
    return fromPrice / toPrice;
  }, [fromPrice, toPrice]);

  // Pure numeric value of the destination amount (used for math, not display)
  const toAmountNumeric = useMemo(() => {
    const amountVal = parseFloat(fromAmount);
    if (isNaN(amountVal)) return 0;
    return amountVal * exchangeRate;
  }, [fromAmount, exchangeRate]);

  // Helper to get raw numeric input for calculations
  const fromAmountNumeric = useMemo(() => {
    const val = parseFloat(fromAmount);
    return isNaN(val) ? 0 : val;
  }, [fromAmount]);

  // Calculates the dynamic fee (Base Gas + Percentage of Value)
  const totalFeeUsd = useMemo(() => {
    if (fromAmountNumeric <= 0) return SWAP_CONFIG.BASE_GAS_FEE_USD;
    const valueSwapUsd = fromAmountNumeric * fromPrice;
    const variableFee = valueSwapUsd * SWAP_CONFIG.LP_FEE_PERCENT;
    return SWAP_CONFIG.BASE_GAS_FEE_USD + variableFee;
  }, [fromAmountNumeric, fromPrice]);

  // Calculates the fixed USD fee in terms of the source token quantity
  const feeInToken = useMemo(() => {
    return fromPrice > 0 ? totalFeeUsd / fromPrice : 0;
  }, [fromPrice, totalFeeUsd]);

  // Preview of what the balance will be AFTER the swap and fee are deducted
  const postSwapBalance = useMemo(() => {
    if (fromAmountNumeric <= 0) return null;
    return Math.max(0, fromBalance - fromAmountNumeric - feeInToken);
  }, [fromBalance, fromAmountNumeric, feeInToken]);

  // Formatted string of the target amount for UI input display
  const toAmount = useMemo(() => {
    if (!fromAmount || isNaN(parseFloat(fromAmount))) return '';
    return formatTokenAmount(toAmountNumeric);
  }, [fromAmount, toAmountNumeric]);

  // --- Handlers & Actions ---

  /**
   * Updates 'From' amount, ensuring only numeric input is accepted
   */
  const handleFromAmountChange = (val: string) => {
    const amount = val.replace(/[^0-9.]/g, '');
    setFromAmount(amount);
  };

  /**
   * Flips the From/To assets and updates the input based on the current conversion
   */
  const handleSwapAssets = () => {
    const oldFrom = fromAsset;
    setFromAsset(toAsset);
    setToAsset(oldFrom);
    if (toAmountNumeric > 0) {
      setFromAmount(toAmountNumeric.toString());
    }
  };

  /**
   * Sets the input amount to the maximum available balance,
   * accurately deducting the calculated fee from the principal.
   */
  const handleMax = () => {
    if (fromPrice <= 0) {
      setFromAmount(fromBalance.toString());
      return;
    }

    const gasFeeInToken = SWAP_CONFIG.BASE_GAS_FEE_USD / fromPrice;
    
    // Formula to find amount 'a' such that: a + (a * percentFee) + gasFee = Balance
    // a * (1 + percentFee) = Balance - gasFee
    // a = (Balance - gasFee) / (1 + percentFee)
    const maxAmount = (fromBalance - gasFeeInToken) / (1 + SWAP_CONFIG.LP_FEE_PERCENT);
    
    // Safety check for small balances that can't cover gas
    if (maxAmount <= 0) {
      setFromAmount('0');
      return;
    }

    // We use a slight precision floor to avoid rounding issues that could lead to 'Insufficient Balance'
    const preciseMax = Math.floor(maxAmount * 1e8) / 1e8;
    setFromAmount(preciseMax.toString());
  };

  /**
   * Opens the token selection modal for either 'from' or 'to' side
   */
  const openModal = (side: 'from' | 'to') => {
    setActiveSide(side);
    setIsModalOpen(true);
  };

  /**
   * Updates the selected token for the active side (From vs To)
   */
  const handleTokenSelect = (token: string) => {
    if (activeSide === 'from') setFromAsset(token);
    else setToAsset(token);
  };

  /**
   * Simulates a blockchain transaction, then updates the local context balances
   */
  const onConfirmSwap = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const amountVal = parseFloat(fromAmount);
    
    // Safety check for invalid states (including ensuring balance covers fee)
    if (!fromAmount || isNaN(amountVal) || amountVal <= 0 || fromAsset === toAsset || (amountVal + feeInToken) > fromBalance) return;

    setIsSwapping(true);
    setSwapStatus(null);

    // Simulated network delay
    setTimeout(() => {
      // Finalize the state change in the global BalanceProvider
      executeSwap(
        fromAsset, 
        amountVal, 
        toAsset, 
        toAmountNumeric, 
        totalFeeUsd, 
        fromPrice
      );

      setIsSwapping(false);
      setSwapStatus('success');
      setFromAmount('');
      
      // Clear success state after duration
      setTimeout(() => setSwapStatus(null), SWAP_CONFIG.SUCCESS_TOAST_DURATION_MS);
    }, SWAP_CONFIG.SWAP_DELAY_MS);
  };

  // --- Validation Logic ---

  /**
   * UI validation flag to disable the swap button
   */
  const isInvalid = useMemo(() => {
    const amount = parseFloat(fromAmount);
    return !fromAmount || isNaN(amount) || amount <= 0 || fromAsset === toAsset || (amount + feeInToken) > fromBalance;
  }, [fromAmount, fromAsset, toAsset, fromBalance, feeInToken]);

  /**
   * Dynamic button text feedback for the user
   */
  const getButtonText = () => {
    if (fromAsset === toAsset) return APP_MESSAGES.SWAP.ERROR_SAME_ASSET;
    if (!fromAmount || parseFloat(fromAmount) <= 0) return APP_MESSAGES.SWAP.ERROR_NO_AMOUNT;
    if ((parseFloat(fromAmount) + feeInToken) > fromBalance) return APP_MESSAGES.SWAP.ERROR_INSUFFICIENT_BALANCE(fromAsset);
    return APP_MESSAGES.SWAP.BUTTON_CONFIRM;
  };

  // USD localized values for the UI price displays
  const fromUsdValue = useMemo(() => {
    const amountVal = parseFloat(fromAmount);
    return isNaN(amountVal) ? '0.00' : formatCurrency(amountVal * fromPrice);
  }, [fromAmount, fromPrice]);

  const toUsdValue = useMemo(() => 
    toAmountNumeric > 0 ? formatCurrency(toAmountNumeric * toPrice) : '0.00',
    [toAmountNumeric, toPrice]
  );


  return {
    // Data
    prices,
    loading,
    error,
    tokenList,
    fromAsset,
    toAsset,
    fromAmount,
    toAmount,
    fromUsdValue,
    toUsdValue,
    exchangeRate,
    fromBalance,
    balances,
    postSwapBalance,
    totalFeeUsd,
    
    // UI State
    isModalOpen,
    setIsModalOpen,
    activeSide,
    isSwapping,
    swapStatus,
    isInvalid,
    buttonText: getButtonText(),
    
    // Handlers
    handleFromAmountChange,
    handleMax,
    handleSwapAssets,
    openModal,
    handleTokenSelect,
    onConfirmSwap,
  };
};
