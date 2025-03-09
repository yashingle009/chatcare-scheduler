
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Calendar, Clock, Save, ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import TimeSlot from "@/components/TimeSlot";

const ExpertAvailability = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  // Time slots from 8 AM to 8 PM
  const allTimeSlots = [
    "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", 
    "6:00 PM", "7:00 PM", "8:00 PM"
  ];

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
      return;
    }

    if (selectedDate && user) {
      fetchAvailability();
    }
  }, [user, loading, selectedDate]);

  const fetchAvailability = async () => {
    try {
      if (!user || !selectedDate) return;

      // Format date for query
      const dateString = selectedDate.toISOString().split('T')[0];

      // This is a placeholder for actual availability fetching
      // In a real implementation, you would fetch from a database table
      setAvailableTimeSlots(["9:00 AM", "10:00 AM", "2:00 PM", "3:00 PM"]);

      toast.success("Availability loaded");
    } catch (error) {
      console.error("Error fetching availability:", error);
      toast.error("Failed to load availability");
    }
  };

  const toggleTimeSlot = (timeSlot: string) => {
    setAvailableTimeSlots(prev => {
      if (prev.includes(timeSlot)) {
        return prev.filter(slot => slot !== timeSlot);
      } else {
        return [...prev, timeSlot];
      }
    });
  };

  const saveAvailability = async () => {
    try {
      setIsSaving(true);
      
      // This is a placeholder for actual availability saving
      // In a real implementation, you would save to a database table
      
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      toast.success("Availability saved successfully");
    } catch (error) {
      console.error("Error saving availability:", error);
      toast.error("Failed to save availability");
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-32 pb-16 px-6 flex justify-center items-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
          <span className="ml-3">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-32 pb-16 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <button 
              onClick={() => navigate(-1)}
              className="flex items-center text-muted-foreground hover:text-foreground mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              <span className="text-sm">Back</span>
            </button>
            
            <h1 className="text-3xl font-bold mb-2">Manage Availability</h1>
            <p className="text-muted-foreground mb-8">Set your available time slots for consultations</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="md:col-span-1">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="mr-2 h-5 w-5 text-primary" />
                    Select Date
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CalendarComponent
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border"
                  />
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="mr-2 h-5 w-5 text-primary" />
                    Available Time Slots
                    {selectedDate && (
                      <span className="ml-2 text-sm font-normal text-muted-foreground">
                        for {selectedDate.toLocaleDateString()}
                      </span>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {selectedDate ? (
                    <>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                        {allTimeSlots.map((timeSlot) => (
                          <TimeSlot
                            key={timeSlot}
                            time={timeSlot}
                            selected={availableTimeSlots.includes(timeSlot)}
                            onClick={() => toggleTimeSlot(timeSlot)}
                            disabled={false}
                          />
                        ))}
                      </div>
                      
                      <div className="mt-6 flex justify-end">
                        <Button 
                          onClick={saveAvailability} 
                          disabled={isSaving}
                        >
                          {isSaving ? (
                            <>
                              <div className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                              Saving...
                            </>
                          ) : (
                            <>
                              <Save className="mr-2 h-4 w-4" />
                              Save Availability
                            </>
                          )}
                        </Button>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-muted-foreground">Please select a date to manage availability</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default ExpertAvailability;
