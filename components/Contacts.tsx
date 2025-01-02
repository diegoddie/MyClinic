import React from "react";

import Image from "next/image";
import map from '@/public/map.png'
import ContactForm from "./utils/ContactForm";

function Contacts() {
  return (
    <section
      className="py-12 lg:py-20 bg-gradient-to-b from-bgBlue to-bgGreen"
      id="contacts"
    >
      <div className="container mx-auto px-4 md:px-6 py-1 md:py-4">
        <div className="flex flex-col items-center text-center mb-8">
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
      </div>
    </section>
  );
}

export default Contacts;
