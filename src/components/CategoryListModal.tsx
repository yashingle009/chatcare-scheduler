
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { mockCategories } from "@/lib/supabase";

interface CategoryListModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CategoryListModal: React.FC<CategoryListModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const handleCategorySelect = (categoryId: number) => {
    navigate(`/professionals/category/${categoryId}`, { state: { categoryId } });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl p-6 z-50 w-full max-w-md max-h-[80vh] overflow-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Browse Categories</h2>
              <button 
                onClick={onClose}
                className="rounded-full h-8 w-8 flex items-center justify-center hover:bg-muted transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="grid gap-3">
              {mockCategories.map((category) => (
                <motion.button
                  key={category.id}
                  className="flex items-center p-3 rounded-xl hover:bg-secondary/50 text-left transition-colors"
                  whileHover={{ x: 5 }}
                  onClick={() => handleCategorySelect(category.id)}
                >
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                    <span className="text-primary">{category.icon}</span>
                  </div>
                  <div>
                    <div className="font-medium">{category.name}</div>
                    <div className="text-xs text-muted-foreground">{category.count} professionals</div>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CategoryListModal;
