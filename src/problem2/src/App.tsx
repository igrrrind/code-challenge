import { useEffect } from 'react';
import { Toaster, toast } from 'sonner';
import { useAppLogic } from './hooks/seg/app.hook';
import { Sidebar } from './components/core/Sidebar';
import { Header } from './components/core/Header';
import { SwapInterface } from './components/swap/SwapInterface';
import { TokenModal } from './components/swap/TokenModal';
import { LoadingScreen } from './components/LoadingScreen';
import { TransactionToast } from './components/toast/TransactionToast';

const App: React.FC = () => {
  const logic = useAppLogic();
  const { 
    loading, 
    swapStatus, 
    isModalOpen, 
    setIsModalOpen, 
    tokenList, 
    handleTokenSelect, 
    activeSide, 
    fromAsset, 
    toAsset,
    balances 
  } = logic;

  useEffect(() => {
    if (swapStatus === 'success') {
      toast.custom((t) => (
        <TransactionToast onDismiss={() => toast.dismiss(t)} />
      ));
    }
  }, [swapStatus]);

  if (loading) return <LoadingScreen />;

  return (
    <div className="min-h-screen bg-brand-bg w-full text-brand-text font-sans selection:bg-brand-primary/30 overflow-x-hidden">
      {/* Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-secondary/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative w-full flex min-h-screen">
        <Sidebar />

        <main className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
          <Header />

          <section className="flex-1 flex items-center justify-center p-4 md:p-8">
            <div className="w-full max-w-[600px]">
              <SwapInterface {...logic} />
            </div>
          </section>
        </main>
      </div>

      <Toaster position="bottom-right" expand={true} visibleToasts={3} />

      <TokenModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        tokens={tokenList}
        onSelect={handleTokenSelect}
        selectedToken={activeSide === 'from' ? fromAsset : toAsset}
        balances={balances}
      />
    </div>
  );
}

export default App;
