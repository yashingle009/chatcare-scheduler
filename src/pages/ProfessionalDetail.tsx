
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { format, addDays } from "date-fns";
import { 
  Star, 
  MapPin, 
  Award, 
  Calendar, 
  Clock, 
  CheckCircle, 
  Languages, 
  User, 
  Video, 
  Phone, 
  MessageSquare, 
  ChevronLeft, 
  Briefcase,
  GraduationCap,
  BadgeCheck
} from "lucide-react";
import { toast } from "sonner";
import Header from "@/components/Header";
import TimeSlot from "@/components/TimeSlot";
import AnimatedButton from "@/components/AnimatedButton";
import { mockCategories, mockReviews, mockTimeSlots } from "@/lib/supabase";
import { cn } from "@/lib/utils";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";

const ProfessionalDetail = () => {
  const navigate = useNavigate();
  const { professionalId } = useParams();
  const location = useLocation();
  
  // Professional data state
  const [professional, setProfessional] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Booking state
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [consultationType, setConsultationType] = useState("video");

  useEffect(() => {
    fetchProfessionalData();
  }, [professionalId]);

  const fetchProfessionalData = async () => {
    try {
      setLoading(true);
      
      if (!professionalId) {
        toast.error("Professional ID is missing");
        navigate("/professionals");
        return;
      }
      
      // Fetch expert data with related profile data
      const { data: expertData, error: expertError } = await supabase
        .from('experts')
        .select(`
          *,
          profiles:id (first_name, last_name, avatar_url, bio)
        `)
        .eq('id', professionalId)
        .single();
      
      if (expertError) {
        console.error("Error fetching professional data:", expertError);
        toast.error("Failed to load professional information");
        navigate("/professionals");
        return;
      }
      
      // Set profile data
      const profileInfo = expertData.profiles;
      setProfileData(profileInfo);
      
      // Transform expert data for component
      const professionalData = {
        id: expertData.id,
        name: `${profileInfo.first_name || ''} ${profileInfo.last_name || ''}`.trim() || 'Unnamed Professional',
        title: expertData.title || "Professional Consultant",
        avatar: profileInfo.avatar_url || "/placeholder.svg",
        rating: 4.8, // Placeholder
        reviewCount: 24, // Placeholder
        experience: expertData.experience || "5+ years experience",
        bio: profileInfo.bio || expertData.bio || "No bio available",
        location: expertData.location || "Remote",
        languages: expertData.languages || ["English"],
        specializations: expertData.specializations || ["Consulting"],
        education: expertData.education || "Master's Degree in Business Administration",
        verifiedStatus: expertData.verified_status || false,
        categoryId: expertData.category_id,
      };
      
      setProfessional(professionalData);
      
      // Set mock services for now
      setServices([
        {
          id: 1,
          name: "Initial Consultation",
          price: expertData.price || 100,
          duration: "60 minutes",
          description: "Comprehensive evaluation to understand your specific needs and goals."
        },
        {
          id: 2,
          name: "Follow-up Session",
          price: (expertData.price * 0.8) || 80,
          duration: "45 minutes",
          description: "Review progress and make adjustments to your personalized plan."
        },
        {
          id: 3,
          name: "Premium Consultation Package",
          price: (expertData.price * 2.5) || 250,
          duration: "3 x 60 minutes",
          description: "Complete consultation package with three sessions and email support."
        }
      ]);
      
      // Set default selected service
      if (services.length > 0) {
        setSelectedService(services[0]);
      }
      
      // Fetch reviews - using mock data for now
      const professionalReviews = mockReviews.filter(r => r.professionalId === parseInt(professionalId));
      setReviews(professionalReviews);
    } catch (error) {
      console.error("Error in fetching professional:", error);
      toast.error("Failed to load professional details");
      navigate("/professionals");
    } finally {
      setLoading(false);
    }
  };

  // Handle date selection
  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedTimeSlot(null); // Reset time slot when date changes
  };

  // Handle time slot selection
  const handleTimeSlotSelect = (time) => {
    setSelectedTimeSlot(time);
  };

  // Handle service selection
  const handleServiceSelect = (service) => {
    setSelectedService(service);
  };

  // Handle consultation type selection
  const handleConsultationTypeChange = (value) => {
    setConsultationType(value);
  };

  // Calculate total price
  const calculateTotal = () => {
    if (!selectedService) return 0;
    return selectedService.price;
  };

  // Handle booking submission
  const handleBookAppointment = () => {
    if (!selectedService || !selectedDate || !selectedTimeSlot) {
      toast.error("Please select a service, date, and time slot");
      return;
    }

    // In a real app, this would make an API call to book the appointment
    toast.success("Appointment booked successfully!");
    
    // Show details of the booking
    toast(`Booked: ${selectedService.name} with ${professional.name} on ${format(selectedDate, 'PPP')} at ${selectedTimeSlot}`);
  };

  // Get the category name for this professional
  const getCategoryName = (categoryId) => {
    const category = mockCategories.find(c => c.id === categoryId);
    return category ? category.name : "";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-28 pb-16 px-6">
          <div className="max-w-4xl mx-auto flex justify-center items-center py-12">
            <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mr-3"></div>
            <p>Loading professional profile...</p>
          </div>
        </main>
      </div>
    );
  }

  if (!professional) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-28 pb-16 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-muted-foreground">Professional not found</p>
            <AnimatedButton
              onClick={() => navigate("/professionals")}
              className="mt-4"
            >
              Browse Professionals
            </AnimatedButton>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-28 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.button
            className="flex items-center text-sm text-muted-foreground mb-6 hover:text-foreground"
            onClick={() => navigate(-1)}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            <span>Back to search results</span>
          </motion.button>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Professional Profile Section (Left) */}
            <motion.div 
              className="lg:col-span-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {/* Header with avatar and basic info */}
              <div className="bg-white rounded-2xl p-6 md:p-8 border border-border mb-8">
                <div className="flex flex-col md:flex-row md:items-start">
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden mb-4 md:mb-0 md:mr-6 bg-secondary flex-shrink-0">
                    <img 
                      src={professional.avatar} 
                      alt={professional.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center flex-wrap">
                      <h1 className="text-2xl md:text-3xl font-bold mr-2">{professional.name}</h1>
                      {professional.verifiedStatus && (
                        <BadgeCheck className="h-5 w-5 text-primary" />
                      )}
                    </div>
                    
                    <div className="flex items-center mt-1 mb-2">
                      <p className="text-lg text-muted-foreground">{professional.title}</p>
                      <span className="mx-2 text-muted-foreground">•</span>
                      <span className="text-sm text-muted-foreground">{getCategoryName(professional.categoryId)}</span>
                    </div>
                    
                    <div className="flex items-center mb-3">
                      <Star className="h-5 w-5 text-yellow-500 mr-1" fill="currentColor" />
                      <span className="font-medium mr-1">{professional.rating}</span>
                      <span className="text-muted-foreground">({professional.reviewCount} reviews)</span>
                    </div>
                    
                    <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4">
                      <div className="flex items-center text-muted-foreground">
                        <Briefcase className="h-4 w-4 mr-1" />
                        <span className="text-sm">{professional.experience}</span>
                      </div>
                      
                      <div className="flex items-center text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span className="text-sm">{professional.location}</span>
                      </div>
                      
                      <div className="flex items-center text-muted-foreground">
                        <Languages className="h-4 w-4 mr-1" />
                        <span className="text-sm">{professional.languages.join(", ")}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Tabs for About, Services, Reviews */}
              <Tabs defaultValue="about" className="mb-8">
                <TabsList className="mb-6">
                  <TabsTrigger value="about">About</TabsTrigger>
                  <TabsTrigger value="services">Services</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>
                
                <TabsContent value="about" className="space-y-6">
                  {/* Bio */}
                  <div className="bg-white rounded-xl p-6 border border-border">
                    <h2 className="text-xl font-semibold mb-4">Bio</h2>
                    <p className="text-muted-foreground">{professional.bio}</p>
                  </div>
                  
                  {/* Specializations */}
                  <div className="bg-white rounded-xl p-6 border border-border">
                    <h2 className="text-xl font-semibold mb-4">Specializations</h2>
                    <div className="flex flex-wrap gap-2">
                      {professional.specializations.map((spec, index) => (
                        <span 
                          key={index} 
                          className="px-3 py-1.5 bg-secondary/50 text-sm rounded-full"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Education */}
                  <div className="bg-white rounded-xl p-6 border border-border">
                    <h2 className="text-xl font-semibold mb-4">Education</h2>
                    <div className="space-y-3">
                      {professional.education.split('\n').map((education, index) => (
                        <div key={index} className="flex items-start">
                          <GraduationCap className="h-5 w-5 text-muted-foreground mr-2 mt-0.5" />
                          <span>{education}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="services" className="space-y-6">
                  {services.map((service) => (
                    <div 
                      key={service.id}
                      className={cn(
                        "bg-white rounded-xl p-6 border transition-colors",
                        selectedService?.id === service.id 
                          ? "border-primary/50 ring-1 ring-primary/20" 
                          : "border-border hover:border-primary/30"
                      )}
                      onClick={() => handleServiceSelect(service)}
                      role="button"
                      tabIndex={0}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-medium">{service.name}</h3>
                        <div className="text-right">
                          <p className="text-xl font-semibold">${service.price}</p>
                          <p className="text-sm text-muted-foreground">{service.duration}</p>
                        </div>
                      </div>
                      <p className="text-muted-foreground">{service.description}</p>
                    </div>
                  ))}
                </TabsContent>
                
                <TabsContent value="reviews" className="space-y-6">
                  {reviews.length > 0 ? (
                    reviews.map((review) => (
                      <div 
                        key={review.id}
                        className="bg-white rounded-xl p-6 border border-border"
                      >
                        <div className="flex items-start">
                          <div className="w-10 h-10 rounded-full overflow-hidden bg-secondary mr-3">
                            <img 
                              src={review.avatar} 
                              alt={review.author} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h3 className="font-medium">{review.author}</h3>
                              <span className="text-sm text-muted-foreground">{review.date}</span>
                            </div>
                            
                            <div className="flex items-center my-1">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i}
                                  className="h-4 w-4 mr-0.5" 
                                  fill={i < review.rating ? "currentColor" : "none"}
                                  color={i < review.rating ? "#f59e0b" : "#d1d5db"}
                                />
                              ))}
                            </div>
                            
                            <p className="text-muted-foreground mt-2">{review.comment}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-10">
                      <p className="text-muted-foreground">No reviews yet</p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </motion.div>
            
            {/* Booking Section (Right) */}
            <motion.div 
              className="lg:col-span-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <div className="bg-white rounded-2xl p-6 border border-border sticky top-36">
                <h2 className="text-xl font-semibold mb-5">Book an Appointment</h2>
                
                {/* Service selection (mobile only - shown as summary on desktop) */}
                <div className="lg:hidden mb-6">
                  <label className="block text-sm font-medium mb-2">Select Service</label>
                  <select 
                    className="w-full p-2 border border-input rounded-md"
                    value={selectedService?.id}
                    onChange={(e) => {
                      const serviceId = parseInt(e.target.value);
                      const service = services.find(s => s.id === serviceId);
                      handleServiceSelect(service);
                    }}
                  >
                    {services.map((service) => (
                      <option key={service.id} value={service.id}>
                        {service.name} - ${service.price} ({service.duration})
                      </option>
                    ))}
                  </select>
                </div>
                
                {/* Selected service summary (desktop) */}
                <div className="hidden lg:block mb-6">
                  <label className="block text-sm font-medium mb-2">Selected Service</label>
                  {selectedService && (
                    <div className="p-3 bg-secondary/30 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">{selectedService.name}</p>
                          <p className="text-sm text-muted-foreground">{selectedService.duration}</p>
                        </div>
                        <p className="font-semibold">${selectedService.price}</p>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Date picker */}
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">Select Date</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <button
                        className="w-full flex items-center justify-between p-3 rounded-lg border border-input bg-background hover:bg-secondary/20 transition-colors"
                      >
                        <span>{format(selectedDate, 'MMMM d, yyyy')}</span>
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarComponent
                        mode="single"
                        selected={selectedDate}
                        onSelect={handleDateSelect}
                        initialFocus
                        disabled={(date) => date < new Date()}
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                {/* Time slots */}
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">Select Time</label>
                  <div className="grid grid-cols-3 gap-2">
                    {mockTimeSlots.map((slot) => (
                      <TimeSlot
                        key={slot.id}
                        time={slot.time}
                        available={slot.available}
                        selected={selectedTimeSlot === slot.time}
                        onSelect={handleTimeSlotSelect}
                      />
                    ))}
                  </div>
                </div>
                
                {/* Consultation type */}
                <div className="mb-8">
                  <label className="block text-sm font-medium mb-2">Consultation Method</label>
                  <RadioGroup 
                    value={consultationType} 
                    onValueChange={handleConsultationTypeChange}
                    className="flex flex-col space-y-1"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="video" id="video" />
                      <Label htmlFor="video" className="flex items-center">
                        <Video className="h-4 w-4 mr-2" />
                        <span>Video Call</span>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="audio" id="audio" />
                      <Label htmlFor="audio" className="flex items-center">
                        <Phone className="h-4 w-4 mr-2" />
                        <span>Audio Call</span>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="chat" id="chat" />
                      <Label htmlFor="chat" className="flex items-center">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        <span>Chat</span>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
                
                {/* Price summary */}
                <div className="pt-4 mb-6 border-t border-border">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-muted-foreground">Consultation Fee</span>
                    <span>${selectedService?.price || 0}</span>
                  </div>
                  <div className="flex justify-between items-center font-semibold text-lg">
                    <span>Total</span>
                    <span>${calculateTotal()}</span>
                  </div>
                </div>
                
                {/* Book button */}
                <AnimatedButton
                  onClick={handleBookAppointment}
                  className="w-full"
                  disabled={!selectedService || !selectedDate || !selectedTimeSlot}
                >
                  Book Appointment
                </AnimatedButton>
                
                <p className="text-xs text-center text-muted-foreground mt-3">
                  You won't be charged until after the consultation
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfessionalDetail;
