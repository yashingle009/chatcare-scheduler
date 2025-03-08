
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, MapPin, Star, Filter, Clock } from "lucide-react";
import Header from "@/components/Header";
import AnimatedButton from "@/components/AnimatedButton";
import { mockCategories } from "@/lib/supabase";
import ProfessionalCard from "@/components/ProfessionalCard";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const ProfessionalsByCategory = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  const [professionals, setProfessionals] = useState([]);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Get the category ID from the params or from the location state
  const categoryId = params.categoryId ? parseInt(params.categoryId) : location.state?.categoryId;
  
  useEffect(() => {
    if (categoryId) {
      // Find the category
      const foundCategory = mockCategories.find(cat => cat.id === categoryId);
      setCategory(foundCategory);
      
      // Fetch professionals from Supabase
      fetchProfessionalsByCategory(categoryId);
    } else {
      // Redirect to home if no category is selected
      navigate("/");
    }
  }, [categoryId, navigate]);
  
  const fetchProfessionalsByCategory = async (categoryId) => {
    try {
      setLoading(true);
      
      // Fetch professionals with related profile data
      const { data, error } = await supabase
        .from('experts')
        .select(`
          *,
          profiles:id (first_name, last_name, avatar_url)
        `)
        .eq('category_id', categoryId);

      if (error) {
        console.error("Error fetching professionals:", error);
        toast.error("Failed to load professionals");
        setProfessionals([]);
      } else {
        // Transform data for component
        const transformedData = data.map(expert => ({
          id: expert.id,
          name: `${expert.profiles.first_name} ${expert.profiles.last_name}`,
          title: expert.title || "Professional Consultant",
          avatar: expert.profiles.avatar_url || "/placeholder.svg",
          rating: 4.5, // Placeholder, would be from a reviews table in real app
          reviewCount: 15, // Placeholder, would be counted from reviews
          experience: expert.experience || "5+ years",
          price: expert.price || 100,
          availableToday: true, // Placeholder, would be from availability data
          location: expert.location || "Remote",
          categoryId: expert.category_id
        }));
        
        setProfessionals(transformedData);
      }
    } catch (err) {
      console.error("Error in fetching professionals:", err);
      toast.error("An error occurred while loading professionals");
      setProfessionals([]);
    } finally {
      setLoading(false);
    }
  };
  
  const handleProfessionalClick = (professionalId) => {
    navigate(`/professional/${professionalId}`, { 
      state: { professionalId, fromCategory: true } 
    });
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-28 pb-16 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
              <span className="ml-3">Loading professionals...</span>
            </div>
          </div>
        </main>
      </div>
    );
  }
  
  if (!category) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-28 pb-16 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center py-12">
              <p className="text-muted-foreground">Category not found</p>
              <AnimatedButton
                onClick={() => navigate("/")}
                className="mt-4"
              >
                Return to Home
              </AnimatedButton>
            </div>
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
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <button 
              onClick={() => navigate(-1)}
              className="flex items-center text-muted-foreground hover:text-foreground mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              <span className="text-sm">Back</span>
            </button>
            
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold mb-2">{category.name}</h1>
                <p className="text-muted-foreground">{category.description}</p>
              </div>
              
              <div className="mt-4 md:mt-0">
                <AnimatedButton 
                  variant="outline" 
                  icon={<Filter className="h-4 w-4" />}
                  iconPosition="left"
                  onClick={() => {}}
                  size="sm"
                >
                  Filters
                </AnimatedButton>
              </div>
            </div>
          </motion.div>
          
          {professionals.length > 0 ? (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              {professionals.map((professional) => (
                <ProfessionalCard
                  key={professional.id}
                  id={professional.id}
                  name={professional.name}
                  title={professional.title}
                  avatar={professional.avatar}
                  rating={professional.rating}
                  reviewCount={professional.reviewCount}
                  experience={professional.experience}
                  price={professional.price}
                  availableToday={professional.availableToday}
                  location={professional.location}
                  onClick={() => handleProfessionalClick(professional.id)}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div 
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <p className="text-muted-foreground">No professionals found in this category.</p>
              <AnimatedButton
                onClick={() => navigate("/professionals")}
                className="mt-4"
              >
                View All Professionals
              </AnimatedButton>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ProfessionalsByCategory;
