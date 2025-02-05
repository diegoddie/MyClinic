import * as React from 'react';

export interface EmailAppointmentConfirmedProps {
  firstName: string;
  lastName: string;
  email: string;
  taxId: string;
  phoneNumber: string;
  date: string;
  doctorFirstName: string;
  doctorLastName: string;    
}

export const EmailAppointmentConfirmed: React.FC<Readonly<EmailAppointmentConfirmedProps>> = ({
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
    <h1>Your visit has been confirmed!</h1>
    <p>Dear {firstName} {lastName},</p>
    <p>We are pleased to inform you that your appointment has been confirmed.</p>
    <p><strong>Appointment Details:</strong></p>
    <ul>
      <li><strong>Doctor:</strong> Dr. {doctorFirstName} {doctorLastName}</li>
      <li><strong>Appointment Date:</strong> {new Date(date).toLocaleString()}</li>
      <li><strong>Email:</strong> {email}</li>
      <li><strong>Phone Number:</strong> {phoneNumber}</li>
      <li><strong>Tax ID:</strong> {taxId}</li>
    </ul>
    <p>Your visit is now scheduled with Dr. {doctorFirstName} {doctorLastName} on {new Date(date).toLocaleString()}.</p>
    <p>If you need to reschedule or have any questions, please contact us at your earliest convenience.</p>
    <p>We look forward to seeing you soon!</p>
    <p>Best regards,</p>
    <p>Your Health Care Team</p>
  </div>
);
