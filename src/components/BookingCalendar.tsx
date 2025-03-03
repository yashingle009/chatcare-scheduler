
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { getNextSevenDays } from "@/utils/dateUtils";
import TimeSlot from "./TimeSlot";
import { mockTimeSlots } from "@/lib/supabase";

interface BookingCalendarProps {
  onSelectTime: (time: string) => void;
}

const BookingCalendar: React.FC<BookingCalendarProps> = ({ onSelectTime }) => {
  const dates = getNextSevenDays();
  const [selectedDate, setSelectedDate] = useState(dates[0]);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  
  const handleSelectTime = (time: string) => {
    setSelectedTime(time);
    onSelectTime(time);
  };
  
  return (
    <div className="bg-white rounded-2xl border border-border p-5">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-base font-medium">Select Date & Time</h3>
        <div className="flex space-x-2">
          <button className="p-1.5 rounded-full hover:bg-secondary focus-ring">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button className="p-1.5 rounded-full hover:bg-secondary focus-ring">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      <div className="flex overflow-x-auto mb-6 pb-2 scrollbar-none -mx-2">
        <div className="flex space-x-2 px-2">
          {dates.map((date, index) => (
            <motion.button
              key={index}
              className={cn(
                "flex flex-col items-center justify-center w-16 py-2.5 rounded-xl transition-all border focus-ring", 
                selectedDate.formatted === date.formatted
                  ? "bg-primary border-primary text-white shadow-sm"
                  : "bg-white border-border hover:border-primary"
              )}
              onClick={() => setSelectedDate(date)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="text-xs mb-1">{date.formatted}</span>
              <span className="text-sm font-medium">
                {new Date(date.date).getDate()}
              </span>
            </motion.button>
          ))}
        </div>
      </div>
      
      <div className="mb-2">
        <div className="flex items-center text-sm text-muted-foreground mb-4">
          <CalendarIcon className="h-4 w-4 mr-2" />
          <span>Available time slots for {selectedDate.formatted}</span>
        </div>
        
        <div className="grid grid-cols-3 gap-2">
          {mockTimeSlots.map((slot) => (
            <TimeSlot
              key={slot.id}
              time={slot.time}
              available={slot.available}
              selected={selectedTime === slot.time}
              onSelect={slot.available ? handleSelectTime : undefined}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookingCalendar;
