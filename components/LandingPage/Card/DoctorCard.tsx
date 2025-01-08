import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone } from "lucide-react";
import Image from "next/image";
import { Badge } from "../../ui/badge";

interface DoctorProps {
  firstName: string;
  lastName: string;
  specialization: string;
  email: string;
  phone: string;
  image: string;
}

export function DoctorCard({
  firstName,
  lastName,
  specialization,
  email,
  phone,
  image,
}: DoctorProps) {
  return (
    <Card className="group relative overflow-hidden border-none shadow-lg bg-white ">
      <CardContent className="p-0">
        <div className="relative overflow-hidden aspect-square border-b-2 border-secondary">
          <Image
            src={image}
            alt={`Dr. ${firstName} ${lastName}`}
            fill
            className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 md:h-5 md:w-5 2xl:h-6 2xl:w-6" />
                <span className="text-white/90 text-md 2xl:text-lg">{email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 md:h-5 md:w-5 2xl:h-6 2xl:w-6" />
                <span className="text-white/90 text-md 2xl:text-lg">{phone}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="p-4 text-center space-y-3">
          <h3 className="text-lg md:text-xl 2xl:text-2xl font-bold text-primary">
            Dr. {firstName} {lastName}
          </h3>
          <Badge
            variant="outline"
            className="bg-primary text-white border-primary px-4 py-1 rounded-md text-md md:text-lg"
          >
            {specialization}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
