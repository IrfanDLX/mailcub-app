import React from 'react';
import { AlertTriangle, X, CheckCircle, Info } from 'lucide-react';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'danger' | 'warning' | 'info';
  icon?: React.ReactNode;
}

export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  type = 'danger',
  icon
}: ConfirmationModalProps) {
  if (!isOpen) return null;

  const getTypeStyles = () => {
    switch (type) {
      case 'danger':
        return {
          iconBg: 'bg-gradient-to-br from-red-100 to-red-200 dark:from-red-900/20 dark:to-red-800/20',
          iconColor: 'text-red-600 dark:text-red-400',
          confirmButton: 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 focus:ring-red-500 shadow-lg hover:shadow-xl',
          backdrop: 'bg-red-50/50 dark:bg-red-900/10'
        };
      case 'warning':
        return {
          iconBg: 'bg-gradient-to-br from-yellow-100 to-orange-200 dark:from-yellow-900/20 dark:to-orange-800/20',
          iconColor: 'text-yellow-600 dark:text-yellow-400',
          confirmButton: 'bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 focus:ring-yellow-500 shadow-lg hover:shadow-xl',
          backdrop: 'bg-yellow-50/50 dark:bg-yellow-900/10'
        };
      case 'info':
        return {
          iconBg: 'bg-gradient-to-br from-blue-100 to-indigo-200 dark:from-blue-900/20 dark:to-indigo-800/20',
          iconColor: 'text-blue-600 dark:text-blue-400',
          confirmButton: 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:ring-blue-500 shadow-lg hover:shadow-xl',
          backdrop: 'bg-blue-50/50 dark:bg-blue-900/10'
        };
      default:
        return {
          iconBg: 'bg-gradient-to-br from-red-100 to-red-200 dark:from-red-900/20 dark:to-red-800/20',
          iconColor: 'text-red-600 dark:text-red-400',
          confirmButton: 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 focus:ring-red-500 shadow-lg hover:shadow-xl',
          backdrop: 'bg-red-50/50 dark:bg-red-900/10'
        };
    }
  };

  const getDefaultIcon = () => {
    switch (type) {
      case 'danger':
        return <AlertTriangle className={`h-6 w-6 ${styles.iconColor}`} />;
      case 'warning':
        return <AlertTriangle className={`h-6 w-6 ${styles.iconColor}`} />;
      case 'info':
        return <Info className={`h-6 w-6 ${styles.iconColor}`} />;
      default:
        return <AlertTriangle className={`h-6 w-6 ${styles.iconColor}`} />;
    }
  };

  const styles = getTypeStyles();

  return (
    <div className="fixed inset-0 bg-gray-900/60 dark:bg-gray-950/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className={`absolute inset-0 ${styles.backdrop}`}></div>
      <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md border border-gray-200 dark:border-gray-700 shadow-2xl transform transition-all duration-300 scale-100">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-start pr-8">
          <div className={`flex-shrink-0 ${styles.iconBg} rounded-2xl p-3 mr-4 shadow-sm`}>
            {icon || getDefaultIcon()}
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              {title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
              {message}
            </p>
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <button
            onClick={onClose}
            className="px-6 py-2.5 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200 font-medium border border-gray-200 dark:border-gray-600 hover:shadow-md"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className={`px-6 py-2.5 text-white rounded-xl transition-all duration-200 font-medium transform hover:scale-105 ${styles.confirmButton}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-600 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors"
              >
                {cancelText}
              </button>
              <button
                onClick={onConfirm}
                className={`px-4 py-2 text-white rounded-lg transition-colors focus:ring-2 focus:ring-offset-2 ${styles.confirmButton}`}
              >
                {confirmText}
              </button>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 ml-2"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}