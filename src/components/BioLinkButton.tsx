
import React from 'react';
import { cn } from '@/lib/utils';

interface BioLinkButtonProps {
  label: string;
  onClick: () => void;
  icon?: React.ReactNode;
  className?: string;
}

const BioLinkButton = ({ label, onClick, icon, className }: BioLinkButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full py-4 px-6 rounded-full glass-button flex items-center justify-center gap-3 text-sm md:text-base font-medium",
        className
      )}
    >
      {icon && <span>{icon}</span>}
      <span>{label}</span>
    </button>
  );
};

export default BioLinkButton;
