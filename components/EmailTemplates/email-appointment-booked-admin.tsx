import * as React from 'react';

export interface EmailAppointmentBookedAdminProps {
  firstName: string;
  lastName: string;
  email: string;
  taxId: string;
  phoneNumber: string;
  date: string;
  doctorFirstName: string;
  doctorLastName: string;    
}

export const EmailAppointmentBookedAdmin: React.FC<Readonly<EmailAppointmentBookedAdminProps>> = ({
  firstName,
  lastName,
  taxId,
  phoneNumber,
  email,
  date,
  doctorFirstName,
  doctorLastName,
}) => (
  <div>
    <h1>New Visit Booked</h1>
    <p>A new appointment has been scheduled with the following details:</p>
    <h3>Patient: {firstName} {lastName}</h3>
    <p><strong>Email:</strong> {email}</p>
    <p><strong>Phone Number:</strong> {phoneNumber}</p>
    <p><strong>Tax ID:</strong> {taxId}</p>
    <p><strong>Appointment Date:</strong> {new Date(date).toLocaleString()}</p>
    <p><strong>Doctor:</strong> Dr. {doctorFirstName} {doctorLastName}</p>
    <p>If you need any further information, feel free to contact the patient.</p>
  </div>
);
