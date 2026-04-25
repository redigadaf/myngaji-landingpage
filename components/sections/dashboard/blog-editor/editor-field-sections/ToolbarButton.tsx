import React from "react";

interface ToolbarButtonProps {
  icon: React.ReactNode;
  active?: boolean;
  onClick: () => void;
  className?: string;
  title?: string;
}

export function ToolbarButton({ 
  icon, 
  active = false, 
  onClick, 
  className, 
  title 
}: ToolbarButtonProps) {
  return (
    <button 
      type="button"
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      title={title}
      className={`p-2 rounded-lg transition-all duration-200 border border-transparent ${
        active 
          ? 'bg-primary text-white shadow-md scale-105 border-primary' 
          : 'text-gray-400 hover:bg-[#17838F]/10 hover:text-primary hover:border-[#17838F]/20'
      } ${className || ''}`}
    >
      {icon}
    </button>
  );
}
