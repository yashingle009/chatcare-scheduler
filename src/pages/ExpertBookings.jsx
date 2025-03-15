
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Calendar, Clock, User, Video, Phone, MessageSquare, ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

// Mock data for bookings
const mockUpcomingBookings = [
  {
    id: "1",
    clientName: "John Doe",
    dateTime: new Date(Date.now() + 24 * 60 * 60 * 1000),
    mode: "video",
    query: "I need help with retirement planning strategies",
    status: "confirmed"
  },
  {
    id: "2",
    clientName: "Jane Smith",
    dateTime: new Date(Date.now() + 48 * 60 * 60 * 1000),
    mode: "audio",
    query: "Looking for advice on investment portfolio diversification",
    status: "confirmed"
  },
  {
    id: "3",
    clientName: "Robert Johnson",
    dateTime: new Date(Date.now() + 72 * 60 * 60 * 1000),
    mode: "chat",
    query: "Need tax planning advice for small business",
    status: "pending"
  }
];

const mockPastBookings = [
  {
    id: "4",
    clientName: "Alice Brown",
    dateTime: new Date(Date.now() - 24 * 60 * 60 * 1000),
    mode: "video",
    query: "Needed help with estate planning",
    status: "completed",
    rating: 5,
    review: "Excellent advice, very clear and helpful."
  },
  {
    id: "5",
    clientName: "Michael Wilson",
    dateTime: new Date(Date.now() - 72 * 60 * 60 * 1000),
    mode: "audio",
    query: "Wanted advice on mortgage refinancing",
    status: "completed",
    rating: 4,
    review: "Good consultation, provided useful insights."
  }
];

const ExpertBookings = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState("upcoming");

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
      return;
    }
  }, [user, loading]);

  const handleJoinMeeting = (bookingId) => {
    // Placeholder for joining meeting functionality
    toast.success("Joining meeting...");
  };

  const handleCancelBooking = (bookingId) => {
    toast.success("Booking cancelled successfully");
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true
    });
  };

  const renderModeIcon = (mode) => {
    switch (mode) {
      case "video":
        return <Video className="h-4 w-4 text-primary" />;
      case "audio":
        return <Phone className="h-4 w-4 text-primary" />;
      case "chat":
        return <MessageSquare className="h-4 w-4 text-primary" />;
      default:
        return null;
    }
  };

  const renderStatusBadge = (status) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-green-500">Confirmed</Badge>;
      case "pending":
        return <Badge className="bg-yellow-500">Pending</Badge>;
      case "completed":
        return <Badge className="bg-blue-500">Completed</Badge>;
      case "cancelled":
        return <Badge variant="destructive">Cancelled</Badge>;
      default:
        return null;
    }
  };

  const renderRatingStars = (rating) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`h-4 w-4 ${i < rating ? "text-yellow-400" : "text-gray-300"}`}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
          </svg>
        ))}
      </div>
    );
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
            
            <h1 className="text-3xl font-bold mb-2">My Bookings</h1>
            <p className="text-muted-foreground mb-8">Manage your consultations and reviews</p>

            <Tabs defaultValue="upcoming" onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="past">Past & Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="upcoming">
                {mockUpcomingBookings.length > 0 ? (
                  <div className="space-y-4">
                    {mockUpcomingBookings.map((booking) => (
                      <Card key={booking.id} className="overflow-hidden">
                        <CardContent className="p-6">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                            <div className="mb-4 md:mb-0">
                              <div className="flex items-center mb-2">
                                <User className="h-4 w-4 mr-2 text-muted-foreground" />
                                <h3 className="font-medium">{booking.clientName}</h3>
                                <div className="ml-2">
                                  {renderStatusBadge(booking.status)}
                                </div>
                              </div>
                              
                              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                                <div className="flex items-center">
                                  <Calendar className="h-4 w-4 mr-1" />
                                  <span>{formatDate(booking.dateTime)}</span>
                                </div>
                                <div className="flex items-center">
                                  <Clock className="h-4 w-4 mr-1" />
                                  <span>{formatTime(booking.dateTime)}</span>
                                </div>
                                <div className="flex items-center">
                                  {renderModeIcon(booking.mode)}
                                  <span className="ml-1 capitalize">{booking.mode}</span>
                                </div>
                              </div>
                              
                              {booking.query && (
                                <div className="mt-3 p-3 bg-secondary/30 rounded-md text-sm">
                                  <span className="font-medium">Client Query:</span> {booking.query}
                                </div>
                              )}
                            </div>
                            
                            <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
                              <Button 
                                onClick={() => handleJoinMeeting(booking.id)}
                                disabled={new Date() < new Date(booking.dateTime.getTime() - 10 * 60 * 1000)}
                              >
                                Join
                              </Button>
                              <Button 
                                variant="outline" 
                                onClick={() => handleCancelBooking(booking.id)}
                              >
                                Cancel
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No upcoming bookings</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="past">
                {mockPastBookings.length > 0 ? (
                  <div className="space-y-4">
                    {mockPastBookings.map((booking) => (
                      <Card key={booking.id} className="overflow-hidden">
                        <CardContent className="p-6">
                          <div className="flex flex-col">
                            <div className="flex items-center mb-2">
                              <User className="h-4 w-4 mr-2 text-muted-foreground" />
                              <h3 className="font-medium">{booking.clientName}</h3>
                              <div className="ml-2">
                                {renderStatusBadge(booking.status)}
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                              <div className="flex items-center">
                                <Calendar className="h-4 w-4 mr-1" />
                                <span>{formatDate(booking.dateTime)}</span>
                              </div>
                              <div className="flex items-center">
                                <Clock className="h-4 w-4 mr-1" />
                                <span>{formatTime(booking.dateTime)}</span>
                              </div>
                              <div className="flex items-center">
                                {renderModeIcon(booking.mode)}
                                <span className="ml-1 capitalize">{booking.mode}</span>
                              </div>
                            </div>
                            
                            {booking.rating && (
                              <div className="mt-2 border-t pt-3">
                                <div className="flex items-center mb-1">
                                  <span className="font-medium mr-2">Client Rating:</span>
                                  {renderRatingStars(booking.rating)}
                                </div>
                                {booking.review && (
                                  <p className="text-sm text-muted-foreground">
                                    "{booking.review}"
                                  </p>
                                )}
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No past bookings or reviews</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default ExpertBookings;
