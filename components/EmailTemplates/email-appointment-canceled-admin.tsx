import * as React from 'react'; 

export interface EmailAppointmentCanceledAdminProps {
  firstName: string;
  lastName: string;
  email: string;
  taxId: string;
  phoneNumber: string;
  date: string;
  doctorFirstName: string;
  doctorLastName: string;    
}

export const EmailAppointmentCanceledAdmin: React.FC<Readonly<EmailAppointmentCanceledAdminProps>> = ({
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
    <p>Dear Admin,</p>
    <p>We have received a cancellation request for an appointment. The patient has requested to cancel the appointment with Dr. {doctorFirstName} {doctorLastName} scheduled for {new Date(date).toLocaleString()}.</p>
    <p><strong>Appointment Details:</strong></p>
    <ul>
      <li><strong>Patient Name:</strong> {firstName} {lastName}</li>
      <li><strong>Email:</strong> {email}</li>
      <li><strong>Phone Number:</strong> {phoneNumber}</li>
      <li><strong>Tax ID:</strong> {taxId}</li>
      <li><strong>Doctor:</strong> Dr. {doctorFirstName} {doctorLastName}</li>
      <li><strong>Original Appointment Date:</strong> {new Date(date).toLocaleString()}</li>
    </ul>
    <p>Please review this request and proceed accordingly.</p>
    <p>Best regards,</p>
    <p>Your Health Care Team</p>
  </div>
);
