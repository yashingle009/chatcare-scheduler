
import React from "react";
import { motion } from "framer-motion";
import { Briefcase, Calculator, Scale, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface CategoryCardProps {
  id: number;
  name: string;
  icon: string;
  description: string;
  count: number;
  onClick: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ 
  id, 
  name, 
  icon, 
  description, 
  count, 
  onClick 
}) => {
  const getIcon = () => {
    switch (icon) {
      case "calculator":
        return <Calculator className="h-6 w-6 text-primary" />;
      case "scale":
        return <Scale className="h-6 w-6 text-primary" />;
      case "briefcase":
        return <Briefcase className="h-6 w-6 text-primary" />;
      case "trending-up":
        return <TrendingUp className="h-6 w-6 text-primary" />;
      default:
        return <Briefcase className="h-6 w-6 text-primary" />;
    }
  };

  return (
    <motion.div
      className={cn(
        "relative rounded-2xl bg-white border border-border overflow-hidden",
        "transition-all duration-300 ease-apple cursor-pointer",
        "hover:shadow-elevated hover:-translate-y-1"
      )}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1], delay: id * 0.1 }}
    >
      <div className="p-6">
        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
          {getIcon()}
        </div>
        <h3 className="text-lg font-medium mb-2">{name}</h3>
        <p className="text-muted-foreground text-sm mb-3">{description}</p>
        <div className="text-xs text-muted-foreground">
          {count} professionals available
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary/10">
        <motion.div
          className="h-full bg-primary"
          initial={{ width: 0 }}
          whileInView={{ width: "40%" }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.23, 1, 0.32, 1], delay: 0.2 }}
        />
      </div>
    </motion.div>
  );
};

export default CategoryCard;
