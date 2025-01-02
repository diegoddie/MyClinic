import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  treatments?: string[];
}

function ServiceCard({
  icon,
  title,
  description,
  treatments,
}: ServiceCardProps) {
  return (
    <Card className="flex flex-col w-full h-full">
      <CardHeader className="space-y-4">
        <div className="flex items-center space-x-4">
          {icon}
          <CardTitle className="text-primary text-lg md:text-xl">
            {title}
          </CardTitle>
        </div>
        <CardDescription className="text-paragraphs">
          {description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="flex-grow">
        <ul className="list-disc list-inside space-y-1">
          {treatments?.map((treatment, index) => (
            <li key={index} className="text-sm text-paragraphs">
              {treatment}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardContent className="pt-0">
        <Button className="w-full bg-primary text-white text-lg">Learn More</Button>
      </CardContent>
    </Card>
  );
}

export default ServiceCard;
