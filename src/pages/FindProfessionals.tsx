
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Search, Filter, ArrowUpDown, MapPin, Star, Clock } from "lucide-react";
import Header from "@/components/Header";
import AnimatedButton from "@/components/AnimatedButton";
import ProfessionalCard from "@/components/ProfessionalCard";
import { mockCategories } from "@/lib/supabase";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const sortOptions = [
  { label: "Rating (High to Low)", value: "rating-desc" },
  { label: "Rating (Low to High)", value: "rating-asc" },
  { label: "Price (Low to High)", value: "price-asc" },
  { label: "Price (High to Low)", value: "price-desc" },
];

const FindProfessionals = () => {
  const navigate = useNavigate();
  const [professionals, setProfessionals] = useState([]);
  const [filteredProfessionals, setFilteredProfessionals] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [sortBy, setSortBy] = useState("rating-desc");
  const [showAvailableTodayOnly, setShowAvailableTodayOnly] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // Fetch professionals on mount
  useEffect(() => {
    fetchProfessionals();
  }, []);
  
  // Fetch professionals from Supabase
  const fetchProfessionals = async () => {
    try {
      setLoading(true);
      
      // Fetch professionals with related profile data
      const { data, error } = await supabase
        .from('experts')
        .select(`
          *,
          profiles:id (first_name, last_name, avatar_url)
        `);

      if (error) {
        console.error("Error fetching professionals:", error);
        toast.error("Failed to load professionals");
        setProfessionals([]);
        setFilteredProfessionals([]);
      } else {
        // Transform data for component
        const transformedData = data.map(expert => ({
          id: expert.id,
          name: `${expert.profiles.first_name || ''} ${expert.profiles.last_name || ''}`.trim() || 'Unnamed Professional',
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
        setFilteredProfessionals(transformedData);
      }
    } catch (err) {
      console.error("Error in fetching professionals:", err);
      toast.error("An error occurred while loading professionals");
      setProfessionals([]);
      setFilteredProfessionals([]);
    } finally {
      setLoading(false);
    }
  };
  
  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  
  // Handle category selection
  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(selectedCategory === categoryId ? null : categoryId);
  };
  
  // Handle sort change
  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };
  
  // Handle professional card click
  const handleProfessionalClick = (professionalId) => {
    navigate(`/professional/${professionalId}`);
  };
  
  // Filter and sort professionals
  useEffect(() => {
    if (!professionals.length) return;
    
    let result = [...professionals];
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (pro) => 
          pro.name.toLowerCase().includes(query) || 
          pro.title.toLowerCase().includes(query) ||
          pro.location.toLowerCase().includes(query)
      );
    }
    
    // Filter by selected category
    if (selectedCategory) {
      result = result.filter((pro) => pro.categoryId === selectedCategory);
    }
    
    // Filter by availability today
    if (showAvailableTodayOnly) {
      result = result.filter((pro) => pro.availableToday);
    }
    
    // Sort professionals
    result.sort((a, b) => {
      switch (sortBy) {
        case "rating-desc":
          return b.rating - a.rating;
        case "rating-asc":
          return a.rating - b.rating;
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        default:
          return 0;
      }
    });
    
    setFilteredProfessionals(result);
  }, [searchQuery, selectedCategory, sortBy, showAvailableTodayOnly, professionals]);
  
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
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Find a Professional</h1>
            <p className="text-muted-foreground mb-6">Browse our directory of verified professionals</p>
            
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search by name, specialty, or location..."
                  className="w-full pl-10 h-10 rounded-full border border-input bg-background focus-ring"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </div>
              
              <div className="flex space-x-3">
                <div className="relative">
                  <select
                    className="h-10 pl-3 pr-8 rounded-full border border-input bg-background appearance-none focus-ring"
                    value={sortBy}
                    onChange={handleSortChange}
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                  <ArrowUpDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                </div>
                
                <button
                  className={cn(
                    "flex items-center justify-center h-10 px-4 rounded-full border",
                    showAvailableTodayOnly
                      ? "bg-primary text-white border-primary"
                      : "bg-background border-input text-foreground hover:bg-secondary/80"
                  )}
                  onClick={() => setShowAvailableTodayOnly(!showAvailableTodayOnly)}
                >
                  <Clock className="h-4 w-4 mr-2" />
                  <span>Available Today</span>
                </button>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {mockCategories.map((category) => (
                <button
                  key={category.id}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-sm transition-colors",
                    selectedCategory === category.id
                      ? "bg-primary text-white"
                      : "bg-secondary/50 text-foreground hover:bg-secondary"
                  )}
                  onClick={() => handleCategoryClick(category.id)}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </motion.div>
          
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
              <span className="ml-3">Loading professionals...</span>
            </div>
          ) : filteredProfessionals.length > 0 ? (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              {filteredProfessionals.map((professional) => (
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
              <p className="text-muted-foreground">No professionals found matching your criteria.</p>
              <AnimatedButton
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory(null);
                  setSortBy("rating-desc");
                  setShowAvailableTodayOnly(false);
                }}
                className="mt-4"
              >
                Reset Filters
              </AnimatedButton>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
};

export default FindProfessionals;
