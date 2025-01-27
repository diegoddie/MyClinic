import { Doctor, Patient, User } from "./supabase/types";

export function isAdmin(user: User | Doctor | Patient | null): user is User {
    return user !== null && 'role' in user && user.role === 'admin';
}

export function isDoctor(user: User | Doctor | Patient | null): user is Doctor {
    return user !== null && 'specialization' in user;
}

export function isPatient(user: User | Doctor | Patient | null): user is Patient {
    return user !== null && 'tax_id' in user;
}