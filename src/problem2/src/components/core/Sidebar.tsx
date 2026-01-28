import React, { useMemo } from 'react';
import { Wallet, LayoutDashboard, ArrowDownUp, History, Settings } from 'lucide-react';
import { DASHBOARD_STATS } from '../../data/mock';
import { useBalances } from '../../context/BalanceContext';
import { usePrices } from '../../hooks/usePrices';
import { formatCurrency } from '../../utils/formatters';

export const Sidebar: React.FC = () => {
  const { balances } = useBalances();
  const { prices } = usePrices();

  const totalBalance = useMemo(() => {
    return Object.entries(balances).reduce((acc, [token, amount]) => {
      const price = prices.find(p => p.currency === token)?.price || 0;
      return acc + (amount * price);
    }, 0);
  }, [balances, prices]);

  return (
    <aside className="hidden lg:flex w-72 flex-col border-r border-brand-border p-6 gap-8 bg-brand-bg/50 backdrop-blur-md shrink-0">
      <div className="flex items-center gap-3 px-2">
        <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center shadow-lg shadow-brand-primary/10">
          <Wallet className="w-6 h-6 text-brand-bg" />
        </div>
        <span className="text-xl font-bold font-display tracking-tight text-white">Problem 2</span>
      </div>

      <nav className="flex flex-col gap-1">
        <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl text-brand-secondary hover:bg-brand-border/50 transition-colors">
          <LayoutDashboard className="w-5 h-5" />
          <span className="font-medium">Dashboard</span>
        </a>
        <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-brand-primary/10 text-brand-primary border border-brand-primary/10">
          <ArrowDownUp className="w-5 h-5" />
          <span className="font-medium">Swap</span>
        </a>
        <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl text-brand-secondary hover:bg-brand-border/50 transition-colors">
          <History className="w-5 h-5" />
          <span className="font-medium">History</span>
        </a>
        <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl text-brand-secondary hover:bg-brand-border/50 transition-colors">
          <Settings className="w-5 h-5" />
          <span className="font-medium">Settings</span>
        </a>
      </nav>

      <div className="mt-auto p-4 bg-brand-border/30 rounded-2xl border border-brand-border">
        <div className="text-[10px] text-brand-secondary font-bold uppercase tracking-widest mb-2 opacity-60">Total Balance</div>
        <div className="text-2xl font-bold font-display text-white">${formatCurrency(totalBalance)}</div>
        <div className="text-xs text-brand-primary font-medium mt-1">{DASHBOARD_STATS.DAILY_CHANGE} (24h)</div>
      </div>
    </aside>
  );
};
