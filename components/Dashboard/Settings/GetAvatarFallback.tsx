import React from 'react';

function GetAvatarFallback({ email }: { email: string }) {
    const initial = email ? email[0].toUpperCase() : "A"; // Usa l'email come stringa
    return (
        <div className='text-black flex items-center justify-center w-14 h-14 rounded-full bg-muted dark:text-white'>
            {initial}
        </div>
    );
}

export default GetAvatarFallback;