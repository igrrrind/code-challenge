import { ArrowDownUp } from "lucide-react";
import { APP_MESSAGES } from "../../common/messages/text.messages";
import { TOAST_MESSAGES } from "../../common/messages/toast.messages";
import { BaseToast } from "./BaseToast";

interface TransactionToastProps {
  onDismiss: () => void;
  title?: string;
  description?: string;
}

/**
 * TransactionToast
 * - Built on top of BaseToast, specific to transaction success events.
 */
export const TransactionToast = ({
  onDismiss,
  title = TOAST_MESSAGES.TRANSACTION.SUCCESS_TITLE,
  description = TOAST_MESSAGES.TRANSACTION.SUCCESS_DESC,
}: TransactionToastProps ) => {
  return (
    <BaseToast
      title={title}
      description={description}
      variant="success"
      onDismiss={onDismiss}
    >
      <button className="text-[10px] text-brand-primary font-bold uppercase tracking-[0.15em] hover:underline flex items-center gap-1.5 group">
        {APP_MESSAGES.SWAP.TRANSACTION_DETAILS}{" "}
        <ArrowDownUp className="w-3 h-3 group-hover:rotate-45 transition-transform" />
      </button>
    </BaseToast>
  );
};
