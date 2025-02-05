import * as React from 'react';

export interface EmailAppointmentBookedPatientProps {
  firstName: string;
  lastName: string;
  email: string;
  taxId: string;
  phoneNumber: string;
  date: string;
  doctorFirstName: string;
  doctorLastName: string;    
}

export const EmailAppointmentBookedPatient: React.FC<Readonly<EmailAppointmentBookedPatientProps>> = ({
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
    <h1>Your Appointment Request Has Been Received</h1>
    <p>Dear {firstName} {lastName},</p>
    <p>We are pleased to inform you that we have received your appointment request with Dr. {doctorFirstName} {doctorLastName}. However, please note that your appointment is currently pending approval.</p>
    <p><strong>Appointment Details:</strong></p>
    <ul>
      <li><strong>Doctor:</strong> Dr. {doctorFirstName} {doctorLastName}</li>
      <li><strong>Requested Appointment Date:</strong> {new Date(date).toLocaleString()}</li>
      <li><strong>Email:</strong> {email}</li>
      <li><strong>Phone Number:</strong> {phoneNumber}</li>
      <li><strong>Tax ID:</strong> {taxId}</li>
    </ul>
    <p>You will be notified by email once your appointment has been confirmed or declined. Alternatively, you can check the status of your appointment in your account area.</p>
    <p>Thank you for your patience.</p>
    <p>Best regards,</p>
    <p>Your Health Care Team</p>
  </div>
);
