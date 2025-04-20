import React, { InputHTMLAttributes } from 'react';

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  error?: string;
}

const FormField = ({ label, name, error, className = '', ...props }: FormFieldProps) => {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        {label}
      </label>
      <input
        id={name}
        name={name}
        className={`
          w-full px-3 py-2 
          bg-white dark:bg-gray-800 
          border border-gray-300 dark:border-gray-700 
          rounded-md shadow-sm 
          focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 
          dark:focus:ring-red-700 dark:focus:border-red-700
          ${error ? 'border-red-500 dark:border-red-500' : ''}
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
};

export default FormField; 