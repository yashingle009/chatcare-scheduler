
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Icons } from "@/components/Icons";

const CategoryCard = ({ id, name, description, icon, count, onClick }) => {
  // Get the icon component from the icon name
  const IconComponent = Icons[icon] || Icons.default;

  return (
    <Card 
      className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer h-full"
      onClick={onClick}
    >
      <CardContent className="p-6 flex flex-col h-full">
        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
          <IconComponent className="h-6 w-6 text-primary" />
        </div>
        
        <h3 className="text-lg font-medium mb-2">{name}</h3>
        
        <p className="text-muted-foreground text-sm flex-grow">
          {description}
        </p>
        
        {count !== undefined && (
          <div className="mt-4 text-sm">
            <span className="text-muted-foreground">{count} experts available</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CategoryCard;
