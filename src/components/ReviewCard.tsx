
import React from "react";
import { motion } from "framer-motion";

interface ReviewCardProps {
  name: string;
  rating: number;
  comment: string;
  date: string;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ name, rating, comment, date }) => {
  return (
    <motion.div 
      className="p-4 bg-secondary/30 rounded-lg"
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-center mb-2">
        <div className="flex text-yellow-400">
          {[...Array(rating)].map((_, i) => (
            <svg key={i} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          ))}
        </div>
      </div>
      <p className="text-sm text-foreground mb-2">{comment}</p>
      <div className="flex justify-between items-center text-xs">
        <p className="font-semibold">{name}</p>
        <p className="text-muted-foreground">{date}</p>
      </div>
    </motion.div>
  );
};

export default ReviewCard;
