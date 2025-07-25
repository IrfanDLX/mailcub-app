import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  secondaryActionLabel?: string;
  onSecondaryAction?: () => void;
  illustration?: string;
  className?: string;
}

export default function EmptyState({ 
  icon: Icon, 
  title, 
  description, 
  actionLabel, 
  onAction,
  secondaryActionLabel,
  onSecondaryAction,
  illustration,
  className = ""
}: EmptyStateProps) {
  return (
    <div className={`p-16 text-center ${className}`}>
      {illustration ? (
        <div className="mb-8">
          <img 
            src={illustration} 
            alt="Empty state illustration" 
            className="w-48 h-48 mx-auto object-contain opacity-60 dark:opacity-40"
          />
        </div>
      ) : (
        <div className="text-gray-400 dark:text-gray-500 mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-3xl flex items-center justify-center mx-auto shadow-inner">
            <Icon className="h-10 w-10" />
          </div>
        </div>
      )}
      
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{title}</h3>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-lg mx-auto leading-relaxed">
        {description}
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        {actionLabel && onAction && (
          <button
            onClick={onAction}
            className="inline-flex items-center px-8 py-4 text-white rounded-xl hover:opacity-90 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
            style={{ backgroundColor: '#008748' }}
          >
            {actionLabel}
          </button>
        )}
        
        {secondaryActionLabel && onSecondaryAction && (
          <button
            onClick={onSecondaryAction}
            className="inline-flex items-center px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 font-semibold text-lg"
          >
            {secondaryActionLabel}
          </button>
        )}
      </div>
    </div>
  );
}