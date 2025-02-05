import * as React from 'react';

export interface EmailAppointmentCanceledPatientProps {
  firstName: string;
  lastName: string;
  email: string;
  taxId: string;
  phoneNumber: string;
  date: string;
  doctorFirstName: string;
  doctorLastName: string;    
}

export const EmailAppointmentCanceledPatient: React.FC<Readonly<EmailAppointmentCanceledPatientProps>> = ({
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
    <h1>Appointment Cancellation Request</h1>
    <p>Dear {firstName} {lastName},</p>
    <p>We have received your request to cancel the appointment with Dr. {doctorFirstName} {doctorLastName} scheduled for {new Date(date).toLocaleString()}.</p>
    <p><strong>Appointment Details:</strong></p>
    <ul>
      <li><strong>Doctor:</strong> Dr. {doctorFirstName} {doctorLastName}</li>
      <li><strong>Original Appointment Date:</strong> {new Date(date).toLocaleString()}</li>
      <li><strong>Email:</strong> {email}</li>
      <li><strong>Phone Number:</strong> {phoneNumber}</li>
      <li><strong>Tax ID:</strong> {taxId}</li>
    </ul>
    <p>Thank you for informing us, and we look forward to assisting you further.</p>
    <p>If you have any questions or would like to reschedule, please feel free to contact us at your convenience.</p>
    <p>Best regards,</p>
    <p>Your Health Care Team</p>
  </div>
);
