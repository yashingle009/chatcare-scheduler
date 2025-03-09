
import React from "react";
import { Clock, User, CheckCircle, XCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export interface RequestCardProps {
  id?: string;
  client: string;
  service: string;
  date: string;
  time: string;
}

const RequestCard = ({ id, client, service, date, time }: RequestCardProps) => {
  const handleAccept = () => {
    toast.success(`Booking from ${client} accepted`);
  };

  const handleDecline = () => {
    toast.success(`Booking from ${client} declined`);
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex flex-col space-y-3">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center">
                <User className="h-4 w-4 mr-2 text-muted-foreground" />
                <h4 className="font-medium">{client}</h4>
              </div>
              <p className="text-sm text-muted-foreground mt-1">{service}</p>
            </div>
            <div className="text-sm text-right">
              <div>{date}</div>
              <div className="flex items-center mt-1 justify-end">
                <Clock className="h-3 w-3 mr-1 text-muted-foreground" />
                <span>{time}</span>
              </div>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full"
              onClick={handleAccept}
            >
              <CheckCircle className="h-4 w-4 mr-1" />
              Accept
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full text-destructive border-destructive hover:bg-destructive/10"
              onClick={handleDecline}
            >
              <XCircle className="h-4 w-4 mr-1" />
              Decline
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RequestCard;
