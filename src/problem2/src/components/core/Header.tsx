/**
 * Header
 * - Top application bar containing title / brand and quick actions (notifications, account)
 * - Keep this component small and presentational.
 */
import { Wallet, Bell } from 'lucide-react';
import { APP_MESSAGES } from '../../common/messages/text.messages';

export const Header = () => {
  return (
    <header className="flex items-center justify-between p-4 md:p-6 border-b border-brand-border sticky top-0 bg-brand-bg/80 backdrop-blur-lg z-20">
      {/* Left: Brand / Title */}
      <div className="flex flex-col">
        <h1 className="text-xl font-bold font-display text-white lg:hidden flex items-center gap-2">
          <Wallet className="w-5 h-5 text-brand-primary" />
          Problem 2
        </h1>
        <span className="text-sm font-medium text-brand-secondary hidden lg:block">{APP_MESSAGES.HEADER.WELCOME}</span>
      </div>

      {/* Right: Actions (notifications, account) */}
      <div className="flex items-center gap-3">
        <button className="p-2.5 rounded-xl bg-brand-border/50 border border-brand-border text-brand-secondary hover:text-white transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-brand-primary rounded-full border-2 border-brand-bg" />
        </button>
        <div className="h-10 px-4 flex items-center gap-2 bg-brand-border/50 border border-brand-border rounded-xl">
          <div className="w-6 h-6 rounded-full bg-brand-secondary/30" />
          <span className="text-sm font-bold text-brand-text">0x...4f3a</span>
        </div>
      </div>
    </header>
  );
};
