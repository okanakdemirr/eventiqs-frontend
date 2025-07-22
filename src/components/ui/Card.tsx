import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export default function Card({ children, className = '', hover = false, onClick }: CardProps) {
  const baseClasses = 'bg-white rounded-xl border border-gray-200 shadow-sm';
  const hoverClasses = hover ? 'hover:shadow-md hover:scale-[1.02] transition-all duration-200 ease-out cursor-pointer' : '';
  
  return (
    <div 
      className={`${baseClasses} ${hoverClasses} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}