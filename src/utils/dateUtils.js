
import { format, isToday, isYesterday, isThisWeek } from "date-fns";

export function formatDate(date) {
  if (!date) return "";
  const dateObj = new Date(date);
  
  if (isToday(dateObj)) {
    return `Today at ${format(dateObj, "h:mm a")}`;
  } else if (isYesterday(dateObj)) {
    return `Yesterday at ${format(dateObj, "h:mm a")}`;
  } else if (isThisWeek(dateObj)) {
    return format(dateObj, "EEEE 'at' h:mm a");
  } else {
    return format(dateObj, "MMM d, yyyy 'at' h:mm a");
  }
}

export function formatTimeSlot(start, end) {
  if (!start || !end) return "";
  
  const startDate = new Date(start);
  const endDate = new Date(end);
  
  return `${format(startDate, "h:mm a")} - ${format(endDate, "h:mm a")}`;
}

export function getFormattedDateRange(startDate, endDate) {
  if (!startDate || !endDate) return "";
  
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  if (start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()) {
    return `${format(start, "MMMM d")} - ${format(end, "d, yyyy")}`;
  } else if (start.getFullYear() === end.getFullYear()) {
    return `${format(start, "MMMM d")} - ${format(end, "MMMM d, yyyy")}`;
  } else {
    return `${format(start, "MMMM d, yyyy")} - ${format(end, "MMMM d, yyyy")}`;
  }
}
