
import React from "react";
import { motion } from "framer-motion";
import { Clock, MapPin, Star, Award, Briefcase, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";
import AnimatedButton from "./AnimatedButton";

const ProfilePanel = ({
  professional,
  onBookNow
}) => {
  return (
    <motion.div
      className="bg-white rounded-2xl border border-border overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
    >
      <div className="p-6">
        <div className="flex items-start">
          <div className="mr-4">
            <div className="h-20 w-20 rounded-full overflow-hidden bg-secondary">
              <img 
                src={professional.avatar} 
                alt={professional.name}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          <div>
            <h2 className="text-xl font-medium mb-1">{professional.name}</h2>
            <p className="text-muted-foreground mb-2">{professional.title}</p>
            <div className="flex items-center mb-3">
              <div className="flex items-center mr-4">
                <Star className="h-4 w-4 text-yellow-500 mr-1" fill="currentColor" />
                <span className="text-sm font-medium mr-1">{professional.rating}</span>
                <span className="text-sm text-muted-foreground">({professional.reviewCount} reviews)</span>
              </div>
              <div className="flex items-center text-muted-foreground">
                <MapPin className="h-4 w-4 mr-1" />
                <span className="text-sm">{professional.location}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 my-6">
          <div className="rounded-xl bg-secondary/30 p-4">
            <div className="flex items-center mb-2">
              <Clock className="h-4 w-4 text-primary mr-2" />
              <h4 className="text-sm font-medium">Experience</h4>
            </div>
            <p className="text-sm">{professional.experience}</p>
          </div>
          <div className="rounded-xl bg-secondary/30 p-4">
            <div className="flex items-center mb-2">
              <DollarSign className="h-4 w-4 text-primary mr-2" />
              <h4 className="text-sm font-medium">Session Fee</h4>
            </div>
            <p className="text-sm">${professional.price}/hour</p>
          </div>
        </div>
        
        <div className="mb-6">
          <h3 className="text-base font-medium mb-3">About</h3>
          <p className="text-sm text-muted-foreground">
            {professional.about}
          </p>
        </div>
        
        <AnimatedButton 
          onClick={onBookNow}
          className="w-full"
          size="lg"
        >
          Book Consultation
        </AnimatedButton>
      </div>
    </motion.div>
  );
};

export default ProfilePanel;
