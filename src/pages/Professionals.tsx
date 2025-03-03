
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { Filter, MapPin, Search, SlidersHorizontal } from "lucide-react";
import Header from "@/components/Header";
import ProfessionalCard from "@/components/ProfessionalCard";
import { mockProfessionals, mockCategories } from "@/lib/supabase";
import { cn } from "@/lib/utils";

interface LocationState {
  categoryId?: number;
}

const Professionals = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { categoryId } = (location.state as LocationState) || {};
  
  const [professionals, setProfessionals] = useState(mockProfessionals);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(categoryId || null);
  const [filterAvailableToday, setFilterAvailableToday] = useState(false);
  
  useEffect(() => {
    let filtered = mockProfessionals;
    
    if (selectedCategory) {
      filtered = filtered.filter(prof => prof.categoryId === selectedCategory);
    }
    
    if (filterAvailableToday) {
      filtered = filtered.filter(prof => prof.availableToday);
    }
    
    setProfessionals(filtered);
  }, [selectedCategory, filterAvailableToday]);
  
  const handleProfessionalClick = (professionalId: number) => {
    navigate(`/professional/${professionalId}`);
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-28 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <motion.h1 
              className="text-2xl md:text-3xl font-bold mb-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            >
              Find the Right Professional
            </motion.h1>
            <motion.p 
              className="text-muted-foreground"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1], delay: 0.1 }}
            >
              Browse through our list of qualified professionals
            </motion.p>
          </div>
          
          <motion.div 
            className="flex items-center mb-8 overflow-x-auto py-2 -mx-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1], delay: 0.2 }}
          >
            <div className="flex space-x-2 px-2">
              <button
                className={cn(
                  "px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all",
                  selectedCategory === null
                    ? "bg-primary text-white"
                    : "bg-secondary text-foreground hover:bg-secondary/70"
                )}
                onClick={() => setSelectedCategory(null)}
              >
                All Categories
              </button>
              
              {mockCategories.map(category => (
                <button
                  key={category.id}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all",
                    selectedCategory === category.id
                      ? "bg-primary text-white"
                      : "bg-secondary text-foreground hover:bg-secondary/70"
                  )}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </motion.div>
          
          <div className="flex flex-col md:flex-row md:space-x-6 mb-8">
            <motion.div 
              className="w-full md:w-64 mb-6 md:mb-0 flex-shrink-0"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1], delay: 0.2 }}
            >
              <div className="bg-white rounded-2xl border border-border p-5">
                <h3 className="text-base font-medium mb-4 flex items-center">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </h3>
                
                <div className="mb-5">
                  <h4 className="text-sm font-medium mb-3">Availability</h4>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="h-4 w-4 mr-3 accent-primary"
                      checked={filterAvailableToday}
                      onChange={() => setFilterAvailableToday(!filterAvailableToday)}
                    />
                    <span className="text-sm">Available Today</span>
                  </label>
                </div>
                
                <div className="mb-5">
                  <h4 className="text-sm font-medium mb-3">Price Range</h4>
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      placeholder="Min"
                      className="w-full p-2 text-sm border border-border rounded-lg focus-ring"
                    />
                    <span className="text-muted-foreground">to</span>
                    <input
                      type="text"
                      placeholder="Max"
                      className="w-full p-2 text-sm border border-border rounded-lg focus-ring"
                    />
                  </div>
                </div>
                
                <div className="mb-5">
                  <h4 className="text-sm font-medium mb-3">Location</h4>
                  <div className="relative">
                    <MapPin className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Enter city or region"
                      className="w-full pl-9 p-2 text-sm border border-border rounded-lg focus-ring"
                    />
                  </div>
                </div>
                
                <div className="mb-5">
                  <h4 className="text-sm font-medium mb-3">Experience Level</h4>
                  <div className="space-y-2">
                    <label className="flex items-center cursor-pointer">
                      <input type="checkbox" className="h-4 w-4 mr-3 accent-primary" />
                      <span className="text-sm">1-3 years</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input type="checkbox" className="h-4 w-4 mr-3 accent-primary" />
                      <span className="text-sm">4-7 years</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input type="checkbox" className="h-4 w-4 mr-3 accent-primary" />
                      <span className="text-sm">8+ years</span>
                    </label>
                  </div>
                </div>
                
                <button className="w-full py-2 text-sm font-medium border border-primary text-primary rounded-lg hover:bg-primary/5 focus-ring">
                  Reset Filters
                </button>
              </div>
            </motion.div>
            
            <motion.div 
              className="flex-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1], delay: 0.3 }}
            >
              <div className="mb-5 relative">
                <Search className="h-5 w-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search by name, expertise, or keyword..."
                  className="w-full py-3 pl-12 pr-4 border border-border rounded-xl focus-ring"
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1.5 rounded-lg bg-secondary hover:bg-secondary/80 focus-ring text-muted-foreground">
                  <SlidersHorizontal className="h-4 w-4" />
                </button>
              </div>
              
              <div className="mb-4 flex justify-between items-center">
                <p className="text-sm text-muted-foreground">
                  Showing {professionals.length} professionals
                </p>
                <select className="text-sm p-2 border border-border rounded-lg bg-white focus-ring">
                  <option>Sort by: Relevance</option>
                  <option>Rating: High to Low</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Experience: Most to Least</option>
                </select>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {professionals.length > 0 ? (
                  professionals.map(professional => (
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
                  ))
                ) : (
                  <div className="col-span-full text-center py-16">
                    <h3 className="text-lg font-medium mb-2">No Professionals Found</h3>
                    <p className="text-muted-foreground">Try adjusting your filters or search criteria</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Professionals;
