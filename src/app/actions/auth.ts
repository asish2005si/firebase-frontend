
'use server';

import { db } from '@/lib/db';
import bcrypt from 'bcryptjs';

export async function registerUser(data: any) {
    try {
        const users = (await db.read('users')) || [];
        
        const existingUser = users.find((u: any) => u.username.toLowerCase() === data.username.toLowerCase());
        if (existingUser) {
            return { success: false, message: 'Username already exists.' };
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);
        
        users.push({
            accountNumber: data.accountNumber,
            username: data.username,
            password: hashedPassword,
        });

        await db.write('users', users);
        return { success: true, message: 'Registration successful!' };
    } catch (error) {
        console.error('Registration error:', error);
        return { success: false, message: 'An unexpected error occurred.' };
    }
}

export async function loginUser(data: any) {
    try {
        const users = (await db.read('users')) || [];
        
        const user = users.find((u: any) => u.username.toLowerCase() === data.username.toLowerCase());

        if (!user) {
            return { success: false, message: 'Invalid username or password.' };
        }

        const isPasswordValid = await bcrypt.compare(data.password, user.password);

        if (!isPasswordValid) {
            return { success: false, message: 'Invalid username or password.' };
        }

        // In a real app, you would create a session/token here
        return { success: true, message: 'Login successful!' };
    } catch (error) {
        console.error('Login error:', error);
        return { success: false, message: 'An unexpected error occurred.' };
    }
}

export async function checkAccount(accountNumber: string) {
    const users = await db.read('users');
    // In a real app, you'd check a proper customer database.
    // For this prototype, let's just make sure there's no user with this account number yet.
    const existing = users?.find((u:any) => u.accountNumber === accountNumber);
    return !existing;
}
