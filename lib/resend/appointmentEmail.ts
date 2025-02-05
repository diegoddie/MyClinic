'use server'

import { EmailAppointmentBookedAdmin, EmailAppointmentBookedAdminProps } from '@/components/EmailTemplates/email-appointment-booked-admin';
import { EmailAppointmentBookedPatient, EmailAppointmentBookedPatientProps } from '@/components/EmailTemplates/email-appointment-booked-patient';
import { EmailAppointmentCanceledAdmin, EmailAppointmentCanceledAdminProps } from '@/components/EmailTemplates/email-appointment-canceled-admin';
import { EmailAppointmentCanceledPatient, EmailAppointmentCanceledPatientProps } from '@/components/EmailTemplates/email-appointment-canceled-patient';
import { EmailAppointmentConfirmed, EmailAppointmentConfirmedProps } from '@/components/EmailTemplates/email-appointment-confirmed';
import { EmailAppointmentUnconfirmed, EmailAppointmentUnconfirmedProps } from '@/components/EmailTemplates/email-appointment-unconfirmed';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendNewAppointmentBookedPatient(to: string, data: EmailAppointmentBookedPatientProps): Promise<void> {
    try{
        const { error } = await resend.emails.send({
            from: process.env.RESEND_FROM_EMAIL || '',
            to: to,
            subject: 'New Visit Booked',
            react: await EmailAppointmentBookedPatient({ 
                ...data
            }),
        });

        if(error){
            throw error
        }
    } catch(e){
        throw(e)
    }
}

export async function sendNewAppointmentBookedAdmin(data: EmailAppointmentBookedAdminProps): Promise<void> {
    try{
        const { error } = await resend.emails.send({
            from: process.env.RESEND_FROM_EMAIL || '',
            to: [process.env.RESEND_TO_EMAIL || ''],
            subject: 'New Visit Booked',
            react: await EmailAppointmentBookedAdmin({ 
                ...data
            }),
        });

        if(error){
            throw error
        }
    } catch(e){
        throw(e)
    }
}

export async function sendAppointmentConfirmed(to: string, data: EmailAppointmentConfirmedProps): Promise<void> {
    try{
        const { error } = await resend.emails.send({
            from: process.env.RESEND_FROM_EMAIL || '',
            to: to,
            subject: 'Your visit has been confirmed',
            react: await EmailAppointmentConfirmed({ 
                ...data
            }),
        });

        if(error){
            throw error
        }
    } catch(e){
        throw(e)
    }
}

export async function sendAppointmentUnconfirmed(to: string, data: EmailAppointmentUnconfirmedProps): Promise<void> {
    try{
        const { error } = await resend.emails.send({
            from: process.env.RESEND_FROM_EMAIL || '',
            to: to,
            subject: 'Your visit has been not confirmed',
            react: await EmailAppointmentUnconfirmed({ 
                ...data
            }),
        });

        if(error){
            throw error
        }
    } catch(e){
        throw(e)
    }
}

export async function sendAppointmentCanceledPatient(to: string, data: EmailAppointmentCanceledPatientProps): Promise<void> {
    try{
        const { error } = await resend.emails.send({
            from: process.env.RESEND_FROM_EMAIL || '',
            to: to,
            subject: 'Your visit has been canceled',
            react: await EmailAppointmentCanceledPatient({ 
                ...data
            }),
        });

        if(error){
            throw error
        }
    } catch(e){
        throw(e)
    }
}

export async function sendAppointmentCanceledAdmin(data: EmailAppointmentCanceledAdminProps): Promise<void> {
    try{
        const { error } = await resend.emails.send({
            from: process.env.RESEND_FROM_EMAIL || '',
            to: [process.env.RESEND_TO_EMAIL || ''],
            subject: 'Visit canceled',
            react: await EmailAppointmentCanceledAdmin({ 
                ...data
            }),
        });

        if(error){
            throw error
        }
    } catch(e){
        throw(e)
    }
}