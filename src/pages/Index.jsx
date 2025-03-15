
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Search, ArrowRight, FileCheck, CheckCircle, ArrowDown, Star, Users } from "lucide-react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { mockCategories } from "@/lib/supabase";
import CategoryCard from "@/components/CategoryCard";
import CategoryListModal from "@/components/CategoryListModal";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const CTASection = () => {
  const navigate = useNavigate();
  
  return (
    <motion.div 
      className="pt-32 pb-20 px-6 md:px-10 lg:px-16 bg-gradient-to-b from-primary/5 to-background text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h1 
        className="text-4xl md:text-5xl font-bold tracking-tight max-w-3xl mx-auto"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.1 }}
      >
        Connect with Professional Experts for Personalized Consultations
      </motion.h1>
      
      <motion.p 
        className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Find, book, and connect with qualified professionals across various fields for specialized advice tailored to your needs.
      </motion.p>
      
      <motion.div 
        className="mt-8 max-w-xl mx-auto flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input 
            className="w-full pl-10 py-6 text-base" 
            placeholder="Search by expertise or professional name..." 
          />
        </div>
        <Button 
          size="lg"
          className="w-full sm:w-auto whitespace-nowrap"
          onClick={() => navigate("/professionals")}
        >
          Find Experts <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </motion.div>
      
      <motion.div 
        className="mt-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <div className="flex items-center justify-center">
          <ArrowDown className="animate-bounce h-6 w-6 text-muted-foreground" />
        </div>
      </motion.div>
    </motion.div>
  );
};

const BecomeExpertSection = () => {
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  
  const handleBecomeExpert = async () => {
    if (!user) {
      navigate("/auth");
      return;
    }
    
    if (profile?.user_type === "expert") {
      navigate("/expert-dashboard");
      return;
    }
    
    navigate("/expert-profile");
  };
  
  return (
    <motion.div 
      className="py-20 px-6 bg-primary/5 rounded-3xl mx-6 my-16"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Users className="h-12 w-12 mx-auto mb-6 text-primary" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Want to Share Your Expertise?
          </h2>
          <p className="text-xl text-muted-foreground mb-6">
            Join our platform as an expert and start offering professional consultations to clients worldwide.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-primary mt-1 mr-2 flex-shrink-0" />
              <span>Flexible scheduling</span>
            </div>
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-primary mt-1 mr-2 flex-shrink-0" />
              <span>Set your own rates</span>
            </div>
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-primary mt-1 mr-2 flex-shrink-0" />
              <span>Reach global clients</span>
            </div>
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-primary mt-1 mr-2 flex-shrink-0" />
              <span>Build your reputation</span>
            </div>
          </div>
          
          <Button 
            size="lg" 
            onClick={handleBecomeExpert}
            className="px-8"
          >
            {profile?.user_type === "expert" ? "Go to Expert Dashboard" : "Become an Expert"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

const FeaturedCategories = () => {
  const navigate = useNavigate();
  const [showAllCategories, setShowAllCategories] = useState(false);
  
  const handleCategoryClick = (categoryId) => {
    navigate(`/professionals/category/${categoryId}`, { state: { categoryId } });
  };
  
  const featuredCategories = mockCategories.slice(0, 6);
  
  return (
    <motion.div 
      className="py-16 px-6"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold mb-4">Browse by Category</h2>
            <p className="text-muted-foreground max-w-2xl">
              Explore professionals by category to find the perfect match for your specific needs
            </p>
          </div>
          <Button 
            variant="link" 
            className="mt-4 md:mt-0"
            onClick={() => setShowAllCategories(true)}
          >
            View All Categories
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredCategories.map((category) => (
            <CategoryCard 
              key={category.id}
              id={category.id}
              name={category.name}
              description={category.description}
              icon={category.icon}
              onClick={() => handleCategoryClick(category.id)}
            />
          ))}
        </div>
      </div>
      
      {showAllCategories && (
        <CategoryListModal 
          categories={mockCategories}
          onClose={() => setShowAllCategories(false)}
          onCategoryClick={handleCategoryClick}
        />
      )}
    </motion.div>
  );
};

const HowItWorks = () => {
  return (
    <motion.div 
      className="py-16 px-6 bg-secondary/20"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Connect with professionals in just a few simple steps
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <motion.div 
            className="flex flex-col items-center text-center"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
              <Search className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-medium mb-3">Find an Expert</h3>
            <p className="text-muted-foreground">
              Browse categories or search for the specific expertise you need. Filter by ratings, availability, and specialization.
            </p>
          </motion.div>
          
          <motion.div 
            className="flex flex-col items-center text-center"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
              <FileCheck className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-medium mb-3">Book a Session</h3>
            <p className="text-muted-foreground">
              Select an available time slot, choose your preferred consultation mode (video, audio, or chat), and confirm your booking.
            </p>
          </motion.div>
          
          <motion.div 
            className="flex flex-col items-center text-center"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
              <Star className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-medium mb-3">Get Personalized Advice</h3>
            <p className="text-muted-foreground">
              Connect with your expert at the scheduled time. Receive tailored advice, ask questions, and get the guidance you need.
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CTASection />
      <FeaturedCategories />
      <HowItWorks />
      <BecomeExpertSection />
    </div>
  );
};

export default Index;
