import React from 'react';
import { CheckCircle2, X, ArrowDownUp } from 'lucide-react';

interface TransactionToastProps {
  onDismiss: () => void;
  title?: string;
  description?: string;
}

export const TransactionToast: React.FC<TransactionToastProps> = ({ 
  onDismiss, 
  title = "Swap Confirmed", 
  description = "Successfully processed on Deep Forest L2" 
}) => {
  return (
    <div className="bg-brand-bg border border-brand-primary p-5 rounded-[2rem] shadow-[0_0_50px_rgba(0,245,160,0.2)] flex items-center gap-4 max-w-[400px] relative overflow-hidden animate-in slide-in-from-bottom-5 md:slide-in-from-right-10">
      <div className="absolute top-0 right-0 p-2">
        <button 
          onClick={onDismiss}
          className="p-1.5 hover:bg-brand-border/50 rounded-full transition-colors text-brand-secondary hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      
      <div className="bg-brand-primary/20 p-3.5 rounded-2xl shadow-inner shadow-brand-primary/20">
        <CheckCircle2 className="w-6 h-6 text-brand-primary" />
      </div>
      <div className="flex-1 pr-4">
        <h4 className="text-white font-bold font-display tracking-tight text-lg leading-tight">{title}</h4>
        <p className="text-brand-secondary text-[10px] uppercase font-bold tracking-[0.1em] mt-1 opacity-70">{description}</p>
        <button className="mt-3 text-[10px] text-brand-primary font-bold uppercase tracking-[0.15em] hover:underline flex items-center gap-1.5 group">
          Transaction Details <ArrowDownUp className="w-3 h-3 group-hover:rotate-45 transition-transform" />
        </button>
      </div>
    </div>
  );
};
