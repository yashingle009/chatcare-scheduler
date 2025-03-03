
import { format, isToday, isYesterday, isTomorrow, addDays } from 'date-fns';

export const formatDate = (date: Date): string => {
  if (isToday(date)) return 'Today';
  if (isYesterday(date)) return 'Yesterday';
  if (isTomorrow(date)) return 'Tomorrow';
  
  return format(date, 'EEE, MMM d');
};

export const getNextSevenDays = (): { date: Date; formatted: string }[] => {
  const dates = [];
  const today = new Date();
  
  for (let i = 0; i < 7; i++) {
    const date = addDays(today, i);
    dates.push({
      date,
      formatted: formatDate(date)
    });
  }
  
  return dates;
};

export const formatTime = (dateString: string): string => {
  const date = new Date(dateString);
  return format(date, 'h:mm a');
};

export const formatDuration = (minutes: number): string => {
  if (minutes < 60) return `${minutes} mins`;
  
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  if (remainingMinutes === 0) return `${hours} ${hours === 1 ? 'hour' : 'hours'}`;
  
  return `${hours} ${hours === 1 ? 'hour' : 'hours'} ${remainingMinutes} mins`;
};
