import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface NoDataFoundProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export default function NoDataFound({ 
  icon: Icon, 
  title, 
  description, 
  actionLabel, 
  onAction,
  className = ""
}: NoDataFoundProps) {
  return (
    <div className={`p-12 text-center ${className}`}>
      <div className="text-gray-400 dark:text-gray-500 mb-6">
        <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-2xl flex items-center justify-center mx-auto">
          <Icon className="h-8 w-8" />
        </div>
      </div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto leading-relaxed">
        {description}
      </p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="inline-flex items-center px-6 py-3 text-white rounded-lg hover:opacity-90 transition-colors font-medium"
          style={{ backgroundColor: '#008748' }}
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}