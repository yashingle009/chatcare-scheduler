
import React from "react";
import { motion } from "framer-motion";
import { Star, MapPin, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProfessionalCardProps {
  id: number;
  name: string;
  title: string;
  avatar: string;
  rating: number;
  reviewCount: number;
  experience: string;
  price: number;
  availableToday: boolean;
  location: string;
  onClick: () => void;
}

const ProfessionalCard: React.FC<ProfessionalCardProps> = ({
  id,
  name,
  title,
  avatar,
  rating,
  reviewCount,
  experience,
  price,
  availableToday,
  location,
  onClick
}) => {
  return (
    <motion.div
      className={cn(
        "rounded-2xl bg-white border border-border overflow-hidden",
        "transition-all duration-300 ease-apple cursor-pointer",
        "hover:shadow-elevated hover:-translate-y-1"
      )}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1], delay: id * 0.05 }}
    >
      <div className="p-5">
        <div className="flex items-center mb-4">
          <div className="relative mr-4">
            <div className="h-16 w-16 rounded-full overflow-hidden bg-secondary">
              <img 
                src={avatar} 
                alt={name}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            {availableToday && (
              <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-green-500 border-2 border-white" />
            )}
          </div>
          <div>
            <h3 className="text-base font-medium">{name}</h3>
            <p className="text-sm text-muted-foreground">{title}</p>
            <div className="flex items-center mt-1">
              <Star className="h-3.5 w-3.5 text-yellow-500 mr-1" fill="currentColor" />
              <span className="text-xs font-medium mr-1">{rating}</span>
              <span className="text-xs text-muted-foreground">({reviewCount})</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between text-sm mb-4">
          <div className="flex items-center text-muted-foreground">
            <Clock className="h-3.5 w-3.5 mr-1" />
            <span className="text-xs">{experience}</span>
          </div>
          <div className="flex items-center text-muted-foreground">
            <MapPin className="h-3.5 w-3.5 mr-1" />
            <span className="text-xs">{location}</span>
          </div>
        </div>
        
        <div className="pt-3 border-t border-border flex items-center justify-between">
          <div>
            <span className="text-lg font-medium">${price}</span>
            <span className="text-sm text-muted-foreground">/session</span>
          </div>
          <div className={cn(
            "px-3 py-1 rounded-full text-xs font-medium",
            availableToday 
              ? "bg-green-100 text-green-700" 
              : "bg-yellow-100 text-yellow-700"
          )}>
            {availableToday ? "Available today" : "Next available: Tomorrow"}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfessionalCard;
