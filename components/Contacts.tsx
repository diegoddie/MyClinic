"use client";

import React from "react";
import Image from "next/image";
import map from "@/public/map.png";
import ContactForm from "./utils/ContactForm";
import { Badge } from "./ui/badge";
import { motion } from "framer-motion";

function Contacts() {
  return (
    <section
      className="py-12 lg:py-20 bg-gradient-to-b from-bgBlue to-bgGreen"
      id="contacts"
    >
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
        className="container mx-auto px-4 md:px-6 py-1 md:py-4"
      >
        <div className="flex flex-col items-center space-y-4 text-center mb-8">
          <Badge
            variant="outline"
            className="text-primary border-primary mt-3 md:mt-4 px-4 py-1 rounded-full text-sm md:text-md"
          >
            Reach Out
          </Badge>
          <h2 className="bg-gradient-to-r from-secondary to-primary text-transparent bg-clip-text text-4xl font-bold tracking-tighter md:text-5xl lg:text-6xl">
            Contacts
          </h2>
        </div>
        <div className="relative w-full h-[150px] md:h-[350px] rounded-lg shadow-2xl">
          <Image
            src={map}
            alt="Map"
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
        <div className="relative -mt-6 md:-mt-16 z-10 px-4 md:px-0">
          <ContactForm />
        </div>
      </motion.div>
    </section>
  );
}

export default Contacts;
