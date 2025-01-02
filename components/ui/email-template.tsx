import * as React from 'react';

interface EmailTemplateProps {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
  lastName,
  email,
  message
}) => (
  <div>
    <h1>New Contact Form Submission from {firstName} {lastName}</h1>
    <h3>{email}</h3>
    <p>{message}</p>
  </div>
);
