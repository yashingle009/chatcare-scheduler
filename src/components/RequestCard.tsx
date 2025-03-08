
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface RequestCardProps {
  client: string;
  type: string;
  time: string;
}

const RequestCard: React.FC<RequestCardProps> = ({ client, type, time }) => {
  return (
    <motion.div 
      className="p-4 bg-secondary/30 rounded-lg"
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex justify-between items-start mb-2">
        <div>
          <p className="font-semibold">{client}</p>
          <p className="text-sm text-muted-foreground">{type}</p>
          <p className="text-sm text-muted-foreground">{time}</p>
        </div>
      </div>
      <div className="flex space-x-2 mt-3">
        <Button size="sm" variant="default" className="bg-green-600 hover:bg-green-700">
          Accept
        </Button>
        <Button size="sm" variant="destructive">
          Decline
        </Button>
      </div>
    </motion.div>
  );
};

export default RequestCard;
