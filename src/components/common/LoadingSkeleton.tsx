import React from 'react';

interface LoadingSkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular' | 'card';
  width?: string | number;
  height?: string | number;
  lines?: number;
}

export default function LoadingSkeleton({ 
  className = '', 
  variant = 'rectangular',
  width,
  height,
  lines = 1
}: LoadingSkeletonProps) {
  const baseClasses = 'animate-pulse bg-gray-200 dark:bg-gray-700';
  
  const getVariantClasses = () => {
    switch (variant) {
      case 'text':
        return 'h-4 rounded';
      case 'circular':
        return 'rounded-full';
      case 'rectangular':
        return 'rounded-lg';
      case 'card':
        return 'rounded-xl';
      default:
        return 'rounded-lg';
    }
  };

  const style = {
    width: width || '100%',
    height: height || (variant === 'text' ? '1rem' : '2rem')
  };

  if (variant === 'text' && lines > 1) {
    return (
      <div className={`space-y-2 ${className}`}>
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className={`${baseClasses} ${getVariantClasses()}`}
            style={{
              ...style,
              width: index === lines - 1 ? '75%' : '100%'
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={`${baseClasses} ${getVariantClasses()} ${className}`}
      style={style}
    />
  );
}

// Specific skeleton components for common patterns
export const CardSkeleton = ({ className = '' }: { className?: string }) => (
  <div className={`bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 ${className}`}>
    <div className="flex items-center space-x-4 mb-4">
      <LoadingSkeleton variant="circular" width={48} height={48} />
      <div className="flex-1">
        <LoadingSkeleton variant="text" width="60%" className="mb-2" />
        <LoadingSkeleton variant="text" width="40%" />
      </div>
    </div>
    <LoadingSkeleton variant="text" lines={3} />
  </div>
);

export const TableRowSkeleton = ({ columns = 4 }: { columns?: number }) => (
  <tr className="border-b border-gray-200 dark:border-gray-700">
    {Array.from({ length: columns }).map((_, index) => (
      <td key={index} className="px-6 py-4">
        <LoadingSkeleton variant="text" />
      </td>
    ))}
  </tr>
);

export const StatCardSkeleton = ({ className = '' }: { className?: string }) => (
  <div className={`bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 ${className}`}>
    <div className="flex items-center">
      <LoadingSkeleton variant="rectangular" width={48} height={48} className="rounded-lg mr-4" />
      <div className="flex-1">
        <LoadingSkeleton variant="text" width="50%" className="mb-2" />
        <LoadingSkeleton variant="text" width="70%" />
      </div>
    </div>
  </div>
);