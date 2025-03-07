
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, MapPin, Star, Filter, Clock } from "lucide-react";
import Header from "@/components/Header";
import AnimatedButton from "@/components/AnimatedButton";
import { mockCategories, mockProfessionals } from "@/lib/supabase";
import ProfessionalCard from "@/components/ProfessionalCard";

const ProfessionalsByCategory = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  const [professionals, setProfessionals] = useState([]);
  const [category, setCategory] = useState(null);
  
  // Get the category ID from the params or from the location state
  const categoryId = params.categoryId ? parseInt(params.categoryId) : location.state?.categoryId;
  
  useEffect(() => {
    if (categoryId) {
      // Find the category
      const foundCategory = mockCategories.find(cat => cat.id === categoryId);
      setCategory(foundCategory);
      
      // Filter professionals by category
      const filteredProfessionals = mockProfessionals.filter(
        pro => pro.categoryId === categoryId
      );
      setProfessionals(filteredProfessionals);
    } else {
      // Redirect to home if no category is selected
      navigate("/");
    }
  }, [categoryId, navigate]);
  
  const handleProfessionalClick = (professionalId) => {
    navigate(`/professional/${professionalId}`, { 
      state: { professionalId, fromCategory: true } 
    });
  };
  
  if (!category) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
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
