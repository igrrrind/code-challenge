import { ArrowDownUp, AlertCircle, Settings } from 'lucide-react';
import { CurrencyInput } from './CurrencyInput';
import { SwapButton } from './SwapButton';
import { formatTokenAmount } from '../../utils/formatters';
import { SWAP_CONFIG } from '../../common/config';
import { APP_MESSAGES } from '../../common/messages/text.messages';

interface SwapInterfaceProps {
  fromAsset: string;
  toAsset: string;
  fromAmount: string;
  toAmount: string;
  fromUsdValue: string;
  toUsdValue: string;
  exchangeRate: number;
  fromBalance: number;
  postSwapBalance: number | null;
  totalFeeUsd: number;
  isSwapping: boolean;
  isInvalid: boolean;
  buttonText: string;
  error: string | null;
  handleFromAmountChange: (val: string) => void;
  handleMax: () => void;
  handleSwapAssets: () => void;
  openModal: (side: 'from' | 'to') => void;
  onConfirmSwap: (e?: React.FormEvent) => void;
}

/**
 * SwapInterface
 * - Main swap card responsible for: header, error banner, From/To inputs, fee info, and submit button.
 * - Keeps form state lifted to parent (presentational + callbacks only).
 */
export const SwapInterface = ({
  fromAsset,
  toAsset,
  fromAmount,
  toAmount,
  fromUsdValue,
  toUsdValue,
  exchangeRate,
  fromBalance,
  postSwapBalance,
  totalFeeUsd,
  isSwapping,
  isInvalid,
  buttonText,
  error,
  handleFromAmountChange,
  handleMax,
  handleSwapAssets,
  openModal,
  onConfirmSwap
}: SwapInterfaceProps) => {
  return (
    <div className="bg-brand-border/20 backdrop-blur-2xl border border-brand-border/60 rounded-[2rem] sm:rounded-[2.5rem] p-5 sm:p-8 shadow-2xl relative overflow-hidden group">
      {/* Header: Title + Slippage tag */}
      <div className="flex justify-between items-center mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-black font-display tracking-tight text-white leading-none">{APP_MESSAGES.SWAP.TITLE}</h2>
        <div className="flex gap-2">
          <div className="px-3 py-1.5 bg-brand-primary/10 text-brand-primary text-[10px] uppercase font-bold tracking-widest rounded-full border border-brand-primary/20">{APP_MESSAGES.SWAP.SLIPPAGE_LABEL(SWAP_CONFIG.DEFAULT_SLIPPAGE)}</div>
        </div>
      </div>

      {/* Error banner (visible if error exists) */}
      {error && (
        <div className="mb-4 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-500 text-sm animate-in fade-in slide-in-from-top-2">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span className="font-medium">{error}</span>
        </div>
      )}

      {/* Form: From input, swap toggle, To input, fee and submit */}
      <form onSubmit={onConfirmSwap} className="space-y-2">
        {/* From input */}
        <CurrencyInput
          label="From"
          amount={fromAmount}
          onAmountChange={handleFromAmountChange}
          asset={fromAsset}
          onAssetClick={() => openModal('from')}
          usdValue={fromUsdValue}
          balance={formatTokenAmount(fromBalance)}
          postBalance={postSwapBalance !== null ? formatTokenAmount(postSwapBalance) : undefined}
          onMaxClick={handleMax}
          disabled={isSwapping}
        />

        {/* Swap toggle (visual separator + action) */}
        <div className="relative h-4 flex justify-center items-center">
          <div className="absolute inset-x-0 h-px bg-brand-border" />
          <button
            type="button"
            onClick={handleSwapAssets}
            disabled={isSwapping}
            className="relative p-3 bg-brand-bg border border-brand-border rounded-full hover:border-brand-primary transition-all z-10 hover:rotate-180 duration-500 shadow-xl disabled:opacity-50 group"
          >
            <ArrowDownUp className="w-5 h-5 text-brand-primary" />
          </button>
        </div>

        {/* To input */}
        <CurrencyInput
          label="To"
          amount={toAmount}
          asset={toAsset}
          onAssetClick={() => openModal('to')}
          usdValue={toUsdValue}
          rateInfo={`1 ${fromAsset} = ${formatTokenAmount(exchangeRate)} ${toAsset}`}
          readOnly
          disabled={isSwapping}
        />

        {/* Fee summary */}
        <div className="px-2 h-14 flex flex-col justify-center gap-1 group/fee">
          <div className="flex justify-between text-xs text-brand-secondary font-bold group-hover/fee:text-brand-text transition-colors">
            <span className="flex items-center gap-1">{APP_MESSAGES.SWAP.ESTIMATED_FEE} <Settings className="w-3 h-3" /></span>
            <span>~${totalFeeUsd.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-xs text-brand-secondary font-bold group-hover/fee:text-brand-text transition-colors">
            <span>{APP_MESSAGES.SWAP.ROUTING}</span>
            <span className="text-brand-primary">{SWAP_CONFIG.ROUTING_NETWORK}</span>
          </div>
        </div>

        {/* Submit button */}
        <SwapButton 
          loading={isSwapping} 
          disabled={isInvalid} 
          text={buttonText}
        />
      </form>
    </div>
  );
};
