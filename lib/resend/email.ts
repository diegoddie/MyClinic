'use server'

import { formSchema } from "./schemas/contactSchema"
import { z } from "zod"
import { Resend } from 'resend';
import { EmailTemplate } from "@/components/ui/email-template";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function send(emailFormData: z.infer<typeof formSchema>): Promise<void> {
    try{
        const { error } = await resend.emails.send({
            from: process.env.RESEND_FROM_EMAIL || '',
            to: [process.env.RESEND_TO_EMAIL || ''],
            subject: 'New message from the contact form',
            react: await EmailTemplate({ 
                firstName: emailFormData.firstName, 
                message: emailFormData.message,
                email: emailFormData.email,
                lastName: emailFormData.lastName
            }),
        });

        if(error){
            throw error
        }
    } catch(e){
        throw(e)
    }
}