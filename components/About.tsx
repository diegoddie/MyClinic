"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Building2,
  CheckCircle2,
  CircleChevronRight,
  MessageCircleQuestion,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "./ui/button";
import faqs from "@/lib/data/faqs";
import highlights from "@/lib/data/highlights";
import Link from "next/link";
import { motion } from "framer-motion";

export default function About() {
  return (
    <section
      className="py-12 lg:py-20 bg-gradient-to-b from-bgGreen to-bgBlue"
      id="about"
    >
      <motion.div 
        initial={{ x: -100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition= {{ duration: 1, ease: "easeOut", delay: 0.6 }}
        className="container mx-auto px-4 md:px-6 py-1 md:py-4"
      >
        <div className="flex flex-col items-center space-y-4 text-center mb-12">
          <Badge variant="outline" className="text-primary border-primary mt-3 md:mt-4 px-4 py-1 rounded-full text-sm md:text-md">
            About Us
          </Badge>
          <h2 className="bg-gradient-to-r from-secondary to-primary text-transparent bg-clip-text text-4xl font-bold tracking-tighter md:text-5xl lg:text-6xl">
            Welcome to MyClinic
          </h2>
          <p className="mx-auto max-w-2xl text-paragraphs text-lg md:text-xl">
            Delivering exceptional healthcare services with a focus on patient
            comfort and modern medical solutions.
          </p>
          <Badge
            variant="outline"
            className="text-primary border border-green-400 bg-green-50 px-4 py-1 tracking-tight text-md font-semibold"
          >
            Version 2.0 is here! 🎉
          </Badge>
        </div>
        <div className="flex flex-col lg:flex-row gap-8 mb-12 md:mb-24">
          <div className="flex-1 relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-secondary to-primary/50 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
            <div className="relative">
              <Image
                src="/hero_example.png"
                alt="MyClinic Interface"
                width={800}
                height={600}
                className="rounded-xl shadow-2xl w-full h-auto"
              />
              <div className="absolute bottom-4 left-4 right-4 text-white bg-green-500 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                <div className="flex items-center space-x-2">
                  <Building2 className="h-5 w-5 md:h-6 md:w-6 text-white" />
                  <p className="text-sm md:text-md font-medium">
                    Trusted by over 10,000+ patients.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 flex flex-col items-center text-center">
            <Tabs defaultValue="highlights" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="highlights">Highlights</TabsTrigger>
                <TabsTrigger value="story">Our Story</TabsTrigger>
              </TabsList>
              <TabsContent value="highlights">
                <Card className="">
                  <CardContent className="pt-6">
                    <div className="space-y-3">
                      {highlights.map((highlight, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-3"
                        >
                          <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0" />
                          <span className="text-paragraphs text-start">
                            {highlight}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="story">
                <Card className="">
                  <CardContent className="pt-6">
                    <p className="text-paragraphs">
                      Founded in 2000, MyClinic has been at the forefront of
                      medical innovation for over two decades. What started as a
                      small family practice has grown into a comprehensive
                      healthcare center, serving thousands of patients with
                      cutting-edge treatments and compassionate care.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
            <div className="mt-6 md:mt-16">
              <Link href="/login">
                <Button
                  className="text-white group flex items-center text-lg 2xl:text-xl rounded-sm border-2 border-primary/85 px-8 py-6 shadow-xl bg-secondary hover:bg-primary font-bold transition-colors duration-300"
                  aria-label="Book an Appointment"
                >
                  Book an Appointment
                  <CircleChevronRight
                    className="ml-1 override-size transition-transform duration-300 group-hover:translate-x-2"
                    size={24}
                  />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center text-center justify-center space-x-2">
            <MessageCircleQuestion className="h-6 w-6 md:h-7 md:w-7 text-primary" />
            <h3 className="text-2xl md:text-3xl font-bold text-primary">FAQ</h3>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-lg md:text-xl font-semibold text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-paragraphs text-md md:text-lg">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </motion.div>
    </section>
  );
}
