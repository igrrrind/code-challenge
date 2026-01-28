import { APP_MESSAGES } from "../common/messages/text.messages";

/**
 * LoadingScreen
 * - Full-screen loader used while wallet or price data is loading.
 * - Visual: spinner + small status text centered on screen.
 */
export const LoadingScreen = () => {
  return (
    <div className="min-h-screen bg-brand-bg w-full flex flex-col items-center justify-center gap-4">
      {/* Spinner */}
      <div className="w-12 h-12 border-4 border-brand-primary/20 border-t-brand-primary rounded-full animate-spin" />
      {/* Status text */}
      <p className="text-brand-secondary font-medium font-display tracking-widest uppercase text-xs">{APP_MESSAGES.LOADING.SYNCING}</p>
    </div>
  );
};
