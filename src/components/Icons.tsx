
import React from "react";
import { 
  Briefcase, Calculator, BookOpen, Heart, Users, ShieldCheck, 
  Building, Palette, GraduationCap, Leaf, Globe, Home,
  Wallet, Cpu, BookText, type LucideIcon 
} from "lucide-react";

// Define the Icons record with proper typing
export const Icons: Record<string, LucideIcon> = {
  finance: Wallet,
  calculator: Calculator,
  health: Heart,
  education: GraduationCap,
  legal: BookOpen,
  technology: Cpu,
  business: Briefcase,
  environment: Leaf,
  art: Palette,
  social: Users,
  security: ShieldCheck,
  architecture: Building,
  international: Globe,
  realestate: Home,
  general: BookText,
  default: BookText
};

export default Icons;
