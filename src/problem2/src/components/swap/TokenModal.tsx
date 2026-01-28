import { useState } from 'react';
import { Search, X} from 'lucide-react';
import { cn } from '../../utils';
import { ICON_BASE_URL } from '../../data/mock';

interface TokenModalProps {
  isOpen: boolean;
  onClose: () => void;
  tokens: string[];
  onSelect: (token: string) => void;
  selectedToken: string;
  balances?: Record<string, number>;
}

export const TokenModal = ({ isOpen, onClose, tokens, onSelect, selectedToken, balances = {} }: TokenModalProps) => {
  const [search, setSearch] = useState<string>('');

  if (!isOpen) return null;

  const filteredTokens = tokens.filter(t => 
    t.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-brand-bg/75 backdrop-blur-sm" 
        onClick={onClose}
      />
      
      {/* ModalContent */}
      <div className="relative w-full max-w-lg bg-brand-bg border-t sm:border border-brand-border rounded-t-[2.5rem] sm:rounded-[2.5rem] shadow-2xl flex flex-col h-[65dvh] sm:max-h-[70vh] overflow-hidden animate-in slide-in-from-bottom-10 sm:zoom-in-95 duration-300">
        {/* Mobile Handle */}
        <div className="w-12 h-1.5 bg-brand-border/80 rounded-full mx-auto mt-4 mb-2 sm:hidden shrink-0" />

        <div className="p-5 sm:p-6 pb-4 border-b border-brand-border flex items-center justify-between shrink-0">
          <h3 className="font-bold text-lg sm:text-2xl font-display tracking-tight text-white">Select Asset</h3>
          <button onClick={onClose} className="p-2 hover:bg-brand-border/50 rounded-xl transition-colors hidden sm:block">
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        <div className="p-4 shrink-0">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-primary" />
            <input
              autoFocus
              placeholder="Search assets or address"
              className="w-full bg-brand-border/20 border border-brand-border/40 rounded-2xl py-3 sm:py-4 pl-12 pr-4 text-sm sm:text-base focus:outline-none focus:border-brand-primary/50 focus:ring-1 focus:ring-brand-primary/20 transition-all placeholder:text-brand-secondary/60 text-white"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 pb-8 custom-scrollbar">
          {filteredTokens.length > 0 ? (
            <div className="grid grid-cols-1 gap-1.5">
              {filteredTokens.map((token) => (
                <button
                  key={token}
                  onClick={() => {
                    onSelect(token);
                    onClose();
                  }}
                  className={cn(
                    "flex items-center gap-4 p-4 hover:bg-brand-border/20 rounded-2xl transition-all group text-left border border-transparent",
                    selectedToken === token && "bg-brand-primary/10 border-brand-primary/30 shadow-sm shadow-brand-primary/5"
                  )}
                >
                  <div className="relative shrink-0">
                    <img
                      src={`${ICON_BASE_URL}/${token}.svg`}
                      alt={token}
                      className="w-12 h-12 rounded-full bg-brand-border/50 p-0.5"
                      onError={(e: React.SyntheticEvent<HTMLImageElement>) => { 
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/SWTH.svg';
                      }}
                    />
                    {selectedToken === token && (
                      <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 bg-brand-primary rounded-full border-[3px] border-brand-bg flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-brand-bg rounded-full" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className={cn(
                      "font-bold text-lg text-white group-hover:text-brand-primary transition-colors truncate",
                      selectedToken === token && "text-brand-primary font-black"
                    )}>{token}</div>
                    <div className="text-xs text-brand-secondary font-bold uppercase tracking-widest opacity-80 group-hover:opacity-100 transition-opacity whitespace-nowrap">Integrated Network</div>
                  </div>
                  <div className="text-right shrink-0">
                    {balances[token] !== undefined ? (
                      <div className="flex flex-col items-end">
                        <div className="text-sm font-bold text-white tabular-nums">
                          {balances[token].toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 4 })}
                        </div>
                        <div className="text-[10px] text-brand-secondary font-bold uppercase tracking-tighter opacity-60">Balance</div>
                      </div>
                    ) : (
                      <div className="text-xs font-bold text-white/40">--</div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <div className="w-16 h-16 bg-brand-border/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-brand-secondary opacity-20" />
              </div>
              <p className="text-brand-secondary font-medium italic opacity-70">
                No assets found for "{search}"
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
