import { Loader2 } from 'lucide-react';
import { APP_MESSAGES } from '../../common/messages/text.messages';
import { cn } from '../../utils';

/**
 * SwapButton
 * - Primary CTA for submitting the swap. Handles loading and disabled states.
 */
interface SwapButtonProps {
  loading: boolean;
  disabled: boolean;
  onClick?: () => void;
  text?: string;
}

export const SwapButton = ({ loading, disabled, onClick, text = "CONFIRM SWAP" }:SwapButtonProps) => {
  return (
    <button
      type="submit"
      disabled={disabled || loading}
      onClick={onClick}
      className={cn(
        "w-full h-16 rounded-[1.5rem] font-bold text-base tracking-[0.15em] font-display flex items-center justify-center transition-all duration-300 active:scale-[0.97]",
        "bg-brand-primary text-brand-bg shadow-[0_0_20px_rgba(0,245,160,0.2)] hover:shadow-[0_0_30px_rgba(0,245,160,0.4)] hover:scale-[1.01]",
        "disabled:bg-brand-border/60 disabled:text-brand-secondary/40 disabled:shadow-none disabled:active:scale-100 disabled:hover:scale-100 disabled:cursor-not-allowed"
      )}
    >
      {/* Loading vs default label */}
      <div className="relative h-full w-full flex items-center justify-center pointer-events-none uppercase">
        {loading ? (
          <div className="flex items-center gap-3 animate-in fade-in zoom-in-95">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span className="opacity-80">{APP_MESSAGES.SWAP.BUTTON_FINALIZING}</span>
          </div>
        ) : (
          <span className="animate-in fade-in slide-in-from-bottom-1 duration-300">
            {text}
          </span>
        )}
      </div>
    </button>
  );
};
