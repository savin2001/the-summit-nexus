import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorTooltipProps {
  message: string;
}

const ErrorTooltip: React.FC<ErrorTooltipProps> = ({ message }) => {
  return (
    <div className="absolute bottom-full right-0 mb-1.5 z-20 animate-fade-in pointer-events-none">
      <div className="bg-rose-600/95 dark:bg-rose-600/90 text-white text-xs font-bold py-1.5 px-3 rounded-lg shadow-[0_4px_14px_0_rgba(225,29,72,0.4)] flex items-center border border-rose-400/50 backdrop-blur-md">
        <AlertCircle className="w-3.5 h-3.5 mr-1.5" />
        {message}
        <div className="absolute top-full right-4 -mt-[1px] border-4 border-transparent border-t-rose-600/95 dark:border-t-rose-600/90"></div>
      </div>
    </div>
  );
};

export default ErrorTooltip;