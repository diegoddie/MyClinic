import React from "react";
import {
  Heart,
  Stethoscope,
  Clock,
  Shield,
  Brain,
  Bone,
  Eye,
  Syringe,
} from "lucide-react";

const services = [
  {
    category: "General",
    title: "General Checkups",
    description:
      "Comprehensive health checks to monitor and maintain your overall well-being.",
    icon: <Heart className="h-6 w-6 md:h-8 md:w-8 text-primary" />,
  },
  {
    category: "General",
    title: "Emergency Care",
    description:
      "Immediate medical attention when time is critical, available 24/7.",
    icon: <Clock className="h-6 w-6 md:h-8 md:w-8 text-primary" />,
  },
  {
    category: "General",
    title: "Preventive Services",
    description:
      "Preventive care such as vaccinations, screenings, and wellness exams.",
    icon: <Shield className="h-6 w-6 md:h-8 md:w-8 text-primary" />,
  },
  {
    category: "Specialized",
    icon: <Heart className="h-6 w-6 md:h-8 md:w-8 text-primary" />,
    title: "Cardiology",
    description:
      "Comprehensive heart care with advanced diagnostics and treatments.",
    treatments: [
      "Echocardiography",
      "Stress Testing",
      "Cardiac Catheterization",
    ],
  },
  {
    category: "Specialized",
    icon: <Brain className="h-6 w-6 md:h-8 md:w-8 text-primary" />,
    title: "Neurology",
    description: "Expert care for disorders of the nervous system.",
    treatments: ["EEG", "MRI Scans", "Neurological Rehabilitation"],
  },
  {
    category: "Specialized",
    icon: <Bone className="h-6 w-6 md:h-8 md:w-8 text-primary" />,
    title: "Orthopedics",
    description: "Specialized care for musculoskeletal system.",
    treatments: ["Joint Replacement", "Sports Medicine", "Fracture Care"],
  },
  {
    category: "Specialized",
    icon: <Eye className="h-6 w-6 md:h-8 md:w-8 text-primary" />,
    title: "Ophthalmology",
    description: "Comprehensive eye care and vision correction services.",
    treatments: ["Cataract Surgery", "Glaucoma Treatment", "LASIK"],
  },
  {
    category: "Specialized",
    icon: <Stethoscope className="h-6 w-6 md:h-8 md:w-8 text-primary" />,
    title: "General Medicine",
    description: "Primary care for overall health and wellness.",
    treatments: [
      "Annual Check-ups",
      "Vaccinations",
      "Chronic Disease Management",
    ],
  },
  {
    category: "Specialized",
    icon: <Syringe className="h-6 w-6 md:h-8 md:w-8 text-primary" />,
    title: "Immunology",
    description: "Diagnosis and treatment of immune system disorders.",
    treatments: [
      "Allergy Testing",
      "Immunotherapy",
      "Autoimmune Disease Treatment",
    ],
  },
];

export default services;
