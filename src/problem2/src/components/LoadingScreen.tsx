import React from 'react';

export const LoadingScreen: React.FC = () => {
  return (
    <div className="min-h-screen bg-brand-bg w-full flex flex-col items-center justify-center gap-4">
      <div className="w-12 h-12 border-4 border-brand-primary/20 border-t-brand-primary rounded-full animate-spin" />
      <p className="text-brand-secondary font-medium font-display tracking-widest uppercase text-xs">Syncing Wallet</p>
    </div>
  );
};
