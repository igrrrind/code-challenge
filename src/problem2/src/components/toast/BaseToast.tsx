import React from 'react';
import { X, CheckCircle2, AlertCircle, Info, LucideIcon } from "lucide-react";
import { cn } from "../../utils";

export type ToastVariant = 'success' | 'error' | 'info';

interface BaseToastProps {
  title: string;
  description?: string;
  variant?: ToastVariant;
  icon?: LucideIcon;
  onDismiss: () => void;
  children?: React.ReactNode;
}

const variantStyles: Record<ToastVariant, { bg: string; border: string; iconColor: string; icon: LucideIcon }> = {
  success: {
    bg: 'bg-brand-primary/10',
    border: 'border-brand-primary/50',
    iconColor: 'text-brand-primary',
    icon: CheckCircle2,
  },
  error: {
    bg: 'bg-red-500/10',
    border: 'border-red-500/50',
    iconColor: 'text-red-500',
    icon: AlertCircle,
  },
  info: {
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/50',
    iconColor: 'text-blue-500',
    icon: Info,
  },
};

/**
 * BaseToast
 * - A generic toast container that supports different variants and custom actions.
 */
export const BaseToast = ({
  title,
  description,
  variant = 'info',
  icon: CustomIcon,
  onDismiss,
  children
}: BaseToastProps) => {
  const styles = variantStyles[variant];
  const Icon = CustomIcon || styles.icon;

  return (
    <div className={cn(
      "relative flex items-center gap-4 p-5 rounded-[2rem] border shadow-2xl backdrop-blur-md max-w-[400px] w-full overflow-hidden animate-in slide-in-from-bottom-5",
      "bg-brand-bg",
      styles.border
    )}>
      {/* Dismiss Button */}
      <button
        onClick={onDismiss}
        className="absolute top-3 right-3 p-1.5 hover:bg-brand-border/50 rounded-full transition-colors text-brand-secondary hover:text-white"
      >
        <X className="w-4 h-4" />
      </button>

      {/* Icon Container */}
      <div className={cn("p-3.5 rounded-2xl shrink-0", styles.bg)}>
        <Icon className={cn("w-6 h-6", styles.iconColor)} />
      </div>

      {/* Content Area */}
      <div className="flex-1 pr-6 min-w-0">
        <h4 className="text-white font-bold font-display tracking-tight text-lg leading-tight truncate">
          {title}
        </h4>
        {description && (
          <p className="text-brand-secondary text-[10px] uppercase font-bold tracking-[0.1em] mt-1 opacity-70">
            {description}
          </p>
        )}
        {children && <div className="mt-3">{children}</div>}
      </div>
    </div>
  );
};
