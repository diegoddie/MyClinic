import React from "react";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { DoctorCard } from "./utils/DoctorCard";
import doctors from "@/lib/data/doctors";

const Doctors = () => {
  return (
    <section
      className="py-12 lg:py-20 bg-gradient-to-b from-bgGreen to-bgBlue"
      id="doctors"
    >
      <div className="container mx-auto px-4 md:px-6 py-1 md:py-4">
        <div className="flex flex-col items-center space-y-4 text-center mb-8">
          <Badge
            variant="outline"
            className="text-primary border-primary mt-3 md:mt-4 px-4 py-1 rounded-full text-sm md:text-md"
          >
            Our Team
          </Badge>
          <h2 className="bg-gradient-to-r from-secondary to-primary text-transparent bg-clip-text text-4xl font-bold tracking-tighter md:text-5xl lg:text-6xl">
            Doctors
          </h2>
          <p className="mx-auto max-w-2xl text-paragraphs text-lg md:text-xl">
            Meet our team of experienced and dedicated doctors at MyClinic.
          </p>
        </div>
        <div className="w-full px-10 md:px-20 ">
          <Carousel
            opts={{
              align: "start",
              loop: false,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {doctors.map((doctor, index) => (
                <CarouselItem
                  key={index}
                  className="pl-2 md:pl-4 sm:basis-1/2 lg:basis-1/3"
                >
                  <div className="p-1">
                    <DoctorCard {...doctor} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="" />
            <CarouselNext className="" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default Doctors;
