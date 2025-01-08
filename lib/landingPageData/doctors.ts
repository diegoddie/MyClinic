import Doctor1 from "@/public/doctors/doctor1.png";
import Doctor2 from "@/public/doctors/doctor2.png";
import Doctor3 from "@/public/doctors/doctor3.png";
import Doctor4 from "@/public/doctors/doctor4.png";
import Doctor5 from "@/public/doctors/doctor5.png";
import Doctor6 from "@/public/doctors/doctor6.png";

const doctors = [
  {
    id: 1,
    firstName: "Robert",
    lastName: "Mitchell",
    specialization: "Orthodontist",
    email: "robert.mitchell@myclinic.com",
    phone: "(555) 123-4567",
    image: Doctor5.src,
  },
  {
    id: 2,
    firstName: "James",
    lastName: "Wilson",
    specialization: "Neurologist",
    email: "james.wilson@myclinic.com",
    phone: "(555) 123-4568",
    image: Doctor4.src,
  },
  {
    id: 3,
    firstName: "Emily",
    lastName: "Parker",
    specialization: "Pediatric Specialist",
    email: "emily.parker@myclinic.com",
    phone: "(555) 123-4569",
    image: Doctor6.src,
  },
  {
    id: 4,
    firstName: "Michael",
    lastName: "Chen",
    specialization: "Dermatologist",
    email: "michael.chen@myclinic.com",
    phone: "(555) 123-4570",
    image: Doctor2.src,
  },
  {
    id: 5,
    firstName: "Oscar",
    lastName: "Clark",
    specialization: "Cardiologist",
    email: "oscar.clark@myclinic.com",
    phone: "(555) 123-4567",
    image: Doctor1.src,
  },
  {
    id: 6,
    firstName: "Callum",
    lastName: "King",
    specialization: "Psychiatrist",
    email: "callum.king@myclinic.com",
    phone: "(555) 123-4568",
    image: Doctor3.src,
  }
];

export default doctors;
