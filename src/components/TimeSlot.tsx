
import React from 'react';
import { cn } from '@/lib/utils';

export interface TimeSlotProps {
  time: string;
  selected: boolean;
  disabled?: boolean;
  available?: boolean;
  onClick?: () => void;
  onSelect?: (time: string) => void;
}

const TimeSlot = ({ time, selected, disabled = false, available = true, onClick, onSelect }: TimeSlotProps) => {
  const handleClick = () => {
    if (disabled) return;
    if (onClick) onClick();
    if (onSelect) onSelect(time);
  };

  return (
    <button
      className={cn(
        "py-2 px-3 text-sm rounded-md border transition-colors",
        selected 
          ? "bg-primary text-primary-foreground border-primary" 
          : "bg-background border-border hover:border-primary/50",
        !available && "opacity-50 cursor-not-allowed hover:border-border",
        disabled && "opacity-50 cursor-not-allowed hover:border-border"
      )}
      onClick={handleClick}
      disabled={disabled || !available}
    >
      {time}
    </button>
  );
};

export default TimeSlot;
