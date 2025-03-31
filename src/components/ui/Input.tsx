'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  icon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, icon, ...props }, ref) => {
    return (
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary">
            {icon}
          </div>
        )}
        <input
          type={type}
          className={cn(
            'bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-text-primary',
            'focus:outline-none focus:ring-2 focus:ring-primary/50 w-full transition-colors',
            error ? 'border-red-500 focus:ring-red-500/50' : '',
            icon ? 'pl-10' : '',
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
