
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Calendar as CalendarIcon, User, Settings, Clock, DollarSign, Calendar, BarChart, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import StatCard from "@/components/StatCard";
import AppointmentCard from "@/components/AppointmentCard";
import RequestCard from "@/components/RequestCard";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const ExpertDashboard = () => {
  const navigate = useNavigate();
  const { user, profile, loading } = useAuth();
  const [expertData, setExpertData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!loading) {
      if (!user) {
        navigate("/auth");
        return;
      }
      
      if (profile && profile.user_type !== "expert") {
        navigate("/");
        toast.error("You need an expert account to access this page");
        return;
      }
      
      fetchExpertData();
    }
  }, [user, loading, profile]);
  
  const fetchExpertData = async () => {
    try {
      setIsLoading(true);
      
      if (!user) return;
      
      const { data, error } = await supabase
        .from("experts")
        .select("*")
        .eq("id", user.id)
        .single();
      
      if (error) {
        throw error;
      }
      
      setExpertData(data);
    } catch (error: any) {
      console.error("Error fetching expert data:", error);
      if (error.code !== "PGRST116") { // Not found error
        toast.error("Failed to load expert data");
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  // Mock data for today's schedule
  const todayAppointments = [
    { time: "09:00 AM", client: "John Doe", type: "Financial Planning" },
    { time: "11:30 AM", client: "Alice Brown", type: "Retirement Planning" },
    { time: "3:00 PM", client: "Robert Smith", type: "Investment Review" }
  ];
  
  // Mock data for booking requests
  const pendingRequests = [
    { 
      id: "1", 
      client: "Michael Johnson", 
      service: "Tax Planning", 
      date: "Tomorrow", 
      time: "10:00 AM" 
    },
    { 
      id: "2", 
      client: "Sarah Williams", 
      service: "Business Consultation", 
      date: "Aug 25, 2023", 
      time: "2:30 PM" 
    }
  ];

  const handleProfileSetup = () => {
    navigate("/expert-profile");
  };
  
  if (loading || isLoading) {
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

  // If expert profile doesn't exist, show setup prompt
  if (!expertData) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-32 pb-16 px-6">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center py-12"
            >
              <User className="h-16 w-16 mx-auto text-primary/30 mb-4" />
              <h2 className="text-2xl font-bold mb-2">Complete Your Expert Profile</h2>
              <p className="text-muted-foreground max-w-md mx-auto mb-8">
                To start offering consultations, you need to set up your expert profile with your credentials, specializations, and services.
              </p>
              <Button 
                size="lg" 
                onClick={handleProfileSetup}
              >
                Set Up Your Profile
              </Button>
            </motion.div>
          </div>
        </main>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold mb-2">Expert Dashboard</h1>
                <p className="text-muted-foreground">
                  Manage your bookings, availability, and expert profile
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 mt-4 md:mt-0">
                <Button 
                  variant="outline" 
                  onClick={() => navigate("/expert-profile")}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Edit Profile
                </Button>
                <Button 
                  onClick={() => navigate("/expert-availability")}
                >
                  <Clock className="mr-2 h-4 w-4" />
                  Manage Availability
                </Button>
              </div>
            </div>
            
            {/* Stats Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <StatCard 
                title="Total Consultations" 
                value="24" 
                info="+4 from last month" 
                icon={<Users />} 
              />
              <StatCard 
                title="Today's Sessions" 
                value="3" 
                info="2 upcoming" 
                icon={<Calendar />} 
              />
              <StatCard 
                title="Rating" 
                value="4.8" 
                info="From 16 reviews" 
                icon={<BarChart />} 
              />
              <StatCard 
                title="Earnings" 
                value="$1,250" 
                info="This month" 
                icon={<DollarSign />} 
              />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Today's Schedule */}
              <Card className="h-full">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div className="space-y-1">
                    <CardTitle>Today's Schedule</CardTitle>
                    <CardDescription>Your upcoming appointments for today</CardDescription>
                  </div>
                  <Button 
                    variant="outline"
                    onClick={() => navigate("/expert-bookings")}
                  >
                    All Bookings
                  </Button>
                </CardHeader>
                <CardContent>
                  {todayAppointments.length > 0 ? (
                    <div className="space-y-3">
                      {todayAppointments.map((appointment, index) => (
                        <AppointmentCard
                          key={index}
                          time={appointment.time}
                          client={appointment.client}
                          type={appointment.type}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-48">
                      <CalendarIcon className="h-10 w-10 text-muted-foreground/30" />
                      <p className="mt-2 text-muted-foreground">No appointments scheduled for today</p>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              {/* Booking Requests */}
              <Card className="h-full">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div className="space-y-1">
                    <CardTitle>Booking Requests</CardTitle>
                    <CardDescription>Pending consultation requests</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  {pendingRequests.length > 0 ? (
                    <div className="space-y-3">
                      {pendingRequests.map((request) => (
                        <RequestCard
                          key={request.id}
                          id={request.id}
                          client={request.client}
                          service={request.service}
                          date={request.date}
                          time={request.time}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-48">
                      <Users className="h-10 w-10 text-muted-foreground/30" />
                      <p className="mt-2 text-muted-foreground">No pending booking requests</p>
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

export default ExpertDashboard;
