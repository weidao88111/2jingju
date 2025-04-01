import React, { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
}

const Card = ({ children, className = '', onClick, hoverable = false }: CardProps) => {
  return (
    <div 
      className={`
        bg-white dark:bg-gray-800 
        border border-gray-100 dark:border-gray-700 
        rounded-xl shadow-sm 
        overflow-hidden
        transition-all duration-300
        w-full max-w-full
        ${hoverable ? 'card-hover-effect hover:shadow-lg dark:hover:shadow-gray-800/40' : ''}
        ${className}
      `}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className = '' }: { children: ReactNode; className?: string }) => {
  return (
    <div className={`px-4 sm:px-6 py-4 sm:py-5 border-b border-gray-100 dark:border-gray-700 ${className}`}>
      {children}
    </div>
  );
};

export const CardBody = ({ children, className = '' }: { children: ReactNode; className?: string }) => {
  return (
    <div className={`px-4 sm:px-6 py-4 sm:py-5 ${className}`}>
      {children}
    </div>
  );
};

export const CardFooter = ({ children, className = '' }: { children: ReactNode; className?: string }) => {
  return (
    <div className={`px-4 sm:px-6 py-3 sm:py-4 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-100 dark:border-gray-700 ${className}`}>
      {children}
    </div>
  );
};

export default Card; 