
import React from 'react';
import { cn } from '@/lib/utils';

export interface TimeSlotProps {
  time: string;
  selected: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

const TimeSlot = ({ time, selected, disabled = false, onClick }: TimeSlotProps) => {
  return (
    <button
      className={cn(
        "py-2 px-3 text-sm rounded-md border transition-colors",
        selected 
          ? "bg-primary text-primary-foreground border-primary" 
          : "bg-background border-border hover:border-primary/50",
        disabled && "opacity-50 cursor-not-allowed hover:border-border"
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {time}
    </button>
  );
};

export default TimeSlot;
