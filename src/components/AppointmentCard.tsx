
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface AppointmentCardProps {
  time: string;
  client: string;
  type: string;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({ time, client, type }) => {
  return (
    <motion.div 
      className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg"
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <div>
        <p className="font-semibold">{time}</p>
        <p className="text-foreground">{client}</p>
        <p className="text-sm text-muted-foreground">{type}</p>
      </div>
      <Button size="sm" className="whitespace-nowrap">
        Join
      </Button>
    </motion.div>
  );
};

export default AppointmentCard;
