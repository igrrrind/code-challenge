import React from 'react';
import { TokenSelector } from './TokenModal';

interface CurrencyInputProps {
  label: string;
  amount: string;
  onAmountChange?: (val: string) => void;
  asset: string;
  onAssetClick: () => void;
  usdValue?: string;
  balance?: string;
  postBalance?: string;
  rateInfo?: string;
  readOnly?: boolean;
  disabled?: boolean;
  onMaxClick?: () => void;
}

export const CurrencyInput: React.FC<CurrencyInputProps> = ({ 
  label, 
  amount, 
  onAmountChange, 
  asset, 
  onAssetClick, 
  usdValue, 
  balance, 
  postBalance,
  rateInfo,
  readOnly = false,
  disabled = false,
  onMaxClick
}) => {
  return (
    <div className="bg-brand-bg/40 border border-brand-border p-3.5 sm:p-4 rounded-2xl sm:rounded-3xl focus-within:border-brand-primary/50 transition-all hover:border-brand-border/80">
      <div className="flex justify-between items-center mb-1.5 sm:mb-2 gap-2 h-5">
        <label className="text-[10px] sm:text-xs font-bold text-brand-secondary tracking-widest uppercase shrink-0">{label}</label>
        <div className="flex flex-col items-end overflow-hidden h-full justify-center">
          {balance && (
            <div className="flex items-center gap-1.5 overflow-hidden">
               <span className="text-[10px] text-brand-secondary font-bold tracking-tight truncate">
                {postBalance ? (
                  <>
                    <span className="opacity-60">{balance}</span>
                    <span className="mx-1 text-brand-primary">→</span>
                    <span className="text-brand-primary">{postBalance}</span>
                  </>
                ) : (
                  `Balance: ${balance}`
                )}
              </span>
              {onMaxClick && !disabled && !readOnly && (
                <button 
                  type="button"
                  onClick={onMaxClick}
                  className="text-[9px] font-black bg-brand-primary/10 text-brand-primary px-1.5 py-0.5 rounded uppercase hover:bg-brand-primary hover:text-brand-bg transition-colors"
                >
                  Max
                </button>
              )}
            </div>
          )}
          {rateInfo && (
            <span className="text-[10px] text-brand-secondary/80 font-bold tracking-tight truncate w-full text-right">
              {rateInfo}
            </span>
          )}
        </div>
      </div>
      <div className="flex items-center gap-3">
        <input
          type="text"
          inputMode="decimal"
          placeholder="0.00"
          className="bg-transparent text-2xl sm:text-3xl font-bold w-full min-w-0 focus:outline-none disabled:opacity-50 font-display tracking-tight tabular-nums placeholder:text-brand-border/60 text-white"
          value={amount}
          onChange={(e) => onAmountChange && onAmountChange(e.target.value)}
          readOnly={readOnly}
          disabled={disabled}
        />
        <div className="shrink-0">
          <TokenSelector
            asset={asset}
            onClick={onAssetClick}
            disabled={disabled}
          />
        </div>
      </div>
      <div className="mt-1 text-xs text-brand-secondary font-bold">
        <span className="truncate">{usdValue ? `≈ $${usdValue}` : '$0.00'}</span>
      </div>
    </div>
  );
};
