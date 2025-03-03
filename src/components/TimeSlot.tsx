
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TimeSlotProps {
  time: string;
  available: boolean;
  selected: boolean;
  onSelect?: (time: string) => void;
}

const TimeSlot: React.FC<TimeSlotProps> = ({
  time,
  available,
  selected,
  onSelect
}) => {
  return (
    <motion.button
      className={cn(
        "py-2.5 px-4 rounded-xl text-sm font-medium transition-all",
        "border focus-ring",
        available 
          ? selected
            ? "bg-primary text-white border-primary"
            : "bg-white border-border hover:border-primary/60"
          : "bg-secondary/30 text-muted-foreground border-border cursor-not-allowed opacity-60"
      )}
      disabled={!available}
      onClick={() => onSelect && onSelect(time)}
      whileHover={available ? { scale: 1.05 } : {}}
      whileTap={available ? { scale: 0.98 } : {}}
      transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
    >
      {time}
    </motion.button>
  );
};

export default TimeSlot;
