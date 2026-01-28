import { ChevronDown } from "lucide-react";
import { cn } from "../../utils";
import { ICON_BASE_URL, FALLBACK_TOKEN_ICON } from "../../common/constants";

interface TokenSelectorProps {
  asset: string;
  onClick: () => void;
  disabled?: boolean;
}

/**
 * TokenSelector
 * - Small button showing token icon and label; opens token selection modal.
 */
export const TokenSelector = ({ asset, onClick, disabled }: TokenSelectorProps) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    className={cn(
      "flex items-center gap-1.5 sm:gap-2 bg-brand-border/40 hover:bg-brand-border/60 transition-all border border-brand-border/60 px-2 sm:px-4 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl min-w-[80px] sm:min-w-[110px] shadow-sm group active:scale-95",
      disabled && "opacity-50 cursor-not-allowed"
    )}
  >
    {/* Token image */}
    <img
      src={`${ICON_BASE_URL}/${asset}.svg`}
      alt={asset}
      className="w-4 h-4 sm:w-6 sm:h-6 rounded-full shadow-lg shrink-0"
      onError={(e: React.SyntheticEvent<HTMLImageElement>) => { 
        const target = e.target as HTMLImageElement;
        target.src = FALLBACK_TOKEN_ICON;
      }}
    />
    {/* Token label & chevron */}
    <span className="font-bold text-white text-xs sm:text-base group-hover:text-brand-primary transition-colors">{asset}</span>
    <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-brand-secondary group-hover:text-brand-primary transition-colors shrink-0" />
  </button>
);
