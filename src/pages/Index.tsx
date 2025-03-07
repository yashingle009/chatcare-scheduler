
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, Calendar, MessageCircle, Award } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import CategoryCard from "@/components/CategoryCard";
import AnimatedButton from "@/components/AnimatedButton";
import CategoryListModal from "@/components/CategoryListModal";
import { mockCategories } from "@/lib/supabase";
import { staggerContainer, staggerItems } from "@/utils/animations";

const Index = () => {
  const navigate = useNavigate();
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  
  const handleCategoryClick = (categoryId) => {
    setCategoryModalOpen(true);
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <CategoryListModal 
        isOpen={categoryModalOpen} 
        onClose={() => setCategoryModalOpen(false)} 
      />
      
      <main className="pt-28 pb-16 px-6">
        <section className="max-w-6xl mx-auto mb-16 md:mb-24">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          >
            <motion.div 
              className="flex items-center justify-center mb-3"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1], delay: 0.2 }}
            >
              <span className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
                Professional consultations made simple
              </span>
            </motion.div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
              Expert guidance when you need it most
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8 md:mb-10">
              Connect with top chartered accountants, lawyers, and company secretaries for personalized professional consultations.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <AnimatedButton 
                onClick={() => navigate("/professionals")}
                icon={<Search className="h-4 w-4" />}
                size="lg"
              >
                Find a Professional
              </AnimatedButton>
              
              <AnimatedButton 
                variant="outline"
                size="lg"
                onClick={() => navigate("/profile")}
              >
                Learn More
              </AnimatedButton>
            </div>
          </motion.div>
        </section>
        
        <section className="max-w-6xl mx-auto mb-16 md:mb-24">
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1], delay: 0.2 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Browse by Expertise</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose from a variety of professional categories to find the right expert for your needs
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockCategories.map((category) => (
              <CategoryCard
                key={category.id}
                id={category.id}
                name={category.name}
                icon={category.icon}
                description={category.description}
                count={category.count}
                onClick={() => handleCategoryClick(category.id)}
              />
            ))}
          </div>
        </section>
        
        <section className="max-w-6xl mx-auto mb-16 md:mb-24">
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1], delay: 0.3 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Simple steps to get the professional guidance you need
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            <motion.div 
              className="bg-white rounded-2xl p-6 border border-border text-center"
              variants={staggerItems}
            >
              <div className="h-14 w-14 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-5">
                <Search className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-medium mb-3">Find an Expert</h3>
              <p className="text-sm text-muted-foreground">
                Browse through our directory of verified professionals and select one that matches your needs.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-white rounded-2xl p-6 border border-border text-center"
              variants={staggerItems}
            >
              <div className="h-14 w-14 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-5">
                <Calendar className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-medium mb-3">Book a Session</h3>
              <p className="text-sm text-muted-foreground">
                Choose a convenient time slot from the professional's calendar and schedule your consultation.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-white rounded-2xl p-6 border border-border text-center"
              variants={staggerItems}
            >
              <div className="h-14 w-14 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-5">
                <MessageCircle className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-medium mb-3">Get Consultation</h3>
              <p className="text-sm text-muted-foreground">
                Connect via video, voice, or chat for personalized advice and guidance from your chosen expert.
              </p>
            </motion.div>
          </motion.div>
        </section>
        
        <section className="max-w-6xl mx-auto">
          <motion.div
            className="bg-white rounded-2xl border border-border p-8 md:p-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1], delay: 0.4 }}
          >
            <div className="flex flex-col md:flex-row md:items-center">
              <div className="md:flex-1 mb-6 md:mb-0 md:pr-10">
                <div className="flex items-center mb-3">
                  <Award className="h-5 w-5 text-primary mr-2" />
                  <h4 className="text-sm font-medium">Premium Consultations</h4>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to get started?</h2>
                <p className="text-muted-foreground mb-6 md:mb-0">
                  Book your first consultation and experience the difference of professional guidance tailored to your needs.
                </p>
              </div>
              <div className="md:flex-initial">
                <AnimatedButton
                  onClick={() => navigate("/professionals")}
                  size="lg"
                >
                  Find a Professional
                </AnimatedButton>
              </div>
            </div>
          </motion.div>
        </section>
      </main>
    </div>
  );
};

export default Index;
