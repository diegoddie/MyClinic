import * as React from 'react';

export interface EmailAppointmentUnconfirmedProps {
  firstName: string;
  lastName: string;
  email: string;
  taxId: string;
  phoneNumber: string;
  date: string;
  doctorFirstName: string;
  doctorLastName: string;    
}

export const EmailAppointmentUnconfirmed: React.FC<Readonly<EmailAppointmentUnconfirmedProps>> = ({
  firstName,
  lastName,
  email,
  taxId,
  phoneNumber,
  date,
  doctorFirstName,
  doctorLastName,
}) => (
  <div>
    <h1>Your visit has not been confirmed.</h1>
    <p>Dear {firstName} {lastName},</p>
    <p>We regret to inform you that your upcoming appointment with Dr. {doctorFirstName} {doctorLastName} has been not confirmed due to unforeseen circumstances.</p>
    <p><strong>Appointment Details:</strong></p>
    <ul>
      <li><strong>Doctor:</strong> Dr. {doctorFirstName} {doctorLastName}</li>
      <li><strong>Original Appointment Date:</strong> {new Date(date).toLocaleString()}</li>
      <li><strong>Email:</strong> {email}</li>
      <li><strong>Phone Number:</strong> {phoneNumber}</li>
      <li><strong>Tax ID:</strong> {taxId}</li>
    </ul>
    <p>We apologize for any inconvenience this may have caused. If you would like to reschedule your visit, please contact us at your earliest convenience and we will be happy to arrange a new appointment time for you.</p>
    <p>Thank you for your understanding.</p>
    <p>Best regards,</p>
    <p>Your Health Care Team</p>
  </div>
);
