import Doctor1 from "@/public/doctors/doctor1.png";
import Doctor2 from "@/public/doctors/doctor2.png";
import Doctor3 from "@/public/doctors/doctor3.png";
import defaultUser from "@/public/avatar/default-user.png";

const visits = [
    {
      id: 1,
      patient: {
        firstName: "John",
        lastName: "Doe",
        image: defaultUser.src,
      },
      doctor: {
        firstName: "Robert",
        lastName: "Mitchell",
        specialization: "Orthodontist",
        image: Doctor1.src,
      },
      date: "2025-01-12 14:00",
      status: "Pending",
    },
    {
      id: 2,
      patient: {
        firstName: "Jacopo",
        lastName: "Segre",
        image: defaultUser.src,
      },
      doctor: {
        firstName: "Oscar",
        lastName: "Clark",
        specialization: "Cardiologist",
        image: Doctor2.src,
      },
      date: "2025-01-13 10:30",
      status: "Confirmed",
    },
    {
      id: 3,
      patient: {
        firstName: "Claudio",
        lastName: "Gomes",
        image: defaultUser.src,
      },
      doctor: {
        firstName: "Emily",
        lastName: "Parker",
        specialization: "Pediatric Specialist",
        image: Doctor3.src,
      },
      date: "2025-01-15 16:00",
      status: "Completed",
    },
  ];
  
  export default visits;
  