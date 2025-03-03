
import React from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Star, MessageCircle, Video, Phone, Calendar } from "lucide-react";
import Header from "@/components/Header";
import ProfilePanel from "@/components/ProfilePanel";
import AnimatedButton from "@/components/AnimatedButton";
import { mockProfessionals } from "@/lib/supabase";
import { cn } from "@/lib/utils";

const ProfessionalDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const professionalId = Number(id);
  const professional = mockProfessionals.find(p => p.id === professionalId);
  
  if (!professional) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Professional Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The professional you're looking for doesn't exist or has been removed.
          </p>
          <button 
            onClick={() => navigate(-1)}
            className="text-primary hover:underline flex items-center justify-center mx-auto"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go Back
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-28 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.button
            onClick={() => navigate(-1)}
            className="flex items-center text-muted-foreground mb-8 hover:text-foreground focus-ring rounded-full px-2 py-1"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Search
          </motion.button>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <ProfilePanel
                professional={professional}
                onBookNow={() => navigate(`/booking/${professional.id}`)}
              />
            </div>
            
            <div className="md:col-span-2 space-y-8">
              <motion.div
                className="bg-white rounded-2xl border border-border overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1], delay: 0.1 }}
              >
                <div className="p-6">
                  <h2 className="text-xl font-medium mb-4">Consultation Options</h2>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="rounded-xl border border-border p-4 hover:border-primary/60 transition-all cursor-pointer">
                      <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-3">
                        <Video className="h-5 w-5" />
                      </div>
                      <h3 className="text-base font-medium mb-1">Video Call</h3>
                      <p className="text-sm text-muted-foreground">
                        Face-to-face consultation via video
                      </p>
                    </div>
                    
                    <div className="rounded-xl border border-border p-4 hover:border-primary/60 transition-all cursor-pointer">
                      <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-3">
                        <Phone className="h-5 w-5" />
                      </div>
                      <h3 className="text-base font-medium mb-1">Voice Call</h3>
                      <p className="text-sm text-muted-foreground">
                        Audio-only consultation
                      </p>
                    </div>
                    
                    <div className="rounded-xl border border-border p-4 hover:border-primary/60 transition-all cursor-pointer">
                      <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-3">
                        <MessageCircle className="h-5 w-5" />
                      </div>
                      <h3 className="text-base font-medium mb-1">Chat</h3>
                      <p className="text-sm text-muted-foreground">
                        Text-based consultation
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-border">
                    <h3 className="text-base font-medium mb-3">Duration & Pricing</h3>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 rounded-lg border border-border hover:border-primary/60 transition-all cursor-pointer">
                        <div>
                          <h4 className="font-medium">30 Minutes</h4>
                          <p className="text-sm text-muted-foreground">Brief consultation</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">${Math.round(professional.price * 0.5)}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 rounded-lg border border-primary bg-primary/5 cursor-pointer">
                        <div>
                          <h4 className="font-medium">60 Minutes</h4>
                          <p className="text-sm text-muted-foreground">Standard consultation</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">${professional.price}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 rounded-lg border border-border hover:border-primary/60 transition-all cursor-pointer">
                        <div>
                          <h4 className="font-medium">90 Minutes</h4>
                          <p className="text-sm text-muted-foreground">Extended consultation</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">${Math.round(professional.price * 1.5)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                className="bg-white rounded-2xl border border-border overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1], delay: 0.2 }}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-medium">Reviews & Ratings</h2>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 mr-1" fill="currentColor" />
                      <span className="font-medium">{professional.rating}</span>
                      <span className="text-muted-foreground ml-1">({professional.reviewCount})</span>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <div className="flex items-center mb-2">
                      <div className="w-28 text-sm">5 stars</div>
                      <div className="flex-1 bg-secondary rounded-full h-2">
                        <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "70%" }}></div>
                      </div>
                      <div className="ml-3 text-sm text-muted-foreground">70%</div>
                    </div>
                    <div className="flex items-center mb-2">
                      <div className="w-28 text-sm">4 stars</div>
                      <div className="flex-1 bg-secondary rounded-full h-2">
                        <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "20%" }}></div>
                      </div>
                      <div className="ml-3 text-sm text-muted-foreground">20%</div>
                    </div>
                    <div className="flex items-center mb-2">
                      <div className="w-28 text-sm">3 stars</div>
                      <div className="flex-1 bg-secondary rounded-full h-2">
                        <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "7%" }}></div>
                      </div>
                      <div className="ml-3 text-sm text-muted-foreground">7%</div>
                    </div>
                    <div className="flex items-center mb-2">
                      <div className="w-28 text-sm">2 stars</div>
                      <div className="flex-1 bg-secondary rounded-full h-2">
                        <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "2%" }}></div>
                      </div>
                      <div className="ml-3 text-sm text-muted-foreground">2%</div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-28 text-sm">1 star</div>
                      <div className="flex-1 bg-secondary rounded-full h-2">
                        <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "1%" }}></div>
                      </div>
                      <div className="ml-3 text-sm text-muted-foreground">1%</div>
                    </div>
                  </div>
                  
                  <div className="space-y-5">
                    <div className="pb-5 border-b border-border">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-secondary overflow-hidden mr-3">
                            <img 
                              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" 
                              alt="Client"
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="font-medium">John Smith</h4>
                            <p className="text-xs text-muted-foreground">2 weeks ago</p>
                          </div>
                        </div>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map(star => (
                            <Star 
                              key={star} 
                              className={cn(
                                "h-4 w-4",
                                star <= 5 ? "text-yellow-500" : "text-secondary"
                              )} 
                              fill="currentColor" 
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm">
                        {professional.name} provided excellent guidance for my tax planning needs. 
                        Very knowledgeable and helped me save a significant amount on my taxes.
                        I would highly recommend!
                      </p>
                    </div>
                    
                    <div className="pb-5 border-b border-border">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-secondary overflow-hidden mr-3">
                            <img 
                              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" 
                              alt="Client"
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="font-medium">Sarah Johnson</h4>
                            <p className="text-xs text-muted-foreground">1 month ago</p>
                          </div>
                        </div>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map(star => (
                            <Star 
                              key={star} 
                              className={cn(
                                "h-4 w-4",
                                star <= 4 ? "text-yellow-500" : "text-secondary"
                              )} 
                              fill="currentColor" 
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm">
                        Very professional and thorough. Answered all my questions and provided 
                        clear guidance on how to proceed with my case. The consultation was 
                        well worth the investment.
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-5 text-center">
                    <button className="text-primary hover:underline text-sm font-medium">
                      View all {professional.reviewCount} reviews
                    </button>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                className="bg-primary/10 rounded-2xl border border-primary/20 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1], delay: 0.3 }}
              >
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <Calendar className="h-5 w-5 text-primary mr-2" />
                    <h2 className="text-xl font-medium">Ready to Book?</h2>
                  </div>
                  
                  <p className="text-sm mb-5">
                    Select your preferred consultation time and get expert guidance from {professional.name}.
                  </p>
                  
                  <AnimatedButton
                    onClick={() => navigate(`/booking/${professional.id}`)}
                    className="w-full"
                  >
                    Book a Consultation
                  </AnimatedButton>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfessionalDetail;
