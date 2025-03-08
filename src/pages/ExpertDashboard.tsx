
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, ChartLine, FileText, Settings, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import AppointmentCard from "@/components/AppointmentCard";
import RequestCard from "@/components/RequestCard";
import ReviewCard from "@/components/ReviewCard";
import StatCard from "@/components/StatCard";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const ExpertDashboard = () => {
  const navigate = useNavigate();
  const { profile, user } = useAuth();
  const [showAvailabilityModal, setShowAvailabilityModal] = useState(false);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [loading, setLoading] = useState(true);
  
  // State for expert-related data
  const [expertData, setExpertData] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [stats, setStats] = useState({
    totalAppointments: 0,
    totalEarnings: 0,
    averageRating: 0,
    nextAppointment: null
  });

  useEffect(() => {
    // Redirect if not an expert
    if (profile && profile.user_type !== "expert") {
      navigate("/");
      return;
    }

    // Fetch expert data if authenticated
    if (user) {
      fetchExpertData();
    }
  }, [profile, navigate, user]);

  const fetchExpertData = async () => {
    try {
      setLoading(true);
      
      // Fetch expert profile data
      const { data: expertData, error: expertError } = await supabase
        .from("experts")
        .select("*")
        .eq("id", user.id)
        .single();

      if (expertError) {
        console.error("Error fetching expert data:", expertError);
        toast.error("Failed to load expert data");
      } else {
        setExpertData(expertData);
      }

      // For demonstration, using mock data but in a real app you'd fetch this from Supabase
      // You would create tables for appointments, requests, reviews etc.
      setAppointments([
        { time: "10:00 AM", client: "Emily Thompson", type: "Video Call" },
        { time: "2:30 PM", client: "Sarah Williams", type: "In Person" },
        { time: "4:00 PM", client: "James Chen", type: "Phone Call" }
      ]);
      
      setPendingRequests([
        { client: "Michael Brown", type: "Business Strategy", time: "Tomorrow, 11:00 AM" },
        { client: "Lisa Anderson", type: "Consultation", time: "Mar 1, 2:00 PM" }
      ]);
      
      setReviews([
        {
          name: "Emma Watson",
          rating: 5,
          comment: "Exceptional insights and practical advice. Dr. Mitchell helped transform our business strategy.",
          date: "2 days ago"
        },
        {
          name: "David Clark",
          rating: 5,
          comment: "Brilliant consultant with deep industry knowledge. Highly recommended!",
          date: "1 week ago"
        }
      ]);
      
      setStats({
        totalAppointments: 247,
        totalEarnings: 24850,
        averageRating: 4.9,
        nextAppointment: {
          client: "Sarah Williams",
          type: "Strategic Planning Session",
          time: "Today at 2:30 PM"
        }
      });
      
    } catch (error) {
      console.error("Error in fetching expert data:", error);
      toast.error("An error occurred while loading dashboard data");
    } finally {
      setLoading(false);
    }
  };

  if (!profile || profile.user_type !== "expert") {
    return null; // Don't render anything if not an expert (will redirect)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-28 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Expert info section */}
          <motion.div 
            className="bg-white rounded-lg shadow-sm border border-border p-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="flex flex-col md:flex-row md:items-center">
                <div className="h-16 w-16 bg-primary/20 rounded-full flex items-center justify-center text-primary text-2xl font-bold mb-4 md:mb-0">
                  {profile.first_name ? profile.first_name[0] : ''}
                  {profile.last_name ? profile.last_name[0] : ''}
                </div>
                <div className="md:ml-4">
                  <h1 className="text-2xl font-bold">
                    {profile.first_name} {profile.last_name}
                  </h1>
                  <p className="text-muted-foreground">
                    {expertData?.title || "Professional Consultant"}
                  </p>
                </div>
              </div>
              <div className="mt-4 md:mt-0 bg-primary/10 text-primary rounded-lg px-4 py-2">
                <p>You have {appointments.length} new appointments today</p>
              </div>
            </div>
          </motion.div>
        
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard 
              title="Total Appointments"
              value={stats.totalAppointments.toString()}
              subtitle="This month"
              details={[
                { label: "Completed", value: "185", color: "text-green-600" },
                { label: "Pending", value: "42", color: "text-yellow-600" },
                { label: "Canceled", value: "20", color: "text-red-600" }
              ]}
            />
            
            <StatCard 
              title="Total Earnings"
              value={`$${stats.totalEarnings.toLocaleString()}`}
              subtitle="This month"
              chart={true}
            />
            
            <StatCard 
              title="Average Rating"
              value={stats.averageRating.toString()}
              subtitle="From 189 reviews"
              showStars={true}
            />
            
            <StatCard 
              title="Next Appointment"
              customContent={
                stats.nextAppointment ? (
                  <div>
                    <p className="text-xl font-semibold">{stats.nextAppointment.client}</p>
                    <p className="text-sm text-muted-foreground">{stats.nextAppointment.type}</p>
                    <p className="text-sm text-primary mt-2 flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      {stats.nextAppointment.time}
                    </p>
                  </div>
                ) : (
                  <p className="text-muted-foreground">No upcoming appointments</p>
                )
              }
            />
          </div>
          
          {/* Appointments and Reviews Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <motion.div 
              className="bg-white rounded-lg shadow-sm border border-border"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4">Today's Appointments</h3>
                {appointments.length > 0 ? (
                  <div className="space-y-4">
                    {appointments.map((appointment, index) => (
                      <AppointmentCard 
                        key={index}
                        time={appointment.time}
                        client={appointment.client}
                        type={appointment.type}
                      />
                    ))}
                  </div>
                ) : (
                  <p className="text-center py-6 text-muted-foreground">No appointments scheduled for today</p>
                )}
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-white rounded-lg shadow-sm border border-border"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4">Pending Requests</h3>
                {pendingRequests.length > 0 ? (
                  <div className="space-y-4">
                    {pendingRequests.map((request, index) => (
                      <RequestCard 
                        key={index}
                        client={request.client}
                        type={request.type}
                        time={request.time}
                      />
                    ))}
                  </div>
                ) : (
                  <p className="text-center py-6 text-muted-foreground">No pending requests</p>
                )}
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-white rounded-lg shadow-sm border border-border"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4">Recent Reviews</h3>
                {reviews.length > 0 ? (
                  <div className="space-y-4">
                    {reviews.map((review, index) => (
                      <ReviewCard 
                        key={index}
                        name={review.name}
                        rating={review.rating}
                        comment={review.comment}
                        date={review.date}
                      />
                    ))}
                  </div>
                ) : (
                  <p className="text-center py-6 text-muted-foreground">No reviews yet</p>
                )}
              </div>
            </motion.div>
          </div>
          
          {/* Quick Actions */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {[
              { icon: <Calendar className="h-6 w-6" />, title: "Manage Availability", action: () => setShowAvailabilityModal(true) },
              { icon: <ChartLine className="h-6 w-6" />, title: "View Analytics", action: () => {} },
              { icon: <FileText className="h-6 w-6" />, title: "Financial Reports", action: () => {} },
              { icon: <Settings className="h-6 w-6" />, title: "Settings", action: () => {} }
            ].map((action, index) => (
              <Button
                key={index}
                variant="outline"
                className="flex flex-col items-center justify-center h-28 bg-white"
                onClick={action.action}
              >
                <div className="text-primary mb-2">{action.icon}</div>
                <span className="font-medium">{action.title}</span>
              </Button>
            ))}
          </motion.div>
        </div>
      </main>
      
      {/* Availability Modal */}
      {showAvailabilityModal && (
        <AvailabilityModal
          selectedTimeSlot={selectedTimeSlot}
          setSelectedTimeSlot={setSelectedTimeSlot}
          onClose={() => setShowAvailabilityModal(false)}
        />
      )}
    </div>
  );
};

// Availability Modal Component
const AvailabilityModal = ({ selectedTimeSlot, setSelectedTimeSlot, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Set Availability</h3>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <span className="sr-only">Close</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </Button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Select Time Slot
            </label>
            <select
              value={selectedTimeSlot}
              onChange={(e) => setSelectedTimeSlot(e.target.value)}
              className="w-full border border-input rounded-md px-3 py-2"
            >
              <option value="">Choose a time slot</option>
              <option value="morning">Morning (9 AM - 12 PM)</option>
              <option value="afternoon">Afternoon (1 PM - 5 PM)</option>
              <option value="evening">Evening (6 PM - 9 PM)</option>
            </select>
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button>
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpertDashboard;
