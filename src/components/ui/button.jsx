import React from 'react';

const VARIANT_STYLES = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700',
  outline: 'border border-blue-600 text-blue-600 hover:bg-blue-100',
  ghost: 'text-blue-600 hover:bg-blue-50',
};

const Button = ({ children, onClick, className = '', type = 'button', variant = 'primary' }) => {
  const variantClass = VARIANT_STYLES[variant] || VARIANT_STYLES.primary;

  return (
    <button
      onClick={onClick}
      type={type}
      className={`px-4 py-2 rounded transition font-medium ${variantClass} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
