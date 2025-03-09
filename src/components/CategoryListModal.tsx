
import React from "react";
import { X } from "lucide-react";
import { Icons } from "@/components/Icons";

export interface CategoryListModalProps {
  categories?: Array<{
    id: number;
    name: string;
    icon: string;
    description: string;
    count: number;
  }>;
  onClose: () => void;
  onCategoryClick: (categoryId: number) => void;
}

const CategoryListModal = ({ categories = [], onClose, onCategoryClick }: CategoryListModalProps) => {
  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-background rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-auto">
        <div className="p-6 border-b sticky top-0 bg-background z-10">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">All Categories</h2>
            <button 
              onClick={onClose}
              className="rounded-full p-2 hover:bg-secondary"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {categories.map((category) => {
            const IconComponent = Icons[category.icon as keyof typeof Icons] || Icons.default;
            
            return (
              <div 
                key={category.id}
                onClick={() => {
                  onCategoryClick(category.id);
                  onClose();
                }}
                className="flex items-start p-3 rounded-lg hover:bg-secondary/50 cursor-pointer"
              >
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3 flex-shrink-0">
                  <IconComponent className="h-5 w-5 text-primary" />
                </div>
                
                <div>
                  <h3 className="font-medium">{category.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{category.description}</p>
                  <div className="text-xs text-muted-foreground mt-2">
                    {category.count} experts available
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CategoryListModal;
