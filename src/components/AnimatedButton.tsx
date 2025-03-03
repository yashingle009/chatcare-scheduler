
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { buttonHoverScale, buttonTapScale } from "@/utils/animations";

interface AnimatedButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  children,
  onClick,
  variant = "primary",
  size = "md",
  className,
  disabled = false,
  icon,
  iconPosition = "left"
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-full font-medium focus-ring";
  
  const variantStyles = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    ghost: "bg-transparent hover:bg-secondary",
    outline: "bg-transparent border border-input hover:bg-secondary"
  };
  
  const sizeStyles = {
    sm: "h-9 px-4 text-sm",
    md: "h-10 px-5",
    lg: "h-12 px-8 text-lg"
  };
  
  const disabledStyles = disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer";
  
  const buttonContent = (
    <>
      {icon && iconPosition === "left" && <span className={cn("mr-2")}>{icon}</span>}
      {children}
      {icon && iconPosition === "right" && <span className={cn("ml-2")}>{icon}</span>}
    </>
  );
  
  return (
    <motion.button
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        disabledStyles,
        "transition-all duration-300 ease-apple",
        className
      )}
      onClick={disabled ? undefined : onClick}
      whileHover={disabled ? {} : buttonHoverScale}
      whileTap={disabled ? {} : buttonTapScale}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
    >
      {buttonContent}
    </motion.button>
  );
};

export default AnimatedButton;
