import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import services from "./utils/servicesData";
import ServiceCard from "./utils/ServiceCard";

function Services() {
  const generalizedServices = services.filter(
    (service) => service.category === "General"
  );
  const specializedCare = services.filter(
    (service) => service.category === "Specialized"
  );

  return (
    <section
      className="py-12 lg:py-20 bg-gradient-to-b from-foreground/15 to-background"
      id="services"
    >
      <div className="container mx-auto px-4 md:px-6 py-1 md:py-4">
        <div className="flex flex-col items-center space-y-5 text-center mb-8">
          <h2 className="bg-gradient-to-r from-secondary to-primary text-transparent bg-clip-text text-4xl font-bold tracking-tighter md:text-5xl lg:text-6xl">
            Services
          </h2>
          <p className="mx-auto max-w-2xl text-paragraphs text-lg md:text-xl">
            Discover our wide range of specialized medical services designed to
            meet all your healthcare needs.
          </p>
        </div>
        {/* Tabs */}
        <Tabs defaultValue="general" className="">
          <TabsList className="flex justify-center space-x-2 mb-8 mx-auto w-fit">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="specialized">Specialized Care</TabsTrigger>
          </TabsList>
          {/* Generalized Services */}
          <TabsContent value="general">
            <div className="flex flex-wrap justify-center gap-8">
              {generalizedServices.map((service, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center w-full md:w-1/2 lg:w-1/4"
                >
                  <ServiceCard
                    icon={service.icon}
                    title={service.title}
                    description={service.description}
                  />
                </div>
              ))}
            </div>
          </TabsContent>
          {/* Specialized Care */}
          <TabsContent value="specialized">
            <div className="flex flex-wrap justify-center gap-8">
              {specializedCare.map((care, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center w-full md:w-1/2 lg:w-1/4"
                >
                  <ServiceCard
                    icon={care.icon}
                    title={care.title}
                    description={care.description}
                    treatments={care.treatments}
                  />
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}

export default Services;
